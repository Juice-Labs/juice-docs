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

The Dockerfile for our official agent is available in our [open source repository](https://github.com/Juice-Labs/juice-oss/tree/main/docker/agent). You can checkout and customize the agent using the following steps:

1. Open a terminal and clone the repository
```bash
git clone https://github.com/Juice-Labs/juice-oss.git
cd juice-oss/docker/agent
```

2. Modify the Dockerfile at *docker/agent/Dockerfile*

3. Add the required build artifacts to the `docker/agent` directory:

   - The latest `juice-gpu-linux.tar.gz`, downloaded from [app.juicelabs.co](https://app.juicelabs.co).
   - The NVIDIA Video Codec SDK zip, downloaded from [NVIDIA](https://developer.nvidia.com/nvidia-video-codec-sdk).

   The Dockerfile defaults to `Video_Codec_SDK_12.0.16.zip`. If you use a different SDK version, pass it with `--build-arg VIDEOSDK_VERSION=<version>`.

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

