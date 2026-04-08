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

### Linux (Automated Installer Script)

If you prefer a one-step install on Linux, use the installer script from `https://get.juicelabs.co`.

This script always installs the `juice` binary and symlinks. It only installs and starts the agent service when `INSTALL_JUICE_POOL` is set.

#### Install client tools only

```bash
curl -fsSL https://get.juicelabs.co | \
INSTALL_JUICE_TOKEN=<m2m_token> \
sh -
```

#### Install and register agent service in a pool

```bash
curl -fsSL https://get.juicelabs.co | \
INSTALL_JUICE_TOKEN=<m2m_token> \
INSTALL_JUICE_POOL=<pool_id_or_name> \
sh -
```

#### Use a custom controller (self-hosted/private deployments)

```bash
curl -fsSL https://get.juicelabs.co | \
INSTALL_JUICE_TOKEN=<m2m_token> \
INSTALL_JUICE_POOL=<pool_id_or_name> \
INSTALL_JUICE_CONTROLLER=<controller_hostname> \
sh -
```

#### Pass additional agent flags during service install

```bash
curl -fsSL https://get.juicelabs.co | \
INSTALL_JUICE_TOKEN=<m2m_token> \
INSTALL_JUICE_POOL=<pool_id_or_name> \
sh -s - --cache-size=16
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
