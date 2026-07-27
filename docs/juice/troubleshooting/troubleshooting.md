---
title:   'Troubleshooting'
sidebar_position: 13
---
# Troubleshooting

### I can’t connect to my agent.

Ensure that (1) the agent is running on the correct Pool (2) the agent has no active sessions (check agent status from that Pool’s page on the web) (3) the user you are trying to connect with has the ***Create Session*** permission for that pool. If there’s a session from another user on the agent, currently the only way to reset it is to restart the agent. 

 
### My agent isn't receiving connections (not working). 

Verify from the output that the agent is running. You may have to add RenderWin.exe to the *Windows Firewall* rules for incoming UDP connections if you weren’t prompted to do so. 

If you are running an agent from a Docker container:

- Publish the agent UDP port (default `7865/udp`), for example `-p 7865:7865/udp`.
- Set `JUICE_HOST_IP` to a client-reachable host address (LAN and/or public IP), not only a container-local address.
- Confirm GPUs are visible to the container with `--gpus all` (or an equivalent NVIDIA Container Toolkit device reservation).

 
### My agent is shutting down when my ssh connection is closed.

For a persistent Linux agent, prefer the [automated installer](../user-guide/setup/installation.md) or `juice agent service install`, which create a systemd/OpenRC service that continues after logout.

If you need a foreground/manual process to survive SSH disconnects, launch it using *daemonize*.
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

### The Linux automated installer finished, but no agent service is running.

- If `INSTALL_JUICE_POOL` was omitted, the installer intentionally installs binaries only and does not create or start a service. Re-run with a pool ID or quoted pool name.
- If you set `INSTALL_JUICE_SKIP_ENABLE=true` or `INSTALL_JUICE_SKIP_START=true`, enable/start the service manually after install.
- Check `/var/lib/juice/logs/agent_service.log` for service startup errors.
- On Linux ARM hosts that report `aarch64`, set `ARCH=arm64` so the installer can download the arm64 release.

### The Linux installer fails with dependency or token errors.

- `Token check failed`: confirm the M2M token is valid and that the host can reach the controller (`electra.juicelabs.co` by default, or your `INSTALL_JUICE_CONTROLLER`).
- `glibc version must be at least 2.27`: upgrade the OS/glibc baseline before retrying.
- `missing library ...` / `Please correct the above errors`: install the libraries listed in [System Requirements](../user-guide/setup/systerm-reqs.md). Agent libraries such as `libnvidia-encode` are fatal only when installing with a pool.
- `Unsupported architecture`: use `x86_64`/`amd64` or `arm64` (set `ARCH=arm64` when `uname -m` is `aarch64`).
 

### My machine asked for a firewall exception/warning for an application that does not connect to the internet.

To connect to a remote GPU from an application that you are running through juice, you must connect to the internet with that application. This is expected behavior. Please add a firewall exception for the application in order to use it with a Remote GPU. 

 

### I'm seeing poor performance running my workload.

- Check the latency and bandwidth between your host and client. High latency (\>25ms) and low bandwidth (\<100mbs) will significantly slow down some workloads. 

- Verify that you've set logging level to ERROR in the CLI configuration.
### My Installation failed.

Check your Endpoint Security or Antivirus. If you see any warnings about blocked DLLs or executables, add an exception for **C:\Program Files\Juice GPU\juice**. If you are unable to do so, please contact your IT administrator. 

### My agent failed to start.

Check to see if you're already running an agent.
