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

The official agent is published to our [Dockerhub](https://hub.docker.com/r/juicelabs/agent), please follow the latest instructions there to get started.


## Building a custom agent image:

The Dockerfile for our official agent is available in our [open source repository](https://github.com/Juice-Labs/juice-oss/tree/main/docker/agent). The current image builds from Ubuntu 24.04 and installs the CUDA 13 runtime libraries directly, instead of inheriting from an NVIDIA CUDA base image.

1. Open a terminal and clone the repository
```bash
git clone https://github.com/Juice-Labs/juice-oss.git
cd juice-oss/docker/agent
```

2. Add the build inputs to the `docker/agent` directory:

- `juice-gpu-linux.tar.gz`, downloaded from [app.juicelabs.co](https://app.juicelabs.co)
- `Video_Codec_SDK_<version>.zip`, downloaded from the [NVIDIA Video Codec SDK](https://developer.nvidia.com/nvidia-video-codec-sdk). The filename must match the Dockerfile `VIDEOSDK_VERSION` build argument.

3. Modify the Dockerfile at *docker/agent/Dockerfile*

4. Build your custom image: 

```bash
docker build \
  --build-arg JUICE_VERSION=<juice_version> \
  -t juice-agent .
```

If you use a Video Codec SDK file that does not match the Dockerfile default, also pass `--build-arg VIDEOSDK_VERSION=<video_sdk_version>`.

5. Once the image is built, you can run a container using your M2M token and pool id:

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

