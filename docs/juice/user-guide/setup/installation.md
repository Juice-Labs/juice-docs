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

There are two common Linux installation paths:

- Download and extract the release archive when you only need the CLI binaries.
- Use the one-step installer when this machine should host GPUs with the agent service.

#### Manual archive install

1. Click the download link for the Linux release.

    :::note
    Depending on your Linux configuration, you may need to download the file on a different system and transfer it to the Linux system where you intend to run Juice.
    :::

2. Unzip the downloaded file:

    ```bash
    tar -xf [juice_linux_release].tar
    ```

   ...replacing `juice_linux_release` with the filename of the downloaded archive.

#### One-step Linux agent installer

Use the installer when you want Juice to install the Linux binaries and configure the agent as a system service.

1. Create a Machine-to-Machine (M2M) token. See [Machine-to-Machine (M2M) Tokens](/docs/juice/user-guide/cli-app/m2m-tokens.md).
2. Choose the pool where the agent should run. You can use a pool ID or pool name.
3. Run the installer:

    ```bash
    curl https://get.juicelabs.co | \
      INSTALL_JUICE_TOKEN=m2m_xxx \
      INSTALL_JUICE_POOL="GPU Lab" \
      sh -
    ```

    Quote `INSTALL_JUICE_POOL` when the pool name contains spaces. If `INSTALL_JUICE_POOL` is omitted, the installer installs the Juice binaries but does not create or start the agent service.

4. Pass agent service options after `sh -s -` when needed:

    ```bash
    curl https://get.juicelabs.co | \
      INSTALL_JUICE_TOKEN=m2m_xxx \
      INSTALL_JUICE_POOL=pool-123 \
      sh -s - --cache-size 128 --gateway-port 7865
    ```

Common installer environment variables:

| Variable | Required | Purpose |
| --- | --- | --- |
| `INSTALL_JUICE_TOKEN` | Yes | M2M token used to authenticate and download the release. |
| `INSTALL_JUICE_POOL` | No | Pool name or ID for the agent service. Omit it for a client-only binary install. |
| `INSTALL_JUICE_CONTROLLER` | No | Custom controller host. Defaults to `electra.juicelabs.co`. |
| `INSTALL_JUICE_VERSION` | No | Release version to install. Defaults to the latest stable release. |
| `INSTALL_JUICE_USER` | No | System user for the agent service. Defaults to `juice`. |
| `INSTALL_JUICE_NAME` | No | Systemd/OpenRC service name. Defaults to `juice`. |

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
