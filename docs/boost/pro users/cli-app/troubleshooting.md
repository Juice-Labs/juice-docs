---
title:   'Troubleshooting'
sidebar_position: 12
---
# Troubleshooting

### I can’t connect to my agent.

Ensure that (1) the agent is running on the correct Pool (2) the agent has no active sessions (check agent status from that Pool’s page on the web) (3) the user you are trying to connect with has the ***Create Session*** permission for that pool. If there’s a session from another user on the agent, currently the only way to reset it is to restart the agent. 

 

### My application is not starting. 

Check the telemetry in the desktop app to see if data is uploading to the agent. If data upload is in progress, please wait. Depending on the application and the network connection this may take a few minutes. 

 

### My application is not using the Z by HP Boost GPU.

1. Verify that (1) you have an active session in the desktop client and (2) you’ve correctly set the Paths for your executable in Settings. 

2. Verify that you have the following Registry Keys set: 

    ```powershell
    **HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Session Manager\AppCertDLLs**

    RemoteGPUAppCert = C:\Program Files\HP\Boost\RemoteGPUAppCert64.dll  

    RemoteGPUAppCertWow64 = C:\Program Files\HP\Boost\x86\RemoteGPUAppCert32.dll 
    ```

 
4. Finally, verify that those files exist on your machine. You may need to add **C:\Program Files\HP\Boost** to your allowlist in in Windows Defender or other Antivirus software. 

 

### My agent isn’t receiving connections (not working). 

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
daemonize [Path/to/Boost]/agent … 
```
 

### My machine asked for a firewall exception/warning for an application that does not connect to the internet.

To connect to a remote GPU from an application that you are running through Boost, you must connect to the internet with that application. This is expected behavior. Please add a firewall exception for the application in order to use it with a Remote GPU. 

 

### I’m seeing poor performance running my workload.

- Verify that you’ve set logging level to ERROR in the desktop app or CLI 

- Check the latency and bandwidth between your host and client. High latency (&gt;25ms) and low bandwidth (&lt;100mbs) will significantly slow down some workloads. 

 
### My Installation failed.

Check your Endpoint Security or Antivirus. If you see any warnings about blocked DLLs or executables, add an exception for **C:\Program Files\HP\Boost**. If you are unable to do so, please contact your IT administrator. 

### My agent failed to start on the desktop app.

Check to see if you're already running and agent on the CLI.