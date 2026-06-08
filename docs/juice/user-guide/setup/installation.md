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

### Linux Agent service installer

Use the Linux installer when you want a machine to host GPUs persistently as a Juice Agent. The installer downloads the selected Juice release, creates a `juice` service user by default, writes the Agent service configuration, and installs a `systemd` or OpenRC service.

Before running the installer, create an M2M token and choose the pool for this Agent:

```bash
juice m2m create --description "agent installer"
juice pool list
```

Install the Agent service with the token and pool name or ID:

```bash
curl https://get.juicelabs.co | INSTALL_JUICE_TOKEN=m2m_XXX INSTALL_JUICE_POOL="Rendering Pool" sh -
```

Pool names that contain spaces must be quoted by your shell, as shown above. The installer passes the quoted pool value through to `juice agent service install`, but the shell still needs to receive the pool name as one environment variable value.

To pass additional `juice agent run` flags to the service, provide them as installer arguments. For example, this persists a custom cache size in the generated service command:

```bash
curl -so install.sh https://get.juicelabs.co
INSTALL_JUICE_TOKEN=m2m_XXX INSTALL_JUICE_POOL="Rendering Pool" sh ./install.sh --cache-size 128
```

The installer does not force a log level for the service. If you need verbose service logs while troubleshooting, pass a log flag explicitly, such as `--log-level trace`, when you run the installer.

Common installer options:

| Option | Purpose | Default |
| --- | --- | --- |
| `INSTALL_JUICE_TOKEN` | M2M token used to authenticate the install and create the Agent service token. | Required |
| `INSTALL_JUICE_POOL` | Pool name or ID for the Agent service. If omitted, the installer installs binaries but does not create or start the Agent service. | None |
| `INSTALL_JUICE_VERSION` | Juice version to install. | Latest stable release |
| `INSTALL_JUICE_USER` | Local service account used to run the Agent. | `juice` |
| `INSTALL_JUICE_NAME` | `systemd` or OpenRC service name. | `juice` |
| `INSTALL_JUICE_CONTROLLER` | Custom Juice Controller hostname. | `electra.juicelabs.co` |
| `INSTALL_JUICE_EXEC` | Additional `juice agent run` flags to include in the generated service command. Script arguments can also be used for simple flags. | None |
| `INSTALL_JUICE_SKIP_ENABLE` | Set to `true` to skip enabling and starting the service. | Not set |
| `INSTALL_JUICE_SKIP_START` | Set to `true` to enable the service without starting it immediately. | Not set |

To uninstall the Agent service and installed files:

```bash
/usr/local/juice/uninstall.sh
```

If your install path was customized, run `uninstall.sh` from that install directory instead.

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
