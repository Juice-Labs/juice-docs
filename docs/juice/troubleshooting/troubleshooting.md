---
title:   'Troubleshooting'
sidebar_position: 13
---
# Troubleshooting

### I can’t connect to my agent.

Ensure that (1) the agent is running on the correct Pool (2) the agent has no active sessions (check agent status from that Pool’s page on the web) (3) the user you are trying to connect with has the ***Create Session*** permission for that pool. If there’s a session from another user on the agent, currently the only way to reset it is to restart the agent. 

 
### My agent isn't receiving connections (not working). 

Verify from the output that the agent is running. You may have to add RenderWin.exe to the *Windows Firewall* rules for incoming UDP connections if you weren’t prompted to do so. 

If you are running an agent from a Docker container, make sure you are using **network=host**. 

 
### My agent is shutting down when my ssh connection is closed.

In order to have a linux agent run persistently, launch it using *daemonize*.
:::tip
    You can install *daemonize* with the command:
        ```powershell
        sudo apt install daemonize
        ```

:::

#### Example:

```powershell
daemonize [Path/to/juice]/agent … 
```
 

### My machine asked for a firewall exception/warning for an application that does not connect to the internet.

To connect to a remote GPU from an application that you are running through juice, you must connect to the internet with that application. This is expected behavior. Please add a firewall exception for the application in order to use it with a Remote GPU. 

 

### I'm seeing poor performance running my workload.

- Check the latency and bandwidth between your host and client. High latency (\>25ms) and low bandwidth (\<100mbs) will significantly slow down some workloads. 

- Verify that you've set logging level to ERROR in the CLI configuration.
### My Installation failed.

Check your Endpoint Security or Antivirus. If you see any warnings about blocked DLLs or executables, add an exception for **C:\Program Files\Juice GPU\juice**. If you are unable to do so, please contact your IT administrator. 

### Linux installer completed, but no agent service was created.

If you ran the Linux installer without `INSTALL_JUICE_POOL`, it installs binaries but intentionally skips `agent service install`.

Use a pool ID or name to install and start the agent service:

```bash
curl https://get.juicelabs.co | \
INSTALL_JUICE_TOKEN=<m2m_token> \
INSTALL_JUICE_POOL=<pool_id_or_name> \
sh -
```

### Linux installer exits with "Please correct the above errors".

The installer validates Linux dependencies before install. Common missing libraries are:
- Client: `libnuma`, `libatomic`
- Agent (required when `INSTALL_JUICE_POOL` is set): `libvulkan`, `libgl`, `libnvidia-encode`

You can inspect currently visible libraries with:

```bash
ldconfig -p | grep -E "libnuma|libatomic|libvulkan|libGL|libnvidia-encode"
```

If `libnvidia-encode` is missing, confirm the NVIDIA driver installation is complete and loaded.

### Linux installer fails token check against a non-default controller.

If your organization uses a custom controller hostname, include `INSTALL_JUICE_CONTROLLER`. The installer uses this host for token validation and release download APIs.

```bash
curl https://get.juicelabs.co | \
INSTALL_JUICE_TOKEN=<m2m_token> \
INSTALL_JUICE_POOL=<pool_id_or_name> \
INSTALL_JUICE_CONTROLLER=<controller_host> \
sh -
```

### My agent failed to start.

Check to see if you're already running an agent.
