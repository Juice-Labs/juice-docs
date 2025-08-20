---
title: 'CLI Reference'
sidebar_position: 2
---

# CLI Reference

This section documents all available CLI commands in the Juice CLI tool.

## Core Commands

### check
**Command**: `check [options]`

**Description**: Checks the installation for common issues

**Parameters**:
- `--json`: Format output as JSON

**Details**: 
- Checks installation in the default install directory
- Verifies NVIDIA driver versions and compatibility
- Reports any failures that would prevent GPU sharing

### login
**Command**: `login [controller]`

**Description**: Log in to a controller

**Parameters**:
- `--insecure-skip-tls-verify, -k`: Skip verification of TLS certificates
- `--token, -t`: Token to use for authentication (must be empty or start with "m2m")
- `controller` (optional): The controller to connect to. Can be:
  - A predefined environment name
  - An HTTP/HTTPS URL
  - If omitted, uses the first environment from vendor configuration

### logout
**Command**: `logout`

**Description**: Log the current user out of the controller

**Note**: Cannot logout while having an active session - must release the session first using `session release`

## Agent Management

### agent list
**Command**: `agent list` (alias: `agent ls`)

**Description**: List all the agents accessible to the user

**Parameters**:
- `--json`: Output in JSON format
- `--fields`: Specify fields to display (default fields: state, hostname, pool.name, id, numgpus)
- `--sort-cols`: Sorts the output by a comma-separated list of column numbers (1-indexed). Use negative numbers for descending order. (Default: 1)

### agent info
**Command**: `agent info <id>`

**Description**: Gets the information of a specific agent

**Parameters**:
- `--json`: Output in JSON format
- `--fields`: Specify fields to display (default fields: state, hostname, pool.name, id, numgpus)
- `--sort-cols`: Sorts the output by a comma-separated list of column numbers (1-indexed). Use negative numbers for descending order. (Default: 1)
- `id` (required): The ID of the agent to get information about

### agent run
**Command**: `agent run [pool_id]`

**Description**: Run the GPU Sharing agent in the foreground, sharing your GPU to a specified pool (not available in WSL)

**Parameters**:
- `pool_id` (required): ID of the pool to share GPUs with
- `--exit-on-stdin`: Exit when stdin is closed
- `--disable-gpu-metrics`: Disable GPU metrics collection
- `--gpu-metrics-interval-ms`: GPU metrics collection interval in milliseconds
- `--listen-ip`: IP address to listen on
- `--cache-size`: Size of the cache
- `--gpu-ids`: Comma-separated list of GPU UUIDs to share
- `--labels`: Comma-separated list of key=value labels
- `--taints`: Comma-separated list of key=value taints
- `--stun-server`: Comma-separated list of STUN servers
- `--relay-server`: Relay server address
- `--force-relay`: Force using relay server
- `--gateway-port`: Gateway port number (1-65535)
- `--gateway-ips`: Comma-separated list of gateway IP addresses

### agent service
**Command**: `agent service`

**Description**: Manage the agent service (not available in WSL). These commands manage the agent service on Windows or Linux (via systemd).

#### agent service install
**Command**: `agent service install [pool-id]`

**Description**: Install the GPU Sharing agent as a service (not available in WSL)

**Parameters**:
- `pool-id` (required): ID of the pool to share GPUs with
- All parameters from `agent run` command are supported
- `--cache-size`: Size of the cache

## GPU Management

### gpu list
**Command**: `gpu list` (alias: `gpu ls`)

**Description**: List all the GPUs accessible to the user

**Parameters**:
- `--json`: Output in JSON format
- `--fields`: Specify fields to display (default fields: hostname, name, uuid, agentVersion, vram-h)
- `--sort-cols`: Sorts the output by a comma-separated list of column numbers (1-indexed). Use negative numbers for descending order. (Default: 3,2,1)

## Token Management

### m2m list
**Command**: `m2m list [id]` (alias: `m2m ls`)

**Description**: Lists all M2M tokens

**Parameters**:
- `--json`: Output in JSON format
- `--fields`: Specify fields to display (default fields: description, token, id, expiresAt)
- `--sort-cols`: Sorts the output by a comma-separated list of column numbers (1-indexed). Use negative numbers for descending order. (Default: 1)
- `id` (optional): ID of a specific token to list

