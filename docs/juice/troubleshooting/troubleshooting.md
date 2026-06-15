---
title:   'Troubleshooting'
sidebar_position: 13
---
# Troubleshooting

### I can’t connect to my agent.

Ensure that (1) the agent is running on the correct Pool (2) the agent has no active sessions (check agent status from that Pool’s page on the web) (3) the user you are trying to connect with has the ***Create Session*** permission for that pool. If there’s a session from another user on the agent, currently the only way to reset it is to restart the agent. 

 
### My agent isn't receiving connections (not working). 

Verify from the output that the agent is running. You may have to add RenderWin.exe to the *Windows Firewall* rules for incoming UDP connections if you weren’t prompted to do so. 

If you are running an Agent from Docker, publish the Agent UDP port, for example `-p 7865:7865/udp`, or use host networking if your network setup requires it. Make sure `JUICE_HOST_IP` advertises an IP address that the client can actually reach.

If you are running an Agent from Kubernetes, make sure clients can route UDP traffic to the IP advertised by the pod and to the configured `agent.port`. The Helm chart sets `JUICE_HOST_IP` from `status.podIP`; clusters that do not expose pod IPs to clients may need host networking or another networking strategy.

 
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

On Linux, the installer requires `curl` or `wget`, `systemd` or `openrc`, a valid `INSTALL_JUICE_TOKEN`, and glibc 2.27 or newer. Client-only installs require `libnuma` and `libatomic`. Agent service installs also require Vulkan, OpenGL, and NVIDIA encode runtime libraries; omit `INSTALL_JUICE_POOL` only when you want to install the client binaries without creating or starting the Agent service.

### My agent failed to start.

Check to see if you're already running an agent.
