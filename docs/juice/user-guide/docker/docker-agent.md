---
title:  'Agent in Docker'
sidebar_position: 2
---

# Agent in Docker

You can run the Juice Agent as a container on a Linux machine with NVIDIA GPUs. Juice provides an official Docker image for each release, or you can build a custom image from the open source Dockerfile.
 
## Prerequisites

- **Docker**: Ensure you have Docker installed and running on your system. 
- **NVIDIA Container Toolkit**: Ensure you have the Container Toolkit installed, this makes your GPUs accessible to Docker.<br/>
  See https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html 
- **M2M token**: Create a machine-to-machine token for the agent:

```bash
juice m2m create --description docker-agent
```

- **Pool ID**: Run `juice pool list` and choose the pool where this agent should share GPUs.

## Running the official agent image:

The official agent is published to our [Docker Hub](https://hub.docker.com/r/juicelabs/agent), please follow the latest instructions there to get started.

The container is configured with environment variables:

| Parameter | Required | Default | Description |
| --- | --- | --- | --- |
| `JUICE_TOKEN` | Yes | none | M2M token used by the agent to log in. |
| `JUICE_POOL` | Yes | none | Pool ID to share GPUs into. |
| `JUICE_HOST_IP` | Yes | none | Comma-separated addresses that clients can use to reach the agent. Include the LAN IP, public IP, or both depending on where clients run. |
| `JUICE_HOST_PORT` | No | `7865` | UDP port used for client connections. The Docker port mapping must use the same port. |
| `JUICE_ADDITIONAL_ARGS` | No | none | Extra arguments passed to `juice agent run`, such as labels, taints, or cache settings. |

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

If you change `JUICE_HOST_PORT`, change both the environment variable and the UDP port mapping:

```bash
docker run \
    --gpus all \
    -p 9000:9000/udp \
    -e JUICE_HOST_PORT=9000 \
    -e JUICE_TOKEN=<YOUR_TOKEN> \
    -e JUICE_POOL=<YOUR_POOL_ID> \
    -e JUICE_HOST_IP=<YOUR_HOST_IP> \
    juicelabs/agent:latest
```

:::tip
If clients cannot connect to the containerized agent, first verify that Docker can see the GPUs (`docker run --rm --gpus all nvidia/cuda:13.0.2-base-ubuntu24.04 nvidia-smi`), the UDP port is open, and `JUICE_HOST_IP` contains an address reachable from the client machine.
:::


## Building a custom agent image:

The Dockerfile for our official agent is available in our [open source repository](https://github.com/Juice-Labs/juice-oss/tree/main/docker/agent). You can check out and customize the agent using the following steps:

1. Open a terminal and clone the repository
```bash
git clone https://github.com/Juice-Labs/juice-oss.git
cd juice-oss/docker/agent
```

2. Modify the Dockerfile at *docker/agent/Dockerfile*

3. Add the local build artifacts expected by the Dockerfile:

   - Download the latest Linux release from [app.juicelabs.co](https://app.juicelabs.co) and place it in this directory as `juice-gpu-linux.tar.gz`.
   - Download the NVIDIA Video Codec SDK from https://developer.nvidia.com/nvidia-video-codec-sdk and place the SDK zip in this directory. The filename must match the Dockerfile's `VIDEOSDK_VERSION` argument, for example `Video_Codec_SDK_<version>.zip`.

4. Build your custom image:

```bash
docker build -t juice-agent . 
```

5. Once the image is built, you can run a container using your M2M token and pool ID:

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

For detailed information on these parameters and how you can use docker compose to run the agent please see the [README](https://github.com/Juice-Labs/juice-oss/tree/main/docker/agent/README.md)

