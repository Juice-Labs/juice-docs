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
You can install Juice on Linux from the release archive, or use the installer when you want to install an agent service on a GPU host.

#### Release Archive

1. Click the download link for the Linux release. 

    :::note
    Depending on your Linux configuration, you may need to download the file on a different system and transfer it to the Linux system where you intend to run Juice. 
    :::
 
2. Unzip the downloaded file: 

    ```powershell
    tar -xf [juice_linux_release].tar 
    ```

   ...replacing `juice_linux_release` with the filename of the downloaded archive.

#### Agent Installer

Use the Linux installer when you want to install Juice and optionally register the GPU host as a persistent agent service. The installer requires `curl` or `wget`, glibc 2.27 or newer, and either systemd or OpenRC when installing a service.

1. Create an M2M token from an already-authenticated machine:

    ```bash
    juice m2m create --description "agent installer"
    ```

2. If this machine will share GPUs, choose the pool where the agent should run:

    ```bash
    juice pool list
    ```

3. Install the agent service by passing the token and pool:

    ```bash
    curl https://get.juicelabs.co | INSTALL_JUICE_TOKEN=m2m_XXX INSTALL_JUICE_POOL=<pool-id-or-name> sh -
    ```

    Additional `juice agent run` options can be passed to the service command as script arguments. For example, to set the agent cache size:

    ```bash
    curl https://get.juicelabs.co | INSTALL_JUICE_TOKEN=m2m_XXX INSTALL_JUICE_POOL=<pool-id-or-name> sh -s - --cache-size=128
    ```

    To install only the Juice client binaries, omit `INSTALL_JUICE_POOL`:

    ```bash
    curl https://get.juicelabs.co | INSTALL_JUICE_TOKEN=m2m_XXX sh -
    ```

    Without `INSTALL_JUICE_POOL`, agent-only library checks are warnings and the installer does not create, enable, or start a service.

##### Installer Options

| Option | Description | Default |
| --- | --- | --- |
| `INSTALL_JUICE_TOKEN` | M2M token used to authenticate the installer. | Required |
| `INSTALL_JUICE_POOL` | Pool name or ID for the agent service. Omit for client-only install. | None |
| `INSTALL_JUICE_CONTROLLER` | Custom Juice Controller host for non-default environments. | `electra.juicelabs.co` |
| `INSTALL_JUICE_VERSION` | Juice version to install. | Latest stable release |
| `INSTALL_JUICE_USER` | System user that runs the service. | `juice` |
| `INSTALL_JUICE_NAME` | Name of the systemd/OpenRC service. | `juice` |
| `INSTALL_JUICE_SKIP_ENABLE` | Set to `true` to skip enabling and starting the service. | Not set |
| `INSTALL_JUICE_SKIP_START` | Set to `true` to enable but not start the service. | Not set |
| `INSTALL_JUICE_FORCE_RESTART` | Set to `true` to restart the service even when configuration did not change. | Not set |
| `INSTALL_JUICE_EXEC` | Additional arguments for the service command, equivalent to passing script arguments after `sh -s -`. | None |

If your organization uses a custom controller, include it during install:

```bash
curl https://get.juicelabs.co | \
  INSTALL_JUICE_TOKEN=m2m_XXX \
  INSTALL_JUICE_POOL=<pool-id-or-name> \
  INSTALL_JUICE_CONTROLLER=controller.example.com \
  sh -
```

The installer exits with an error if required client dependencies are missing, if required agent dependencies are missing while `INSTALL_JUICE_POOL` is set, or if service installation fails.

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
