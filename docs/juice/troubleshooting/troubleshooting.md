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

### My Linux Agent installer failed or used the wrong pool.

Set `INSTALL_JUICE_POOL` to exactly one pool name or pool ID. If the pool name contains spaces, quote it so the shell passes it as one value:

```bash
curl https://get.juicelabs.co | INSTALL_JUICE_TOKEN=m2m_XXX INSTALL_JUICE_POOL="Rendering Pool" sh -
```

If the installer reports a missing library, install or repair the dependency shown in the `- Checking ...` output. Agent service installs require `libvulkan`, `libgl`, and `libnvidia-encode`; client-only installs can omit `INSTALL_JUICE_POOL` and do not start an Agent service.

For a default service install, check service state and logs with:

```bash
sudo systemctl status juice
sudo journalctl -u juice -n 100 --no-pager
sudo less /var/lib/juice/logs/agent_service.log
```

On OpenRC systems, the installer writes service output to `/var/log/juice.log` by default.

 
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
