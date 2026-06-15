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

### Linux automated installer

The Linux installer can install Juice as a client, or install and start the GPU Agent as a `systemd` or `openrc` service when you provide a pool. The installer always requires an M2M token so it can verify access and download the requested release.

Create an M2M token from a machine where you are already logged in:

```bash
juice m2m create --description "linux installer"
```

To install the client binaries only, omit `INSTALL_JUICE_POOL`:

```bash
curl https://get.juicelabs.co | INSTALL_JUICE_TOKEN=m2m_XXX sh -
```

To install the GPU Agent service, include the pool ID or name. Quote pool names that contain spaces:

```bash
curl https://get.juicelabs.co | INSTALL_JUICE_TOKEN=m2m_XXX INSTALL_JUICE_POOL="Lab GPUs" sh -
```

Additional arguments after `sh -s -` are added to the service command:

```bash
curl https://get.juicelabs.co | \
  INSTALL_JUICE_TOKEN=m2m_XXX \
  INSTALL_JUICE_POOL="Lab GPUs" \
  sh -s - --cache-size=128 --gpu-ids=GPU-123,GPU-456
```

#### Installer options

| Option | Purpose | Default |
| --- | --- | --- |
| `INSTALL_JUICE_TOKEN` | M2M token used to verify access and download Juice. | Required |
| `INSTALL_JUICE_POOL` | Pool name or ID for the Agent service. If omitted, the service is not installed or started. | None |
| `INSTALL_JUICE_VERSION` | Juice version to install. A partial version matches the first release with that prefix. | Stable latest |
| `INSTALL_JUICE_CONTROLLER` | Controller host used for token checks, release lookup, downloads, and service configuration. | `electra.juicelabs.co` |
| `INSTALL_JUICE_USER` | Local user that runs the Agent service. | `juice` |
| `INSTALL_JUICE_NAME` | `systemd` or `openrc` service name. | `juice` |
| `INSTALL_JUICE_EXEC` | Extra arguments to append to the Agent service command. Script arguments after `sh -s -` are equivalent. | None |
| `INSTALL_JUICE_SYMLINK` | `skip` avoids symlink creation; `force` overwrites existing symlinks. | Create if missing |
| `INSTALL_JUICE_SKIP_ENABLE` | Set to `true` to create files without enabling or starting the service. | `false` |
| `INSTALL_JUICE_SKIP_START` | Set to `true` to enable the service without starting it. | `false` |
| `INSTALL_JUICE_FORCE_RESTART` | Set to `true` to restart the service even when installed files are unchanged. | `false` |
| `INSTALL_JUICE_SYSTEMD_DIR` | Directory for `systemd` service and environment files. | `/etc/systemd/system` |

Environment variables that begin with `JUICE_` are preserved for the generated service.

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
