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

### Linux Agent Installer (system service)

For Linux servers and VMs that should host GPUs continuously, use the installer script from `https://get.juicelabs.co`.
The installer can install just the `juice` binary, or install and start the agent service.

```bash
curl -so install.sh https://get.juicelabs.co
INSTALL_JUICE_TOKEN=m2m_XXX INSTALL_JUICE_POOL=<pool-id> sh ./install.sh
```

#### Installer options

| Variable | Required | Purpose |
| --- | --- | --- |
| `INSTALL_JUICE_TOKEN` | Yes | M2M token used for release download and service setup. |
| `INSTALL_JUICE_POOL` | No | Pool name or ID for `agent service install`. If omitted, the script installs binaries but does not create/start the service. |
| `INSTALL_JUICE_CONTROLLER` | No | Override controller host (default is Juice cloud controller). Useful for custom controller deployments. |
| `INSTALL_JUICE_VERSION` | No | Specific version to install. |

#### Passing runtime flags to the service

Any extra script arguments are forwarded to the underlying `juice agent run` command used by the service.
For example:

```bash
INSTALL_JUICE_TOKEN=m2m_XXX INSTALL_JUICE_POOL=<pool-id> sh ./install.sh --cache-size 128 --log-level warn
```

Use this when you need non-default service runtime behavior (for example cache sizing or log verbosity).

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
