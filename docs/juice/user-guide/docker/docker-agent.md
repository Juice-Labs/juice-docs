---
title:  'Agent in Docker'
sidebar_position: 2
---

# Agent in Docker

You can run the Juice Agent as a container on a Linux GPU host. The container logs in with an M2M token, starts `juice agent run`, and publishes the agent gateway over UDP so clients can connect to the host.
 
## Prerequisites

- **Docker**: Ensure you have Docker installed and running on your system. 
- **NVIDIA Container Toolkit**: Ensure you have the Container Toolkit installed, this makes your GPUs accessible to Docker.<br/>
  See https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html 
- **M2M token**: Create a token with `juice m2m create --description docker` and store it securely.
- **Pool**: Choose the pool ID or name where the agent should appear. You can list available pools with `juice pool list`.
- **Reachable UDP port**: Expose UDP port `7865` by default, or set `JUICE_HOST_PORT` and publish the same UDP port.

## Running the Official Agent Image

The official image is published to [Docker Hub](https://hub.docker.com/r/juicelabs/agent). Use `latest` to track the newest release, or pin `VERSION` to a specific tag from Docker Hub.

Create a `.env` file:

```bash
VERSION=latest
JUICE_TOKEN=m2m_xxx
JUICE_POOL=your_pool_id
JUICE_HOST_IP=your_host_ip
```

Create `docker-compose.yaml`:

```yaml
---
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

Start the agent and follow logs:

```bash
docker compose up -d
docker compose logs -f juice-agent
```

### Docker CLI

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

## Runtime Parameters

| Parameter | Required | Default | Description |
| --- | --- | --- | --- |
| `JUICE_TOKEN` | Yes | None | M2M token used by the container to log in. |
| `JUICE_POOL` | Yes | None | Pool ID or name for the agent. |
| `JUICE_HOST_IP` | Yes | None | Comma-separated list of addresses that clients should use to connect to this host, such as a LAN IP and public IP. |
| `JUICE_HOST_PORT` | No | `7865` | UDP gateway port used by the agent. Publish the same container port on the host. |
| `JUICE_ADDITIONAL_ARGS` | No | None | Extra arguments appended to `juice agent run`, such as labels, taints, or cache options. |

## Updating the Image

If you use the `latest` tag, pull the newest image and recreate the container:

```bash
docker pull juicelabs/agent:latest
docker compose up -d
```

## Building a Custom Agent Image

The Dockerfile for the official agent is available in the [open source repository](https://github.com/Juice-Labs/juice-oss/tree/main/docker/agent). The current Dockerfile builds from Ubuntu 24.04 and installs CUDA 13 runtime libraries directly from NVIDIA packages.

To build the image yourself, place these files in `juice-oss/docker/agent`:

- `juice-gpu-linux.tar.gz`, downloaded from [app.juicelabs.co](https://app.juicelabs.co)
- NVIDIA Video Codec SDK zip matching the Dockerfile's `VIDEOSDK_VERSION` build argument

Then build the image:

```bash
git clone https://github.com/Juice-Labs/juice-oss.git
cd juice-oss/docker/agent
docker build -t juice-agent --build-arg JUICE_VERSION=<version> .
```

Once the image is built, run it with the same environment variables used by the official image:

```bash
docker run \
  --rm \
  --gpus all \
  -p 7865:7865/udp \
  -e JUICE_TOKEN=<YOUR_TOKEN> \
  -e JUICE_POOL=<YOUR_POOL_ID> \
  -e JUICE_HOST_IP=<YOUR_HOST_IP> \
  -v ./logs:/home/juice/agent/log \
  juice-agent
```

