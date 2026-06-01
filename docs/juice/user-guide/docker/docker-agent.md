---
title:  'Agent in Docker'
sidebar_position: 2
---

# Agent in Docker

You can run the Juice Agent as a container on a Linux host with NVIDIA GPUs. Juice publishes an official Docker image for each release, and the Dockerfile is available if you need to build a customized image.
 
## Prerequisites

- **Docker**: Ensure you have Docker installed and running on your system. 
- **NVIDIA Container Toolkit**: Ensure you have the Container Toolkit installed, this makes your GPUs accessible to Docker.<br/>
  See https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html 
- **M2M token**: Create a token with `juice m2m create --description docker`.
- **Pool ID**: Choose the pool where this agent should run with `juice pool list`.

## Running the official agent image

The official agent image is published to [Docker Hub](https://hub.docker.com/r/juicelabs/agent).

### Docker Compose

Create a `docker-compose.yaml` file:

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

Create a `.env` file next to it:

```bash
VERSION=latest
JUICE_TOKEN=m2m_XXX
JUICE_POOL=<pool_id>
JUICE_HOST_IP=<host_ip>
```

Start the agent and follow its logs:

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
  -e JUICE_TOKEN=m2m_XXX \
  -e JUICE_POOL=<pool_id> \
  -e JUICE_HOST_IP=<host_ip> \
  -v ./logs:/home/juice/agent/log \
  --restart unless-stopped \
  juicelabs/agent:latest
```

## Parameters

| Parameter | Default | Description |
| --- | --- | --- |
| `JUICE_TOKEN` | none | Required M2M token for the agent. |
| `JUICE_POOL` | none | Required pool name or ID for the agent. |
| `JUICE_HOST_IP` | none | Required comma-separated list of network addresses clients can use to connect to the agent. Usually include the host's LAN IP and any public IP needed by remote clients. |
| `JUICE_HOST_PORT` | `7865` | UDP port used by the agent. Keep this aligned with the published container port. |
| `JUICE_ADDITIONAL_ARGS` | none | Extra arguments appended to `juice agent run`, such as `--cache-size 128` or `--gpu-ids GPU-uuid-1`. |

## Updating

If you use `latest`, pull the latest image before restarting:

```bash
docker pull juicelabs/agent:latest
docker compose up -d
```

For repeatable deployments, pin `VERSION` to a specific tag from [Docker Hub](https://hub.docker.com/r/juicelabs/agent/tags).

## Building a custom agent image

The Dockerfile for the official agent is available in the [open source repository](https://github.com/Juice-Labs/juice-oss/tree/main/docker/agent). The current Dockerfile builds from Ubuntu 24.04 and expects the release archive and NVIDIA Video Codec SDK archive to be available in the build context.

1. Open a terminal and clone the repository
```bash
git clone https://github.com/Juice-Labs/juice-oss.git
cd juice-oss/docker/agent
```

2. Modify the Dockerfile at *docker/agent/Dockerfile*

3. Add the required build artifacts to `docker/agent`:

- `juice-gpu-linux.tar.gz`, downloaded from [app.juicelabs.co](https://app.juicelabs.co)
- `Video_Codec_SDK_<version>.zip`, downloaded from NVIDIA's [Video Codec SDK](https://developer.nvidia.com/nvidia-video-codec-sdk)

4. Build your custom image: 

```bash
docker build -t juice-agent . 
```

5. Once the image is built, run a container using your M2M token and pool id:

```bash
docker run --rm \
  --gpus all \
  -p 7865:7865/udp \
  -e JUICE_TOKEN=m2m_XXX \
  -e JUICE_POOL=<pool_id> \
  -e JUICE_HOST_IP=<host_ip> \
  -v ./logs:/home/juice/agent/log \
  juice-agent
```

For the source Dockerfile and latest image-specific notes, see the [agent README](https://github.com/Juice-Labs/juice-oss/tree/main/docker/agent/README.md).

