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

On Linux, the [automated installer](../setup/installation.md) can install and enable that service in one step when `INSTALL_JUICE_POOL` is set.


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
    juice agent service stop
    ```
    :::

3. Run this command to make the service start sharing the local GPU into that pool automatically upon reboot:
```bash
juice agent service enable
```           
 
