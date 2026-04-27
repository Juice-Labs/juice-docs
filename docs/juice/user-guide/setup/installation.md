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
There are two supported Linux installation flows:

- **Download archive**: Manually download and extract the release from [app.juicelabs.co](https://app.juicelabs.co).
- **Install script**: Use the Linux installer when you want the installer to download the latest release, create symlinks, or install the GPU agent as a service.

#### Download archive

1. Click the download link for the Linux release. 

    :::note
    Depending on your Linux configuration, you may need to download the file on a different system and transfer it to the Linux system where you intend to run Juice. 
    :::
 
2. Unzip the downloaded file: 

    ```powershell
    tar -xf [juice_linux_release].tar 
    ```

   ...replacing `juice_linux_release` with the filename of the downloaded archive.

#### Install script

Use an M2M token with the installer so the host can download the correct release and, if requested, install the agent service.

```bash
curl https://get.juicelabs.co | INSTALL_JUICE_TOKEN=<m2m-token> sh -
```

To install Juice and immediately configure the agent service for a pool, include `INSTALL_JUICE_POOL`:

```bash
curl https://get.juicelabs.co | \
INSTALL_JUICE_TOKEN=<m2m-token> \
INSTALL_JUICE_POOL=<pool-id-or-name> \
sh -
```

If `INSTALL_JUICE_POOL` is not set, the installer installs the Juice client tools but does not install or start the agent service. This is useful for client-only machines and build images.

The installer supports these environment variables:

| Variable | Purpose |
| --- | --- |
| `INSTALL_JUICE_TOKEN` | Required M2M token created in [app.juicelabs.co](https://app.juicelabs.co). |
| `INSTALL_JUICE_POOL` | Pool name or ID for the agent service. Omit this for a client-only install. |
| `INSTALL_JUICE_CONTROLLER` | Custom Juice Controller hostname. Defaults to `electra.juicelabs.co`. |
| `INSTALL_JUICE_VERSION` | Specific Juice version to install. If omitted, the installer uses the latest stable release. |
| `INSTALL_JUICE_USER` | User that runs the service. Defaults to `juice`. |
| `INSTALL_JUICE_SKIP_ENABLE` | Set to `true` to install the service without enabling or starting it. |
| `INSTALL_JUICE_SKIP_START` | Set to `true` to enable the service without starting it immediately. |
| `INSTALL_JUICE_FORCE_RESTART` | Set to `true` to restart the service even when the service configuration did not change. |
| `INSTALL_JUICE_SYMLINK` | Controls symlink creation. Use `skip`, `force`, or omit for the default behavior. |

Any arguments after `sh -s -` are passed to the generated agent service command. For example:

```bash
curl https://get.juicelabs.co | \
INSTALL_JUICE_TOKEN=<m2m-token> \
INSTALL_JUICE_POOL=<pool-id-or-name> \
sh -s - --cache-size=16
```

:::tip
For private or self-hosted controller deployments, set `INSTALL_JUICE_CONTROLLER` to the controller hostname only, without `https://`.
:::

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
