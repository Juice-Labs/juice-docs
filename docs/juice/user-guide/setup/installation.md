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

### Automated Linux Agent Installer

Use the Linux installer when you want to install the Juice binaries and configure the GPU Agent as a `systemd` or `openrc` service in one step. The installer creates the service user, installs the release, writes the service configuration, and starts the service unless instructed otherwise.

```bash
curl https://get.juicelabs.co | \
INSTALL_JUICE_TOKEN=<m2m_token> \
INSTALL_JUICE_POOL="Research Pool" \
sh -
```

- `INSTALL_JUICE_TOKEN` is required. Use an M2M token created from the Juice app or with `juice m2m create`.
- `INSTALL_JUICE_POOL` is the pool name or pool ID where the agent should register. Quote pool names that contain spaces or shell-special characters.
- Omit `INSTALL_JUICE_POOL` for a client-only install. The installer still installs the binaries and symlinks, but it does not create or start the agent service.
- Pass agent service flags after `sh -` when you need to customize the generated service command.

For example, to set a cache size for the installed agent service:

```bash
curl https://get.juicelabs.co | \
INSTALL_JUICE_TOKEN=<m2m_token> \
INSTALL_JUICE_POOL=<pool_id> \
sh - --cache-size 128
```

Installer behavior is defined in the open-source [agent installer](https://github.com/Juice-Labs/juice-oss/tree/main/installer).

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
