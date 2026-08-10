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

- **Manual archive install**: unpack the Linux release when you only need the `juice` binary and will manage it yourself.
- **Automated installer**: install the binary and, when a pool is supplied, create a persistent GPU Agent service managed by systemd or OpenRC.

The automated installer supports `amd64`/`x86_64` and `arm64` hosts.

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

#### Automated installer for a Linux agent

Use the automated installer when you want the Linux machine to share its GPUs as a Juice Agent. The installer downloads the selected Juice release, installs the binary, creates an uninstall script, and creates a service when `INSTALL_JUICE_POOL` is set.

Before running the installer:

- Create a Machine-to-Machine token (see [M2M Tokens](../cli-app/m2m-tokens.md)):

    ```bash
    juice m2m create --description "linux agent installer"
    ```

- Choose the pool for this agent:

    ```bash
    juice pool list
    ```

- Confirm the host meets the [Linux agent requirements](./systerm-reqs.md), including systemd or OpenRC, `curl` or `wget`, glibc 2.27 or newer, and the required client and GPU-agent libraries.

One-step install:

```bash
curl https://get.juicelabs.co | \
  INSTALL_JUICE_TOKEN=m2m_XXX \
  INSTALL_JUICE_POOL="GPU Lab Pool" \
  sh -
```

`INSTALL_JUICE_POOL` accepts either a pool ID or pool name. Quote the value when the pool name contains spaces.

To install only the Linux client/CLI binary, omit `INSTALL_JUICE_POOL`:

```bash
curl https://get.juicelabs.co | INSTALL_JUICE_TOKEN=m2m_XXX sh -
```

When no pool is supplied, the installer does not create, enable, or start an agent service.

Pass additional `juice agent run` service flags after `sh -s -`. For example:

```bash
curl https://get.juicelabs.co | \
  INSTALL_JUICE_TOKEN=m2m_XXX \
  INSTALL_JUICE_POOL="GPU Lab Pool" \
  sh -s - --cache-size 128
```

##### Installer options

| Option | Required | Purpose |
| --- | --- | --- |
| `INSTALL_JUICE_TOKEN` | Yes | M2M token used to validate access and download the release. |
| `INSTALL_JUICE_POOL` | No | Pool ID or pool name for the agent service. If omitted, no service is installed. |
| `INSTALL_JUICE_CONTROLLER` | No | Custom Juice controller host. Defaults to `electra.juicelabs.co`. |
| `INSTALL_JUICE_VERSION` | No | Specific Juice version to install. Defaults to the latest stable release available to the token. |
| `INSTALL_JUICE_USER` | No | System user for the service. Defaults to `juice`. |
| `INSTALL_JUICE_SKIP_ENABLE` | No | Set to `true` to skip enabling and starting the service. |
| `INSTALL_JUICE_SKIP_START` | No | Set to `true` to enable the service without starting it immediately. |
| `INSTALL_JUICE_FORCE_RESTART` | No | Set to `true` to restart the service even when the installed binary and service files have not changed. |
| `INSTALL_JUICE_SYMLINK` | No | `skip` avoids creating `/usr/local/bin/juice`; `force` overwrites an existing symlink. |

##### Troubleshooting installer failures

- `INSTALL_JUICE_TOKEN is not set` or `Token check failed`: verify the M2M token, network access to the controller, and `INSTALL_JUICE_CONTROLLER` if you use a custom controller.
- `Unsupported architecture`: the installer currently supports `amd64`/`x86_64` and `arm64` only.
- `missing library libnuma` or `missing library libatomic`: install the Linux client prerequisites from [System Requirements](./systerm-reqs.md). These are required even when no agent service is installed.
- `missing library libvulkan`, `libgl`, or `libnvidia-encode`: install the Linux agent prerequisites before setting `INSTALL_JUICE_POOL`. These libraries are fatal when installing the agent service, and warnings for client-only installs.
- `Can not find systemd or openrc`: the automated service install requires one of those process supervisors.
- `Could not install service`: confirm the token can access the selected pool and that the pool value is quoted correctly when it contains spaces.

To uninstall a default installation, run:

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
