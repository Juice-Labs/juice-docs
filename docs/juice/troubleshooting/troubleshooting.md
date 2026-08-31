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

- Publish UDP port `7865` (or your `JUICE_HOST_PORT`)
- Set `JUICE_HOST_IP` to addresses clients can actually reach
- Pass GPUs into the container with `--gpus all` (or equivalent Compose device reservations)

If you are running the agent in Kubernetes, the Helm chart sets `JUICE_HOST_IP` from the pod IP. Clients must be able to reach that address on the agent port. See [Kubernetes](../admin/kubernetes.md).

 
### My agent is shutting down when my ssh connection is closed.

Prefer the [automated Linux installer](../user-guide/setup/installation.md), which installs the agent as a systemd or OpenRC service so it keeps running after logout.

If you are launching the agent manually, use *daemonize* (or another process supervisor):
:::tip
    You can install *daemonize* with the command:
        ```bash
        sudo apt install daemonize
        ```

:::

#### Example:

```bash
daemonize [Path/to/juice]/agent …
```
 

### My machine asked for a firewall exception/warning for an application that does not connect to the internet.

To connect to a remote GPU from an application that you are running through juice, you must connect to the internet with that application. This is expected behavior. Please add a firewall exception for the application in order to use juice with a Remote GPU. 

 

### I'm seeing poor performance running my workload.

- Check the latency and bandwidth between your host and client. High latency (\>25ms) and low bandwidth (\<100mbs) will significantly slow down some workloads. 

- Verify that you've set logging level to ERROR in the CLI configuration.
### My Installation failed.

**Windows:** Check your Endpoint Security or Antivirus. If you see any warnings about blocked DLLs or executables, add an exception for **C:\Program Files\Juice GPU\juice**. If you are unable to do so, please contact your IT administrator.

**Linux automated installer:**

- Confirm `INSTALL_JUICE_TOKEN` is set and valid
- Install missing libraries reported by the script (`libnuma`, `libatomic`, and for agents `libvulkan`, `libgl`, `libnvidia-encode`)
- Quote `INSTALL_JUICE_POOL` when the pool name contains spaces
- Ensure systemd or OpenRC is available if you are installing the agent service
- Allow outbound access to your Juice controller (default `electra.juicelabs.co`) and `https://get.juicelabs.co`

### My agent failed to start.

Check to see if you're already running an agent.

For a Linux service install, inspect logs with `journalctl -u juice -e` and confirm the service user can access the NVIDIA driver devices.

### My Slurm job did not get a GPU.

Confirm `--juice-pool` is set, the M2M token in `juice-config.sh` can create sessions in that pool, and the shared session directory is writable on `slurmctld` and readable on compute nodes. See [Slurm](../admin/slurm.md).
