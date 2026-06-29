---
title:   'Sharing a GPU'
sidebar_position: 6
---
# Sharing a GPU

You can share a GPU with other Juice users by making it available in a Pool.


## Linux 

1. On the download screen from Accessing the application, scroll to the bottom and click the *Linux* tab. 

2. Select a pool beside ***To host a remote GPU…***. 

3. Copy the command line code below, then paste and run the code from inside the directory you extracted the file from on setup. 

4. While this agent is running, GPUs on this system are available within your default pool.  Visit the [juice admin guides](/docs/juice/admin/managing-pools/creating-pool.md) for information on advanced pooling. 
 

### Sharing With Agent Service (Runs as service) 

Use a service when the GPU should be shared after reboot or without an interactive terminal.

#### Install with the Juice Linux installer

The installer can download Juice, create the service user, install the agent service, and start it. It installs only the client binaries if `INSTALL_JUICE_POOL` is omitted; set both `INSTALL_JUICE_TOKEN` and `INSTALL_JUICE_POOL` to configure the agent service.

```bash
curl https://get.juicelabs.co | \
INSTALL_JUICE_TOKEN=<m2m_token> \
INSTALL_JUICE_POOL=<pool_id_or_name> \
sh -
```

If the pool name contains spaces, quote the value so the shell passes it as one pool name:

```bash
curl https://get.juicelabs.co | \
INSTALL_JUICE_TOKEN=<m2m_token> \
INSTALL_JUICE_POOL='Rendering Lab' \
sh -
```

You can pass supported `juice agent run` options to the service by appending them after `sh -s -`:

```bash
curl https://get.juicelabs.co | \
INSTALL_JUICE_TOKEN=<m2m_token> \
INSTALL_JUICE_POOL=<pool_id> \
sh -s - --cache-size=16
```

The Linux installer requires `systemd` or OpenRC, a valid M2M token, and required client libraries (`libnuma`, `libatomic`). When installing an agent service, the host must also have the agent GPU libraries available (`libvulkan`, `libgl`, `libnvidia-encode`).

#### Install with an existing Juice CLI

1. Install the agent service for a specific pool using:
```bash
juice agent service install <poolid>
```

2. Use the following command to share your local GPU:
```bash
juice agent service start
```

3. Run this command to make the service start automatically upon reboot:
```bash
juice agent service enable
```


## Windows 

### Sharing using Agent Run (Runs from CLI) 

1. Use pool list to see all pools available to you. 

2. Copy the pool id from the pool you wish to share to. 

3. Use the following command to start sharing your local GPU:
```bash
juice agent run <poolid>
```

 

### Sharing using Agent Service (Runs as service) 

1. Install the agent service for a specific pool using:
```bash
juice agent service install <poolid>
```

2. Use this command to share your local GPU into that pool:
```bash
juice agent service start
```
    :::tip
    To stop sharing, use:
    ```bash
    agent service stop
    ```
    :::

3. Run this command to make the service start sharing the local GPU into that pool automatically upon reboot:
```bash
juice agent service enable
```           
 
