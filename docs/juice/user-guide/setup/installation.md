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

Choose the installation path that matches how you want to use Juice on the Linux machine:

- **Manual install**: unpack the Linux release when you only need the `juice` binary and will manage it yourself.
- **Automated installer**: install the binary and, when a pool is supplied, create a persistent GPU Agent service managed by systemd or OpenRC.

#### Manual install

1. Click the download link for the Linux release.

    :::note
    Depending on your Linux configuration, you may need to download the file on a different system and transfer it to the Linux system where you intend to run Juice. 
    :::
 
2. Unzip the downloaded file: 

    ```powershell
    tar -xf [juice_linux_release].tar 
    ```

   ...replacing `juice_linux_release` with the filename of the downloaded archive.

#### Automated installer for a Linux agent

Use the automated installer when you want the Linux machine to share its GPUs as a Juice Agent. The installer downloads the selected Juice release, installs the binary, creates an uninstall script, and creates a service when `INSTALL_JUICE_POOL` is set.

Before running the installer:

- Create a Machine-to-Machine token:

    ```bash
    juice m2m create --description "linux agent installer"
    ```

- Choose the pool for this agent:

    ```bash
    juice pool list
    ```

- Confirm the host meets the [Linux agent requirements](./systerm-reqs.md), including systemd or OpenRC, `curl` or `wget`, glibc 2.27 or newer, and the required client and GPU-agent libraries.

Download and run the installer:

```bash
curl -fsSL https://get.juicelabs.co -o install-juice.sh
INSTALL_JUICE_TOKEN=m2m_XXX INSTALL_JUICE_POOL='GPU Lab Pool' sh ./install-juice.sh
```

`INSTALL_JUICE_POOL` accepts either a pool ID or pool name. Quote the value when the pool name contains spaces, as shown above.

To install only the Linux client/CLI binary, omit `INSTALL_JUICE_POOL`:

```bash
INSTALL_JUICE_TOKEN=m2m_XXX sh ./install-juice.sh
```

When no pool is supplied, the installer does not create, enable, or start an agent service.

##### Installer options

| Option | Purpose |
| --- | --- |
| `INSTALL_JUICE_TOKEN` | Required M2M token used to validate access and download the release. |
| `INSTALL_JUICE_POOL` | Pool ID or pool name for the agent service. If omitted, no service is installed. |
| `INSTALL_JUICE_CONTROLLER` | Custom Juice controller host. Defaults to the standard Juice controller. |
| `INSTALL_JUICE_VERSION` | Specific Juice version to install. Defaults to the latest stable release available to the token. |
| `INSTALL_JUICE_USER` | System user for the service. Defaults to `juice`. |
| `INSTALL_JUICE_NAME` | systemd/OpenRC service name. Defaults to `juice`. |
| `INSTALL_JUICE_SKIP_ENABLE` | Set to `true` to create the service files without enabling or starting the service. |
| `INSTALL_JUICE_SKIP_START` | Set to `true` to enable the service without starting it immediately. |
| `INSTALL_JUICE_FORCE_RESTART` | Set to `true` to restart the service even when the installed binary and service files have not changed. |

Pass additional `juice agent run` service flags after the script name. For example, to set a cache size or temporarily increase service logging:

```bash
INSTALL_JUICE_TOKEN=m2m_XXX INSTALL_JUICE_POOL='GPU Lab Pool' sh ./install-juice.sh --cache-size=128 --log-level trace
```

##### Troubleshooting installer failures

- `INSTALL_JUICE_TOKEN is not set` or `Token check failed`: verify the M2M token, network access to the controller, and `INSTALL_JUICE_CONTROLLER` if you use a custom controller.
- `missing library libnuma` or `missing library libatomic`: install the Linux client prerequisites from [System Requirements](./systerm-reqs.md). These are required even when no agent service is installed.
- `missing library libvulkan`, `libgl`, or `libnvidia-encode`: install the Linux agent prerequisites before setting `INSTALL_JUICE_POOL`. These libraries are required for GPU hosting.
- `Can not find systemd or openrc`: the automated service install requires one of those process supervisors.

To uninstall the default installation, run:

```bash
sudo /usr/local/juice/uninstall.sh
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
