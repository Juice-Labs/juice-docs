---
title:  'Agent in Docker'
sidebar_position: 2
---

# Agent in Docker

You can run the Juice Agent as a container on a Linux GPU host. The container logs in with a machine-to-machine (M2M) token, joins one pool, and advertises the host IP and UDP port clients should use to connect.

## Prerequisites

- **Docker**: Ensure Docker is installed and running.
- **NVIDIA Container Toolkit**: Install the NVIDIA Container Toolkit so Docker can expose GPUs to the container. See the [NVIDIA install guide](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html).
- **M2M token**: Create a token with `juice m2m create --description docker`, then save the token value securely.
- **Pool ID**: Run `juice pool list` and choose the pool where this agent should share GPUs.
- **Host IP**: Choose the network address clients should use to reach this host. Use a LAN IP for local clients, or an externally reachable IP when clients connect over the Internet.

## Running the official agent image

The official agent image is published on [Docker Hub](https://hub.docker.com/r/juicelabs/agent). Docker Compose is the recommended way to run it because it keeps the token, pool, image tag, and host IP in an `.env` file.

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

Create `.env`:

```bash
VERSION=latest
JUICE_TOKEN=<YOUR_TOKEN>
JUICE_POOL=<YOUR_POOL_ID>
JUICE_HOST_IP=<YOUR_HOST_IP>
```

Start the agent:

```bash
docker compose up -d
```

View logs:

```bash
docker compose logs -f juice-agent
```

You can also run the image directly:

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

## Configuration

| Parameter | Default | Description |
| --- | --- | --- |
| `JUICE_TOKEN` | none | Required M2M token for the agent. |
| `JUICE_POOL` | none | Required pool ID or name for the agent. An agent can join one pool. |
| `JUICE_HOST_IP` | none | Required comma-separated list of network addresses clients should use for this host. |
| `JUICE_HOST_PORT` | `7865` | UDP gateway port exposed by the agent. |
| `JUICE_ADDITIONAL_ARGS` | none | Additional arguments passed to `juice agent run`. |

## Updating

If you use the `latest` tag, pull the newest image before restarting:

```bash
docker pull juicelabs/agent:latest
docker compose up -d
```

To pin a version, set `VERSION` in `.env` to a specific tag from [Docker Hub](https://hub.docker.com/r/juicelabs/agent/tags).

## Building a custom agent image

The Dockerfile for the official agent is available in the [open source repository](https://github.com/Juice-Labs/juice-oss/tree/main/docker/agent). A local build requires:

- The latest `juice-gpu-linux.tar.gz` from [app.juicelabs.co](https://app.juicelabs.co).
- NVIDIA Video Codec SDK from [NVIDIA](https://developer.nvidia.com/nvidia-video-codec-sdk).

Clone the repository and build from `docker/agent`:

```bash
git clone https://github.com/Juice-Labs/juice-oss.git
cd juice-oss/docker/agent
docker build -t juice-agent .
```

Then run the custom image with the same environment variables as the official image.

