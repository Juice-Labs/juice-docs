---
title:   'Installation'
sidebar_position: 2
---
# Installation

Welcome to Juice! This guide will walk you through the installation process.

Before you begin, make sure you have:
- An account on [app.juicelabs.co](https://app.juicelabs.co) (if you don't have one, sign up or reach out to info@juicelabs.co)
- Administrator privileges on your system
- At least 500MB of free disk space

Log in to [app.juicelabs.co](https://app.juicelabs.co):

![Download links](/img/juice/download_links.png)

### Windows
1. Click on the download link for the Windows release.
2. Run the installer and follow the steps outlined in the installation wizard.


### Linux
1. Click the download link for the Linux release. 

    :::note
    Depending on your Linux configuration, you may need to download the file on a different system and transfer it to the Linux system where you intend to run Juice. 
    :::
 
2. Unzip the downloaded file: 

    ```powershell
    tar -xf [juice_linux_release].tar 
    ```

   ...replacing `juice_linux_release` with the filename of the downloaded archive.

### Linux Agent Installer

For headless Linux hosts that should share a GPU continuously, use the installer script to install Juice and optionally configure the agent as a systemd or OpenRC service.

Before you start:

- Create an M2M token with `juice m2m create --description "agent installer"`.
- Choose the target pool with `juice pool list`.
- Run the installer on the GPU host with administrator privileges.

```bash
curl https://get.juicelabs.co | \
  INSTALL_JUICE_TOKEN=m2m_XXX \
  INSTALL_JUICE_POOL="<pool name or id>" \
  sh -
```

`INSTALL_JUICE_POOL` can be a pool name or ID. Quote pool names that contain spaces so the shell passes the value as one argument.

To install Juice without creating or starting the agent service, omit `INSTALL_JUICE_POOL`:

```bash
curl https://get.juicelabs.co | INSTALL_JUICE_TOKEN=m2m_XXX sh -
```

You can pass additional `agent run` options after `sh -s -`. These options are stored in the service command and used each time the service starts:

```bash
curl https://get.juicelabs.co | \
  INSTALL_JUICE_TOKEN=m2m_XXX \
  INSTALL_JUICE_POOL="<pool name or id>" \
  sh -s - --cache-size 128 --gpu-ids GPU-uuid-1,GPU-uuid-2
```

Common installer environment variables:

| Variable | Required | Description |
| --- | --- | --- |
| `INSTALL_JUICE_TOKEN` | Yes | M2M token used to authenticate, find the release, download Juice, and create the agent service config. |
| `INSTALL_JUICE_POOL` | No | Pool name or ID for the agent service. If omitted, the installer only installs the Juice binaries. |
| `INSTALL_JUICE_CONTROLLER` | No | Custom controller host name. Defaults to `electra.juicelabs.co`. |
| `INSTALL_JUICE_VERSION` | No | Specific Juice version to install. If omitted, the installer uses the latest stable release. |
| `INSTALL_JUICE_USER` | No | Linux user that runs the service. Defaults to `juice`. |
| `INSTALL_JUICE_SKIP_ENABLE` | No | Set to `true` to create the service without enabling or starting it. |
| `INSTALL_JUICE_SKIP_START` | No | Set to `true` to enable the service without starting it immediately. |
| `INSTALL_JUICE_FORCE_RESTART` | No | Set to `true` to restart the service even when the installed files and service config are unchanged. |

For private or dedicated controllers, set `INSTALL_JUICE_CONTROLLER` to the controller host:

```bash
curl https://get.juicelabs.co | \
  INSTALL_JUICE_TOKEN=m2m_XXX \
  INSTALL_JUICE_POOL="<pool name or id>" \
  INSTALL_JUICE_CONTROLLER=controller.example.com \
  sh -
```

## (Optional) Adding juice to PATH 

#### To enable your system to run `juice` from any directory: 

1. Open your shell's configuration file in a text editor:

    ```powershell
    nano ~/.bashrc
    ```

2. Add the following at the end of the file:

    ```powershell
    export PATH=$PATH:/path/to/juice_directory
    ```

...replacing `/path/to/juice_directory` with the actual path to the directory containing the Juice executable. 

3. Save and exit the editor. 
    :::tip
    In nano, you can save and exit by pressing Ctrl+X, then Y, then Enter. 
    :::

4. Apply the changes to your current session: 

    ```powershell
    source ~/.bashrc 
    ```
