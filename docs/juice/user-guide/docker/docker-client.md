---
title:  'Client in Docker'
sidebar_position: 1
---

# Client in Docker

You can run the Juice client within a Docker container to leverage remote GPUs without installing the entire agent on your host machine.

## Prerequisites

- **Docker**: Ensure you have Docker installed and running on your system.
- **Active Account**: You'll need an active Juice account and access to a pool with available GPUs.
- **M2M Token**: Generate an M2M token from your juice account to enable automated login within the container.<br/>See the [Machine-to-Machine (M2M) Tokens](/docs/juice/user-guide/cli-app/m2m-tokens.md) section of the Juice User Guide for instructions.
- **Juice Tarball**: Download the latest juice Linux tarball from [app.juicelabs.co](https://app.juicelabs.co)

## Creating the Docker image

1. Create a Dockerfile in your working directory.

The Linux tarball extracts to a `juice/` directory that contains the `juice` binary. Place `juice-gpu-linux.tar.gz` and `run.sh` next to this Dockerfile.

#### Example

```dockerfile
FROM ubuntu:24.04

RUN apt-get update && \
    apt-get upgrade -y && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y \
    ca-certificates \
    libnuma1 \
    libatomic1 && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /home/ubuntu

# Extracts to /home/ubuntu/juice/juice, matching the official agent image layout
ADD juice-gpu-linux.tar.gz /home/ubuntu/juice
COPY --chmod=755 run.sh /home/ubuntu/run.sh

ENTRYPOINT ["/home/ubuntu/run.sh"]
```

2. Create a file named `run.sh` in the same directory as your Dockerfile with the following contents:

```bash
#!/bin/bash
if [ $# -eq 0 ]; then
    echo "Usage: $0 <m2m_token> [juice run args...]"
    exit 1
fi

m2m_token="$1"
shift

JUICE_BIN=/home/ubuntu/juice/juice

"$JUICE_BIN" login --token "$m2m_token"
exec "$JUICE_BIN" run "$@"
```

If your tarball extracts the binary to a different path, update `JUICE_BIN` after inspecting the archive (`tar -tzf juice-gpu-linux.tar.gz`).

3. Open a terminal, navigate to the directory containing your Dockerfile, `run.sh`, and `juice-gpu-linux.tar.gz`, then run:

```bash
docker build -t juice-client .
```

This builds a Docker image tagged *juice-client* using the instructions in your Dockerfile.

## Running the Docker container

Once the image is built, you can run a container using your M2M token and desired `juice run` arguments:

```bash
docker run -it juice-client <your_m2m_token> [juice run flags] <application> [<application args>]
```

#### Example

This command launches an interactive container, logs in using your M2M token, and runs `bash` through `juice run` against a specific pool. Replace the token, pool ID, and application as needed.

```bash
docker run -it juice-client m2m_YOUR_TOKEN --pool-ids <your_pool_id> bash
```

Applications and commands executed within the container utilize the remote GPU resources provided by juice. Refer to the [User Guide](/docs/juice/user-guide/cli-app) for detailed information about available commands, options, and troubleshooting.

:::note
`run.sh` always invokes `juice run`. Pool selection must use `--pool-ids`. A bare pool ID as the first argument is treated as the application name.
:::
