---
title:  'Agent in Docker'
sidebar_position: 2
---

# Agent in Docker

You can run the Juice Agent as a container on your machine. Juice publishes an official image for each release, or you can build your own from the template in [juice-oss](https://github.com/Juice-Labs/juice-oss/tree/main/docker/agent).

## Prerequisites

- **Docker**: Ensure you have Docker installed and running on your system.
- **NVIDIA Container Toolkit**: GPUs must be visible to Docker. See the [NVIDIA install guide](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html).
- **M2M token and pool**: Create a token with `juice m2m create --description docker` and choose a pool with `juice pool list`. See [M2M Tokens](../cli-app/m2m-tokens.md).

The official image (`juicelabs/agent`) is Ubuntu 24.04 with CUDA 13 libraries. `start-agent.sh` requires `JUICE_TOKEN`, `JUICE_POOL`, and `JUICE_HOST_IP` and then runs `juice login` followed by `juice agent --log-file stdout run ...`.

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `JUICE_TOKEN` | Yes | M2M token. The container exits with `Missing JUICE_TOKEN` if unset. |
| `JUICE_POOL` | Yes | Pool ID or name. The container exits with `Missing JUICE_POOL` if unset. |
| `JUICE_HOST_IP` | Yes | CSV of addresses clients should use when connecting. Usually the host LAN IP, plus a public IP if clients connect over the internet. |
| `JUICE_HOST_PORT` | No | Gateway port. Defaults to `7865`. |
| `JUICE_ADDITIONAL_ARGS` | No | Extra flags appended to `juice agent run` (for example `--cache-size` or `--metrics-address`). |

## Running the official agent image

Publish UDP `7865` (or `JUICE_HOST_PORT`) and pass `--gpus all`. The official image does **not** require `--network=host`.

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

Follow logs on container stdout (`start-agent.sh` passes `--log-file stdout`):

```bash
docker logs -f juice-agent
```

:::warning
Do not combine `--rm` with `--restart`. Docker rejects that pair. Use `--restart unless-stopped` for a long-running agent, or `--rm` for a one-shot container.
:::

### docker compose

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

```bash
docker compose up -d
docker compose logs -f juice-agent
```

Pin `VERSION` to a tag from [Docker Hub](https://hub.docker.com/r/juicelabs/agent/tags), or pull `juicelabs/agent:latest` before restarting if you stay on `latest`.

## Common pitfalls

- Missing `JUICE_HOST_IP`: the entrypoint exits immediately. Set it to addresses the **client** can route to, not `127.0.0.1`, unless the client is on the same host.
- UDP port not published: clients cannot complete the gateway connection even if the agent appears logged in.
- No GPU devices in the container: install the NVIDIA Container Toolkit and pass `--gpus all` (or the compose `deploy.resources` block).
- Extra agent flags: put them in `JUICE_ADDITIONAL_ARGS`, not as extra `docker run` command arguments (the image `CMD` is `./start-agent.sh`).

See [Prometheus](../../admin/prometheus.md) for `JUICE_ADDITIONAL_ARGS=--metrics-address ...`.

## Building a custom agent image

The Dockerfile is in [juice-oss/docker/agent](https://github.com/Juice-Labs/juice-oss/tree/main/docker/agent). A custom build needs:

1. `juice-gpu-linux.tar.gz` from [app.juicelabs.co](https://app.juicelabs.co)
2. An NVIDIA Video Codec SDK zip whose version matches `ARG VIDEOSDK_VERSION` in the Dockerfile (default `12.0.16` in the setup stage)

Place those files next to the Dockerfile, then:

```bash
git clone https://github.com/Juice-Labs/juice-oss.git
cd juice-oss/docker/agent
docker build -t juice-agent .
```