### m2m create
**Command**: `m2m create`

**Description**: Creates a Machine-2-Machine authentication token for use on servers. Once you have created a M2M token pass it as a flag to the login command to authenticate with your token instead of going through a web based authentication flow.

**Parameters**:
- `--description, -d` (required): Description for this token
- `--expire-days, -e`: The number of days the token will be valid for (default: 30)

### m2m remove
**Command**: `m2m remove <id>`

**Description**: Removes a M2M token

**Parameters**:
- `id` (required): ID of the token to remove

## Pool Management

### pool list
**Command**: `pool list` (alias: `pool ls`)

**Description**: List all the pools accessible to the user

**Parameters**:
- `--json`: Output in JSON format
- `--fields`: Specify fields to display (default fields: organization.name, name, id, sessions, gpuCount)
- `--sort-cols`: Sorts the output by a comma-separated list of column numbers (1-indexed). Use negative numbers for descending order. (default sort columns: 3,2,5,4,1)

## Release Management

### release list
**Command**: `release list` (alias: `release ls`)

**Description**: List releases

**Parameters**:
- `--json`: Output in JSON format
- `--fields`: Specify fields to display (default fields: version, notes)
- `--sort-cols`: Sorts the output by a comma-separated list of column numbers (1-indexed). Use negative numbers for descending order. 

### release download
**Command**: `release download <version>` (alias: `release dl`)

**Description**: Download a specific release

**Parameters**:
- `version` (required): Version of the release to download. If only a partial version is provided (without build info), it will match the first release that starts with that version.

## Application Management

### run
**Command**: `run [flags] <application> [<application args>]`

**Description**: Starts an application using the GPU(s) available to the user

**Parameters**:
- `application` (required): The application to run
- `--ephemeral`: Always requests a new session for the application
- `--on-queue-timeout`: When a queue timeout happens, [fail, continue] (default: fail)
- `--on-connection-error`: When a connection error happens, [fail, continue] (default: fail)
- `--disable-compression`: Disables compression
- `--disable-cache`: Disables caching
- `--relaxed-api`: Enables a relaxed API conformance mode which allows for greater performance at expense of compatibility
- `--listen-ip`: IPv4 address to bind to when listening for connections
- `--disable-uvm-kernel-synchronization`: Disable synchronizing UVM memory before/after kernel launches

**Note**: The following options are mutually exclusive: session, query, gpu-ids, pool-ids, match-labels, tolerates, num-gpus, ephemeral

## Session Management

### session list
**Command**: `session list` (alias: `session ls`)

**Description**: List all the user's sessions

**Parameters**:
- `--all`: List all sessions (by default only shows active session)
- `--json`: Output in JSON format
- `--fields`: Specify fields to display (default fields: state, id, expiresAt, latencyMs, uploadMbps, downloadMbps)
- `--sort-cols`: Sorts the output by a comma-separated list of column numbers (1-indexed). Use negative numbers for descending order. (Default: 1)

### session release
**Command**: `session release`

**Description**: Releases the active session

### session request
**Command**: `session request`

**Description**: Requests a new session

**Parameters**:
- `--gpu-ids`: Comma separated list of GPU IDs to allocate
- `--pool-ids`: Comma separated list of pool IDs from which to allocate the session resources
- `--match-labels`: Comma separated list of key=value pairs
- `--tolerates`: Comma separated list of key=value pairs
- `--wait-for`: Maximum number of seconds to wait for a GPU (default: 0)
- `--no-version-check`: Disables version checking when allocating the session requirements
- `--num-gpus`: Number of GPUs required (default: 1)
- `--session-timeout`: Time for the session to be automatically returned to the pool if not in use (default: -1)
- `--watch-pid`: Watch the specified process and stop the session when it exits (default: -1)
- `--dump-config`: Dumps the client configuration to the console in JSON format

**Note**: The following options are mutually exclusive: gpu-ids, query

## User Management

### user info
**Command**: `user info [id]`

**Description**: Retrieves user information

**Parameters**:
- `--json`: Output in JSON format
- `--fields`: Specify fields to display (default fields: name, email, id)
- `--sort-cols`: Sorts the output by a comma-separated list of column numbers (1-indexed). Use negative numbers for descending order. (Default: 1)
- `id` (optional): ID of the user to get information about. If not provided, gets current user's information.
