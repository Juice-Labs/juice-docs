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
Use the Linux installer when you want Juice to download the correct release, verify it, install the CLI, and optionally configure a long-running agent service.

The installer requires an M2M token. See [M2M Tokens](../cli-app/m2m-tokens.md) for token creation and rotation guidance.

#### Client-only install

Omit `INSTALL_JUICE_POOL` to install the Juice binaries without creating an agent service. This is useful on client machines that only need to run workloads on remote GPUs.

```bash
curl https://get.juicelabs.co | \
  INSTALL_JUICE_TOKEN=m2m_xxx \
  sh -
```

#### Agent service install

Set `INSTALL_JUICE_POOL` to install and start a persistent agent service for a pool. The value can be a pool name or pool ID. Quote pool names that contain spaces.

```bash
curl https://get.juicelabs.co | \
  INSTALL_JUICE_TOKEN=m2m_xxx \
  INSTALL_JUICE_POOL="render pool" \
  sh -s - --cache-size=16
```

The installer configures a `juice` service user by default, writes service data under `/var/lib/juice`, and starts the service with systemd or OpenRC when a pool is provided. Additional arguments after `sh -s -` are passed to `juice agent run` for the service.

#### Installer options

| Variable | Required | Purpose |
| --- | --- | --- |
| `INSTALL_JUICE_TOKEN` | Yes | M2M token used to authenticate and download the release. |
| `INSTALL_JUICE_POOL` | No | Pool name or ID for the agent service. If omitted, only the CLI is installed. |
| `INSTALL_JUICE_CONTROLLER` | No | Custom controller host. Defaults to `electra.juicelabs.co`. |
| `INSTALL_JUICE_VERSION` | No | Release to install. If omitted, the installer uses the stable latest release. |
| `INSTALL_JUICE_USER` | No | Service user for the agent. Defaults to `juice`. |
| `INSTALL_JUICE_EXEC` | No | Additional `juice agent run` flags for the service, equivalent to passing script arguments after `sh -s -`. |
| `INSTALL_JUICE_FORCE_RESTART` | No | Set to `true` to restart the service even when the installed files did not change. |
| `INSTALL_JUICE_SKIP_ENABLE` | No | Set to `true` to avoid enabling or starting the service. |
| `INSTALL_JUICE_SKIP_START` | No | Set to `true` to enable the service without starting it. |
| `INSTALL_JUICE_SYMLINK` | No | Use `skip` to avoid creating `/usr/local/bin/juice`, or `force` to overwrite an existing symlink. |

You can also download the Linux release manually from [app.juicelabs.co](https://app.juicelabs.co), transfer it to the target system if needed, and extract it with:

```bash
tar -xf [juice_linux_release].tar
```

Replace `juice_linux_release` with the filename of the downloaded archive.

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
