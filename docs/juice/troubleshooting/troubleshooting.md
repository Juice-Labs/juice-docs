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

### Linux installer exits with dependency errors.

The Linux installer validates required runtime dependencies before it installs:

- `glibc` must be version `2.27` or newer.
- Client dependencies must be present: `libnuma` and `libatomic`.
- Agent dependencies are required when installing a service with `INSTALL_JUICE_POOL`: `libvulkan`, `libgl`, and `libnvidia-encode`.

If you are doing a binary-only install (no `INSTALL_JUICE_POOL`), missing agent-only libraries are reported as warnings instead of hard failures.

### Linux installer says token check failed.

This usually means one of these:

- `INSTALL_JUICE_TOKEN` is invalid or expired.
- `INSTALL_JUICE_CONTROLLER` points to the wrong controller host.
- The machine cannot reach the controller over HTTPS.

Verify the token value, confirm the controller hostname, and retry.

### Installer completed but no agent service is running.

When `INSTALL_JUICE_POOL` is omitted, the installer only installs binaries and does not create or start the agent service.
Re-run the installer with both `INSTALL_JUICE_TOKEN` and `INSTALL_JUICE_POOL` to create the service.

### My agent failed to start.

Check to see if you're already running an agent.
