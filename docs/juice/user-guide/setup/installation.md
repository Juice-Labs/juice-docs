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

## Linux One-Step Installer (Agent Service)

For Linux hosts that should run a persistent Juice agent service, you can use the installer script at `https://get.juicelabs.co`.

### Prerequisites

- `sudo` or root access
- `systemd` or `openrc`
- `curl` or `wget`
- An M2M token (from `app.juicelabs.co`)

### Common install patterns

Install the Juice binary only (no service created):

```bash
curl https://get.juicelabs.co | INSTALL_JUICE_TOKEN=m2m_xxx sh -
```

Install and configure the agent service in a pool:

```bash
curl https://get.juicelabs.co | INSTALL_JUICE_TOKEN=m2m_xxx INSTALL_JUICE_POOL=<pool-id> sh -
```

Install against a custom controller:

```bash
curl https://get.juicelabs.co | INSTALL_JUICE_TOKEN=m2m_xxx INSTALL_JUICE_POOL=<pool-id> INSTALL_JUICE_CONTROLLER=<controller-host> sh -
```

Pass additional agent runtime flags to the service command:

```bash
curl https://get.juicelabs.co | INSTALL_JUICE_TOKEN=m2m_xxx INSTALL_JUICE_POOL=<pool-id> sh -s - --cache-size=16 --labels region=us-east
```

### Installer environment variables

| Variable | Required | Notes |
| --- | --- | --- |
| `INSTALL_JUICE_TOKEN` | Yes | M2M token used for token validation and download authorization |
| `INSTALL_JUICE_POOL` | No | Pool ID/name for service install; if omitted, the script installs binaries but does not install/start the agent service |
| `INSTALL_JUICE_CONTROLLER` | No | Controller host (default: `electra.juicelabs.co`) |
| `INSTALL_JUICE_VERSION` | No | Version to install (defaults to latest) |
| `INSTALL_JUICE_USER` | No | Service user (default: `juice`) |
| `INSTALL_JUICE_SKIP_ENABLE` | No | If `true`, do not enable service at boot |
| `INSTALL_JUICE_SKIP_START` | No | If `true`, do not start service after install |

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
