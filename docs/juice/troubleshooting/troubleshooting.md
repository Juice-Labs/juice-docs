---
title:   'Troubleshooting'
sidebar_position: 13
---
# Troubleshooting

### I can’t connect to my agent.

Ensure that (1) the agent is running on the correct Pool (2) the agent has no active sessions (check agent status from that Pool’s page on the web) (3) the user you are trying to connect with has the ***Create Session*** permission for that pool. If there’s a session from another user on the agent, currently the only way to reset it is to restart the agent. 

 
### My agent isn't receiving connections (not working). 

Verify from the output that the agent is running. You may have to add RenderWin.exe to the *Windows Firewall* rules for incoming UDP connections if you weren’t prompted to do so. 

If you are running an agent from a Docker container, set `JUICE_HOST_IP` to addresses clients can reach and publish the UDP gateway port (default `7865`). The official image does not require `--network=host`. See [Agent in Docker](../user-guide/docker/docker-agent.md). 

 
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

### The Linux installer failed.

The automated installer at `https://get.juicelabs.co` requires `INSTALL_JUICE_TOKEN` and glibc 2.27+. Missing `libnuma` / `libatomic` is always fatal. Missing `libvulkan` / `libgl` / `libnvidia-encode` is fatal only when `INSTALL_JUICE_POOL` is set. See [Installation](../user-guide/setup/installation.md) and [System Requirements](../user-guide/setup/systerm-reqs.md).

### My Helm agent pods stay Pending.

If you set a custom `nodeSelector`, the chart drops its default `nvidia.com/gpu` toleration. Add matching `tolerations`, or leave `nodeSelector` empty so the chart can use `nodeSelectorPreset`. The chart also spreads at most one agent pod per node; extra replicas stay `Pending`. See [Kubernetes](../admin/kubernetes.md).

### My Slurm job never reaches the compute node.

Confirm `PrologSlurmctld` can reach the Juice controller with the M2M token in `juice-config.sh`, and that `--juice-pool` is set. A failed `juice session request` makes the prolog exit non-zero. Check `JUICE_ERROR_LOG` (default `/tmp/juice.log`) on the controller. The job flag is `--juice-num-gpus`, not `--juice-gpu-count`. See [Slurm](../admin/slurm.md).
