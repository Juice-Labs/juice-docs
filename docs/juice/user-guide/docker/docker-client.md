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

## Creating the Docker image:

1. Create a Dockerfile in your working directory.

#### Example

```powershell
# Use Ubuntu 24.04 as the base image 
FROM ubuntu:24.04 

# Install necessary packages 
RUN apt-get update && \ 
    apt-get upgrade -y && \ 
    DEBIAN_FRONTEND=noninteractive apt-get install -y \ 
    ca-certificates \ 
    libnuma1 \ 
    libatomic1 && \ 
    rm -rf /var/lib/apt/lists/* 

# Set working directory inside the container 
WORKDIR /home/ubuntu 

# Copy the juice tarball and the run script 
ADD juice-gpu-linux.tar.gz /home/ubuntu
COPY --chown=ubuntu:ubuntu --chmod=777 run.sh . 

# Define the entry point for the container 
ENTRYPOINT ["/bin/bash", "-c", "/root/run.sh ${@}", "--"] 
```

2. Create a file named run.sh in the same directory as your Dockerfile with the following contents:

```powershell
#!/bin/bash 
# Check if at least one argument is provided (M2M token) 
if [ $# -eq 0 ]; then 
    echo "Usage: $0 <m2m_token> [run_args...]" 
    exit 1 
fi 

# The first argument is the M2M token 
m2m_token="$1" 

# Shift the arguments to remove the M2M token 
shift 

# Log in to juice using the M2M token 
./juice login --token "$m2m_token" 

# Execute the juice run command with the remaining arguments 
./juice run "$@" 
```

3. Open a terminal, navigate to the directory containing your Dockerfile, run.sh, and execute the following command: 

```powershell
docker build -t juice-client . 
```

This builds a Docker image tagged *juice-client* using the instructions in your Dockerfile.

## Running the Docker container 

Once the image is built, you can run a container using your M2M token and desired juice run arguments:

```powershell
docker run -it juice-client <your_m2m_token> <juice_run_args>
```

#### Example

This command launches an interactive container, logs in using your M2M token, and executes the bash command inside the container. You can replace bash with any other juice command or application you want to run remotely. 

```powershell
docker run -it juice-client m2m_e6q_87LwpLY1dwh4FpX --pool-ids <your_pool_id> bash  
```

Applications and commands executed within the container utilize the remote GPU resources provided by juice. Refer to the [User Guide](/docs/juice/user-guide/cli-app) for detailed information about available commands, options, and troubleshooting.
