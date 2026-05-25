---
title:  'Agent in Docker'
sidebar_position: 2
---

# Agent in Docker

You can run the Juice Agent as a container on a Linux GPU host. Juice provides an official Docker image for each release, or you can build your own image from the open source Dockerfile.
 
## Prerequisites

- **Docker**: Ensure you have Docker installed and running on your system. 
- **NVIDIA Container Toolkit**: Ensure you have the Container Toolkit installed, this makes your GPUs accessible to Docker.<br/>
  See https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html 
- **M2M token and pool**: Create an M2M token and choose the pool where this agent should register. You can list pools with `juice pool list`.

## Running the official agent image

The official agent is published to [Docker Hub](https://hub.docker.com/r/juicelabs/agent). The container needs access to all NVIDIA GPUs, UDP port `7865`, and the network addresses clients should use to reach the host.

```bash
docker run \
    --name juice-agent \
    --gpus all \
    -p 7865:7865/udp \
    -e JUICE_TOKEN=<YOUR_TOKEN> \
    -e JUICE_POOL=<YOUR_POOL_ID_OR_NAME> \
    -e JUICE_HOST_IP=<YOUR_HOST_IP> \
    -v ./logs:/home/juice/agent/log \
    --restart unless-stopped \
    juicelabs/agent:latest
```

`JUICE_HOST_IP` can be a comma-separated list of addresses that clients can use to connect to this agent, such as a LAN IP plus a public IP when clients connect from outside the local network.

### Docker Compose

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

Create a `.env` file next to the compose file:

```bash
VERSION=latest
JUICE_TOKEN=<YOUR_TOKEN>
JUICE_POOL=<YOUR_POOL_ID_OR_NAME>
JUICE_HOST_IP=<YOUR_HOST_IP>
```

Start and inspect the agent:

```bash
docker compose up -d
docker compose logs -f juice-agent
```

## Container parameters

| Parameter | Required | Description |
| --- | --- | --- |
| `JUICE_TOKEN` | Yes | M2M token used by the agent to log in. |
| `JUICE_POOL` | Yes | Pool ID or name where the agent registers. |
| `JUICE_HOST_IP` | Yes | Comma-separated addresses clients should use to connect to the agent. |
| `JUICE_HOST_PORT` | No | UDP port used by the agent. Defaults to `7865`. |
| `JUICE_ADDITIONAL_ARGS` | No | Extra arguments appended to the agent command. |

## Building a custom agent image

The Dockerfile for the official agent is available in our [open source repository](https://github.com/Juice-Labs/juice-oss/tree/main/docker/agent). The current image is built from Ubuntu 24.04 with CUDA 13 packages installed directly, rather than from NVIDIA's prebuilt CUDA runtime image.

To build it yourself, clone the repository and place both required files in `docker/agent`:

- `juice-gpu-linux.tar.gz`, downloaded from [app.juicelabs.co](https://app.juicelabs.co)
- NVIDIA Video Codec SDK zip, downloaded from https://developer.nvidia.com/nvidia-video-codec-sdk

Then build the image:

1. Open a terminal and clone the repository
```bash
git clone https://github.com/Juice-Labs/juice-oss.git
cd juice-oss/docker/agent
```

2. Add `juice-gpu-linux.tar.gz` and the NVIDIA Video Codec SDK zip to `docker/agent`.

3. Modify the Dockerfile at *docker/agent/Dockerfile* if needed.

4. Build your custom image: 

```bash
docker build -t juice-agent . 
```

5. Once the image is built, you can run a container using your M2M token and pool id:

```bash
docker run --rm \
    --gpus all \
    -p 7865:7865/udp \
    -e JUICE_TOKEN=<YOUR_TOKEN> \
    -e JUICE_POOL=<YOUR_POOL_ID_OR_NAME> \
    -e JUICE_HOST_IP=<YOUR_HOST_IP> \
    -v ./logs:/home/juice/agent/log \
    --restart unless-stopped \
    juice-agent
```

For detailed information on these parameters and how you can use docker compose to run the agent please see the [README](https://github.com/Juice-Labs/juice-oss/tree/main/docker/agent/README.md)

