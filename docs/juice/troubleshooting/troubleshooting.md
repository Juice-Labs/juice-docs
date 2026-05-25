---
title:   'Troubleshooting'
sidebar_position: 13
---
# Troubleshooting

### I can’t connect to my agent.

Ensure that (1) the agent is running on the correct Pool (2) the agent has no active sessions (check agent status from that Pool’s page on the web) (3) the user you are trying to connect with has the ***Create Session*** permission for that pool. If there’s a session from another user on the agent, currently the only way to reset it is to restart the agent. 

 
### My agent isn't receiving connections (not working). 

Verify from the output that the agent is running. You may have to add RenderWin.exe to the *Windows Firewall* rules for incoming UDP connections if you weren’t prompted to do so. 

If you are running an agent from a Docker container, make sure UDP port `7865` is published to the host, or publish the port set in `JUICE_HOST_PORT`. Also verify `JUICE_HOST_IP` contains the host address that clients can actually reach.

### My Linux installer completed but did not create an agent service.

The Linux installer only creates the service when `INSTALL_JUICE_POOL` is set. This can be a pool ID or pool name:

```bash
curl https://get.juicelabs.co | \
INSTALL_JUICE_TOKEN=<m2m_token> \
INSTALL_JUICE_POOL="<pool name or id>" \
sh -
```

If the pool name contains spaces, keep it quoted. Without `INSTALL_JUICE_POOL`, the installer installs the client binary and skips service creation.

### My Linux installer failed while checking libraries.

The installer checks client dependencies first (`libatomic`, `libnuma`, and glibc 2.27 or newer). When `INSTALL_JUICE_POOL` is set, it also requires agent libraries such as `libvulkan`, `libgl`, and `libnvidia-encode`. Install the missing library reported in the installer output, then rerun the installer.

If you are using a non-default Juice controller, include `INSTALL_JUICE_CONTROLLER=<host>` so token checks, release downloads, and service configuration use the same controller.

 
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

### My agent failed to start.

Check to see if you're already running an agent.
