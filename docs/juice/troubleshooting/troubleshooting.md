---
title:   'Troubleshooting'
sidebar_position: 13
---
# Troubleshooting

### I can’t connect to my agent.

Ensure that (1) the agent is running on the correct Pool (2) the agent has no active sessions (check agent status from that Pool’s page on the web) (3) the user you are trying to connect with has the ***Create Session*** permission for that pool. If there’s a session from another user on the agent, currently the only way to reset it is to restart the agent. 

 
### My agent isn't receiving connections (not working). 

Verify from the output that the agent is running. You may have to add RenderWin.exe to the *Windows Firewall* rules for incoming UDP connections if you weren't prompted to do so. 

If you are running an agent from a Docker container, make sure the agent's UDP gateway port is reachable from clients. The default container setup uses `JUICE_HOST_PORT=7865`, publishes `7865:7865/udp`, and sets `JUICE_HOST_IP` to the address clients should dial.

 
### My agent is shutting down when my ssh connection is closed.

For a persistent Linux agent, install it as a service:

```bash
curl https://get.juicelabs.co | \
  INSTALL_JUICE_TOKEN=m2m_xxx \
  INSTALL_JUICE_POOL="your pool" \
  sh -
```

The installer creates a service user, writes service data under `/var/lib/juice`, and starts the agent with systemd or OpenRC.


### My machine asked for a firewall exception/warning for an application that does not connect to the internet.

To connect to a remote GPU from an application that you are running through juice, you must connect to the internet with that application. This is expected behavior. Please add a firewall exception for the application in order to use it with a Remote GPU. 

 

### I'm seeing poor performance running my workload.

- Check the latency and bandwidth between your host and client. High latency (\>25ms) and low bandwidth (\<100mbs) will significantly slow down some workloads. 

- For local CLI runs, verify that you've set the logging level to ERROR in the CLI configuration.

### My Installation failed.

Check your Endpoint Security or Antivirus. If you see any warnings about blocked DLLs or executables, add an exception for **C:\Program Files\Juice GPU\juice**. If you are unable to do so, please contact your IT administrator. 

### My Linux installer failed.

- `INSTALL_JUICE_TOKEN` is required. The installer checks it against the controller before downloading a release.
- `INSTALL_JUICE_POOL` is optional. If you omit it, the installer installs only the CLI and does not create an agent service.
- Client-only installs require `libnuma` and `libatomic`.
- Agent service installs also require `libvulkan`, `libgl`, and the NVIDIA driver library `libnvidia-encode.so`.
- If you use a non-default controller, set `INSTALL_JUICE_CONTROLLER` to the controller host used for token and release checks.

### My agent failed to start.

Check to see if you're already running an agent. On Linux service installs, also check the service logs:

```bash
sudo systemctl status juice
sudo journalctl -u juice
```

If you rerun the Linux installer and no installed files changed, it may skip restarting the service. Set `INSTALL_JUICE_FORCE_RESTART=true` when you need to force a restart.
