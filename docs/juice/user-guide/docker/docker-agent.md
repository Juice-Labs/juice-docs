---
title:  'Agent in Docker'
sidebar_position: 2
---

# Agent in Docker

You can run the Juice Agent as a container on your machine. Juice provides an official Docker image for each release, or you can build your own from the open source Dockerfile.
 
## Prerequisites

- **Docker**: Ensure you have Docker installed and running on your system. 
- **NVIDIA Container Toolkit**: Ensure you have the Container Toolkit installed, this makes your GPUs accessible to Docker.<br/>
  See https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html 

## Running the official agent image:

The official agent is published to [Docker Hub](https://hub.docker.com/r/juicelabs/agent). The current image is built directly from Ubuntu 24.04 with CUDA 13 runtime libraries and pending Ubuntu security updates applied during the image build.

Before launching the container, create an M2M token and choose the pool where the agent should run:

```bash
juice m2m create --description docker
juice pool list
```

Start the published image with your token, pool, and host IP address:

```bash
docker run \
  --name juice-agent \
  --gpus all \
  -p 7865:7865/udp \
  -e JUICE_TOKEN=<YOUR_TOKEN> \
  -e JUICE_POOL=<YOUR_POOL_ID> \
  -e JUICE_HOST_IP=<YOUR_HOST_IP> \
  --restart unless-stopped \
  juicelabs/agent:latest
```

`JUICE_HOST_IP` should contain the network address clients use to reach the agent. For hosts reachable over more than one network, pass a comma-separated list. The container starts `juice agent run` with `--gateway-port` and `--gateway-ips` based on these environment variables.

| Variable | Required | Description |
| --- | --- | --- |
| `JUICE_TOKEN` | Yes | M2M token used by the agent to log in. |
| `JUICE_POOL` | Yes | Pool ID or name where this agent shares GPUs. |
| `JUICE_HOST_IP` | Yes | Comma-separated gateway IP addresses clients can use to connect to this host. |
| `JUICE_HOST_PORT` | No | UDP gateway port. Defaults to `7865`. |
| `JUICE_ADDITIONAL_ARGS` | No | Extra arguments appended to `juice agent run`. |

Use a pinned tag instead of `latest` when you need deterministic rebuilds. If you use `latest`, pull the image before restarting so Docker does not reuse a cached local tag:

```bash
docker pull juicelabs/agent:latest
docker restart juice-agent
```


## Building a custom agent image:

The Dockerfile for our official agent is available in our [open source repository](https://github.com/Juice-Labs/juice-oss/tree/main/docker/agent). Build a custom image when you need to pin a Juice release, add site-specific packages, or review the base image contents.

1. Open a terminal and clone the repository:
```bash
git clone https://github.com/Juice-Labs/juice-oss.git
cd juice-oss/docker/agent
```

2. Download the Linux Juice release tarball from [app.juicelabs.co](https://app.juicelabs.co) and place it in `docker/agent` as `juice-gpu-linux.tar.gz`.

3. Download the NVIDIA Video Codec SDK from [developer.nvidia.com](https://developer.nvidia.com/nvidia-video-codec-sdk) and place the SDK zip beside the Dockerfile. The Dockerfile expects the filename `Video_Codec_SDK_<version>.zip`.

4. Modify the Dockerfile at `docker/agent/Dockerfile`.

5. Build your custom image:

```bash
docker build -t juice-agent . 
```

6. Once the image is built, run a container using your M2M token, pool ID, and host IP:

```bash
docker run --rm \
    --gpus all \
    -p 7865:7865/udp \
    -e JUICE_TOKEN=<YOUR_TOKEN> \
    -e JUICE_POOL=<YOUR_POOL_ID> \
    -e JUICE_HOST_IP=<YOUR_HOST_IP> \
    -v ./logs:/home/juice/agent/log \
    --restart unless-stopped \
    juice-agent
```

For detailed information on these parameters and how you can use Docker Compose to run the agent, see the [README](https://github.com/Juice-Labs/juice-oss/tree/main/docker/agent/README.md).

