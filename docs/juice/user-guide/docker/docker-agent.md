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

## Running the official agent image:

The official agent is published to our [Dockerhub](https://hub.docker.com/r/juicelabs/agent).

Create an M2M token and choose a pool before starting the container:

```bash
juice m2m create --description docker
juice pool list
```

### docker compose (recommended)

`docker-compose.yaml`:

```yaml
services:
  juice-agent:
    image: juicelabs/agent:${VERSION:-latest}
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

`.env`:

```bash
VERSION=latest
JUICE_TOKEN=your_token
JUICE_POOL=your_pool_id
JUICE_HOST_IP=your_host_ip
```

Start and follow logs:

```bash
docker compose up -d
docker compose logs -f juice-agent
```

### docker CLI

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

### Runtime parameters

| Parameter | Default | Description |
| --- | --- | --- |
| `JUICE_TOKEN` | none (required) | M2M token for this agent |
| `JUICE_POOL` | none (required) | Pool ID or name for the agent |
| `JUICE_HOST_IP` | none (required) | Comma-separated network addresses clients should use to reach the agent (usually LAN and/or public IP) |
| `JUICE_HOST_PORT` | `7865` | UDP port advertised to clients |
| `JUICE_ADDITIONAL_ARGS` | none | Extra arguments passed to the agent process |

:::note
`JUICE_HOST_IP` must be reachable from Juice clients. Publishing `-p 7865:7865/udp` alone is not enough if clients cannot resolve a usable host address.
:::

### Updating

```bash
docker pull juicelabs/agent:latest
docker compose up -d
```

## Building a custom agent image:

The Dockerfile for our official agent is available in our [open source repository](https://github.com/Juice-Labs/juice-oss/tree/main/docker/agent). You can checkout and customize the agent using the following steps:

1. Open a terminal and clone the repository:

```bash
git clone https://github.com/Juice-Labs/juice-oss.git
cd juice-oss/docker/agent
```

2. Place the required build inputs in `docker/agent/`:

- `juice-gpu-linux.tar.gz` from [app.juicelabs.co](https://app.juicelabs.co)
- `Video_Codec_SDK_<version>.zip` from the [NVIDIA Video Codec SDK](https://developer.nvidia.com/nvidia-video-codec-sdk)

The Dockerfile defaults `VIDEOSDK_VERSION` to `12.0.16` for the local zip filename. Override it when your SDK zip uses a different version:

```bash
docker build --build-arg VIDEOSDK_VERSION=13.0.37 -t juice-agent .
```

3. Modify the Dockerfile at *docker/agent/Dockerfile* if needed.

4. Build your custom image:

```bash
docker build -t juice-agent .
```

5. Run the custom image with GPU access and a reachable host IP:

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

For additional compose and parameter details, see the [agent Docker README](https://github.com/Juice-Labs/juice-oss/tree/main/docker/agent/README.md).
