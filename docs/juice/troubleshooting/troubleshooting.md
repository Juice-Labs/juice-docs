---
title:   'Troubleshooting'
sidebar_position: 13
---
# Troubleshooting

### I can’t connect to my agent.

Ensure that (1) the agent is running on the correct Pool (2) the agent has no active sessions (check agent status from that Pool’s page on the web) (3) the user you are trying to connect with has the ***Create Session*** permission for that pool. If there’s a session from another user on the agent, currently the only way to reset it is to restart the agent. 

 
### My agent isn't receiving connections (not working). 

Verify from the output that the agent is running. You may have to add RenderWin.exe to the *Windows Firewall* rules for incoming UDP connections if you weren’t prompted to do so. 

If you are running an agent from a Docker container, make sure UDP port `7865` is reachable from clients. Publish the port with `-p 7865:7865/udp` or use host networking, and set `JUICE_HOST_IP` to an address that clients can reach. If you set a non-default gateway port, set `JUICE_HOST_PORT` to the same port.

 
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

On Linux, the installer checks system libraries before installing. Client installs require `libnuma` and `libatomic`. Agent service installs also require `libvulkan`, `libgl`, and `libnvidia-encode`. If you install an agent into a pool whose name contains spaces, quote the pool value, for example `INSTALL_JUICE_POOL='Rendering Pool'`.

### My agent failed to start.

Check to see if you're already running an agent.
