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
- **M2M token and pool**: Create a token with `juice m2m create --description docker` and pick a pool with `juice pool list`. See [M2M Tokens](/docs/juice/user-guide/cli-app/m2m-tokens.md).

## Running the official agent image

The official agent is published to [Docker Hub](https://hub.docker.com/r/juicelabs/agent) as `juicelabs/agent`. The image is Ubuntu 24.04 with CUDA 13 (`NVIDIA_REQUIRE_CUDA=cuda>=13.0`, cuDNN 9.14, NCCL 2.28). It runs as user `juice` (uid 1000).

`start-agent.sh` requires `JUICE_TOKEN`, `JUICE_POOL`, and `JUICE_HOST_IP`. It then runs:

```powershell
juice login -t $JUICE_TOKEN
juice agent --log-file stdout run $JUICE_POOL --gateway-port $JUICE_HOST_PORT --gateway-ips $JUICE_HOST_IP $JUICE_ADDITIONAL_ARGS
```

`JUICE_HOST_IP` and `JUICE_HOST_PORT` are passed through `eval`, so a value like `$(hostname -I | awk '{print $1}')` is expanded inside the container. `--log-file stdout` means you read logs with `docker logs` / `docker compose logs`, not a bind-mounted log directory.

### docker compose (recommended)

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

```powershell
VERSION=latest
JUICE_TOKEN=your_token
JUICE_POOL=your_pool_id
JUICE_HOST_IP=your_host_ip
```

```powershell
docker compose up -d
docker compose logs -f juice-agent
```

### docker CLI

```powershell
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

:::warning
Do not combine `--rm` with `--restart`. Docker rejects that pair. The official image does **not** require `network=host`; it publishes UDP **7865** and advertises `JUICE_HOST_IP` as `--gateway-ips`.
:::

## Environment variables

| Variable | Default | Required | Purpose |
| --- | --- | --- | --- |
| `JUICE_TOKEN` | none | Yes | M2M token |
| `JUICE_POOL` | none | Yes | Pool name or id |
| `JUICE_HOST_IP` | none | Yes | CSV of addresses clients should use (LAN IP, and a public IP if clients connect over the internet) |
| `JUICE_HOST_PORT` | `7865` | No | Passed as `--gateway-port` |
| `JUICE_ADDITIONAL_ARGS` | none | No | Extra agent flags, for example `--metrics-address 0.0.0.0:9090` or `--cache-size 32` |

## Building a custom agent image

The Dockerfile is in [`juice-oss/docker/agent`](https://github.com/Juice-Labs/juice-oss/tree/main/docker/agent). Custom builds need both of these artifacts in the build context:

- `juice-gpu-linux.tar.gz` from [app.juicelabs.co](https://app.juicelabs.co)
- An NVIDIA Video Codec SDK zip matching the setup-stage `ARG VIDEOSDK_VERSION` (default `12.0.16`), named `Video_Codec_SDK_${VIDEOSDK_VERSION}.zip`

```powershell
git clone https://github.com/Juice-Labs/juice-oss.git
cd juice-oss/docker/agent
docker build -t juice-agent .
```

For parameters, compose examples, and version tags see the [agent image README](https://github.com/Juice-Labs/juice-oss/tree/main/docker/agent/README.md).
