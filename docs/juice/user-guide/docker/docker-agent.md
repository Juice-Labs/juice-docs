---
title:  'Agent in Docker'
sidebar_position: 2
---

# Agent in Docker

You can run the Juice Agent as a container on your machine. Juice provides an official docker image for each release or you can build your own based on template.

## Prerequisites

- **Docker**: Ensure you have Docker installed and running on your system.
- **NVIDIA Container Toolkit**: Ensure you have the Container Toolkit installed, this makes your GPUs accessible to Docker.<br/>
  See https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html

## Running the official agent image

The official agent is published to [Docker Hub](https://hub.docker.com/r/juicelabs/agent). The current image is Ubuntu 24.04 with CUDA 13 runtime libraries (`NVIDIA_REQUIRE_CUDA=cuda>=13.0`).

`start-agent.sh` logs in with the M2M token, then starts:

```text
juice agent --log-file stdout run <pool> --gateway-port <port> --gateway-ips <host-ip> [additional args]
```

It exits immediately if `JUICE_TOKEN`, `JUICE_POOL`, or `JUICE_HOST_IP` is unset.

| Variable | Required | Purpose |
| --- | --- | --- |
| `JUICE_TOKEN` | Yes | M2M token for the agent |
| `JUICE_POOL` | Yes | Pool ID or name |
| `JUICE_HOST_IP` | Yes | CSV of addresses clients should use to reach this agent (LAN and/or public IP) |
| `JUICE_HOST_PORT` | No | Gateway port. Defaults to `7865` |
| `JUICE_ADDITIONAL_ARGS` | No | Extra arguments appended to `juice agent ... run` |

The official image does **not** require `--network=host`. Publish the UDP gateway port and set `JUICE_HOST_IP` to addresses clients can actually reach.

:::warning
`--rm` and `--restart` cannot be used together on `docker run`. Use `--restart unless-stopped` for a long-running agent, or `--rm` for a one-shot container.
:::

Example:

```bash
docker run \
   --name juice-agent \
   --gpus all \
   -p 7865:7865/udp \
   -e JUICE_TOKEN=<YOUR_TOKEN> \
   -e JUICE_POOL=<YOUR_POOL_ID> \
   -e JUICE_HOST_IP=<YOUR_HOST_IP> \
   -v ./logs:/home/juice/agent/log \
   --restart unless-stopped \
   juicelabs/agent:latest
```

Docker Compose is the recommended launch path. Create `docker-compose.yaml` and a `.env` file:

```yaml
services:
  juice-agent:
    image: juicelabs/agent:${VERSION}
    container_name: juice-agent
    environment:
      - JUICE_TOKEN=${JUICE_TOKEN}
      - JUICE_POOL=${JUICE_POOL}
      - JUICE_HOST_IP=${JUICE_HOST_IP}
    ports:
      - 7865:7865/udp
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: all
              capabilities: [gpu]
    restart: unless-stopped
```

```bash
VERSION=latest
JUICE_TOKEN=your_token
JUICE_POOL=your_pool_id
JUICE_HOST_IP=your_host_ip
```

Then start the agent with `docker compose up -d` and follow logs with `docker compose logs -f juice-agent`.

To pick up a newer `latest` image, run `docker pull juicelabs/agent:latest` and `docker compose up -d`. Pin `VERSION` in `.env` if you need a specific tag from [Docker Hub](https://hub.docker.com/r/juicelabs/agent/tags).

To expose Prometheus metrics from the container, pass the agent flag through `JUICE_ADDITIONAL_ARGS` and publish that port. See [Gathering Metrics with Prometheus](/docs/juice/admin/prometheus.md).

For the full parameter list, see the [agent README](https://github.com/Juice-Labs/juice-oss/tree/main/docker/agent/README.md).

## Building a custom agent image

The Dockerfile for the official agent is in the [open source repository](https://github.com/Juice-Labs/juice-oss/tree/main/docker/agent).

1. Clone the repository:

```bash
git clone https://github.com/Juice-Labs/juice-oss.git
cd juice-oss/docker/agent
```

2. Modify `docker/agent/Dockerfile` if needed.

3. Add the required build artifacts to the `docker/agent` directory:

   - The latest `juice-gpu-linux.tar.gz` from [app.juicelabs.co](https://app.juicelabs.co).
   - The NVIDIA Video Codec SDK zip from [NVIDIA](https://developer.nvidia.com/nvidia-video-codec-sdk).

   The setup stage copies `Video_Codec_SDK_${VIDEOSDK_VERSION}.zip`. The Dockerfile `ARG` default is `12.0.16`. If you use a different SDK zip, pass `--build-arg VIDEOSDK_VERSION=<version>` and name the file to match.

4. Build the image:

```bash
docker build -t juice-agent .
```

5. Run the container:

```bash
docker run \
    --name juice-agent \
    --gpus all \
    -p 7865:7865/udp \
    -e JUICE_TOKEN=<YOUR_TOKEN> \
    -e JUICE_POOL=<YOUR_POOL_ID> \
    -e JUICE_HOST_IP=<YOUR_HOST_IP> \
    -v ./logs:/home/juice/agent/log \
    --restart unless-stopped \
    juice-agent
```

For compose examples and the full parameter list, see the [README](https://github.com/Juice-Labs/juice-oss/tree/main/docker/agent/README.md).
