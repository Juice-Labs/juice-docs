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
For Linux, you can install Juice in two ways depending on whether you want a managed background agent service or just the CLI binary.

#### Option A: One-step installer (recommended for servers)

Use the installer script from `https://get.juicelabs.co` to install Juice and register the agent service.

```bash
curl https://get.juicelabs.co | \
INSTALL_JUICE_TOKEN=<m2m_token> \
INSTALL_JUICE_POOL=<pool_id> \
sh -
```

If you only want to install the binary (without creating/enabling a service), omit `INSTALL_JUICE_POOL`:

```bash
curl https://get.juicelabs.co | \
INSTALL_JUICE_TOKEN=<m2m_token> \
sh -
```

Installer options you will commonly need:

| Variable | Required | What it does |
| --- | --- | --- |
| `INSTALL_JUICE_TOKEN` | Yes | M2M token used to authenticate download and setup. |
| `INSTALL_JUICE_POOL` | No | Pool to bind the agent service to during install. If omitted, service setup is skipped. |
| `INSTALL_JUICE_CONTROLLER` | No | Custom controller hostname. Defaults to `electra.juicelabs.co`. |
| `INSTALL_JUICE_VERSION` | No | Installs a specific Juice release instead of latest. |

You can also pass runtime agent flags directly to the installer, for example:

```bash
curl https://get.juicelabs.co | \
INSTALL_JUICE_TOKEN=<m2m_token> \
INSTALL_JUICE_POOL=<pool_id> \
sh - --cache-size 128
```

#### Option B: Manual archive install
1. Click the download link for the Linux release.

:::note
Depending on your Linux configuration, you may need to download the file on a different system and transfer it to the Linux system where you intend to run Juice.
:::

2. Unzip the downloaded file:

```powershell
tar -xf [juice_linux_release].tar
```

...replacing `juice_linux_release` with the filename of the downloaded archive.

## Linux Installer Troubleshooting

| Symptom | Meaning | Recommended action |
| --- | --- | --- |
| `Token check failed` | Token is invalid/expired, or controller is incorrect. | Regenerate M2M token and verify `INSTALL_JUICE_CONTROLLER` if using a non-default controller. |
| `glibc version must be at least 2.27` | Host glibc is too old for the installer requirements. | Upgrade host OS/runtime or use a supported distro version. |
| `missing library libnuma` or `missing library libatomic` | Required client dependencies are missing. | Install the missing package(s) from your distro repositories and rerun installer. |
| `missing library libvulkan`, `libgl`, or `libnvidia-encode` | Agent dependencies are missing. Fatal when `INSTALL_JUICE_POOL` is set; warning otherwise. | Install GPU/graphics runtime dependencies before enabling agent service. |
| `Could not install service` | Service registration step failed (`juice agent service install`). | Validate pool ID/name, token scope, and that the host supports `systemd` or `openrc`. |

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
