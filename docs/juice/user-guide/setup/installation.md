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

Choose the path that matches how you want to use Juice:

- **Manual archive install**: unpack the Linux release when you only need the `juice` binary.
- **Automated installer**: install the binary and, when a pool is supplied, create a persistent GPU Agent service (systemd or OpenRC).

The automated installer supports `amd64`/`x86_64` and `arm64`. Other architectures fail with `Unsupported architecture`.

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

#### Automated Linux installer

The one-step installer is served from `https://get.juicelabs.co` ([source](https://github.com/Juice-Labs/juice-oss/blob/main/installer/install-juice.sh)). It always requires an M2M token. The pool is optional: omit it to install the client binary only.

Install the agent as a service:

```bash
curl https://get.juicelabs.co | \
  INSTALL_JUICE_TOKEN=m2m_XXX \
  INSTALL_JUICE_POOL="GPU Lab Pool" \
  sh -
```

Quote pool names that contain spaces. The installer passes that value through to `juice agent service install`.

Client-only install (no systemd/OpenRC unit):

```bash
curl https://get.juicelabs.co | INSTALL_JUICE_TOKEN=m2m_XXX sh -
```

Pass extra `juice agent run` flags after `sh -s -`, or set `INSTALL_JUICE_EXEC`. These are equivalent:

```bash
curl https://get.juicelabs.co | \
  INSTALL_JUICE_TOKEN=m2m_XXX \
  INSTALL_JUICE_POOL="GPU Lab Pool" \
  sh -s - --cache-size 128

curl https://get.juicelabs.co | \
  INSTALL_JUICE_TOKEN=m2m_XXX \
  INSTALL_JUICE_POOL="GPU Lab Pool" \
  INSTALL_JUICE_EXEC="--cache-size=16" \
  sh -s -
```

##### Installer options

Only document options the script actually reads:

| Option | Required | Purpose |
| --- | --- | --- |
| `INSTALL_JUICE_TOKEN` | Yes | M2M token used to call `/v1/status` and download the release. |
| `INSTALL_JUICE_POOL` | No | Pool ID or name for the agent service. If omitted, no service is installed. |
| `INSTALL_JUICE_CONTROLLER` | No | Custom controller host. Defaults to `electra.juicelabs.co`. |
| `INSTALL_JUICE_VERSION` | No | Specific Juice version. Defaults to the latest release available to the token. |
| `INSTALL_JUICE_USER` | No | System user for the service. Defaults to `juice`. Created if missing. |
| `INSTALL_JUICE_EXEC` | No | Extra `juice agent run` flags. Arguments after `sh -s -` are appended. |
| `INSTALL_JUICE_SKIP_ENABLE` | No | `true` skips enabling and starting the service. |
| `INSTALL_JUICE_SKIP_START` | No | `true` enables the service without starting it. |
| `INSTALL_JUICE_FORCE_RESTART` | No | `true` restarts even when binary and service files are unchanged. |
| `INSTALL_JUICE_SYMLINK` | No | `skip` avoids `/usr/local/bin/juice`; `force` overwrites an existing symlink. |
| `INSTALL_JUICE_SYSTEMD_DIR` | No | Directory for the unit and env files. Defaults to `/etc/systemd/system`. |

The installed service name is `juice`. `ExecStart` is `juice agent run --service ...` with no default `--log-level`.

:::note
`INSTALL_JUICE_NAME` appears in the script header but is unused: `SYSTEM_NAME` is hardcoded to `juice`. `INSTALL_JUICE_INSTALL_DIR` is also unused after setup: the script always assigns `INSTALL_DIR=${INSTALL_ROOT}/juice` (`/usr/local/juice`, or `/opt/juice` if `/usr/local` is not writable).
:::

##### Installer troubleshooting

- `INSTALL_JUICE_TOKEN is not set` or `Token check failed`: check the M2M token, controller reachability, and `INSTALL_JUICE_CONTROLLER`.
- `Unsupported architecture`: only `amd64`/`x86_64` and `arm64` are supported.
- `missing library libnuma` or `libatomic`: install the Linux client packages from [System Requirements](./systerm-reqs.md).
- `missing library libvulkan`, `libgl`, or `libnvidia-encode`: required when `INSTALL_JUICE_POOL` is set. Client-only installs warn instead of failing.
- `Can not find systemd or openrc`: service install needs one of those supervisors.
- `Could not install service`: confirm the token can use the pool, and quote pool names that contain spaces.

Uninstall a default install with:

```bash
sudo /usr/local/juice/uninstall.sh
```

If the installer fell back to `/opt`, use `/opt/juice/uninstall.sh`.

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

...replacing `/path/to/juice_directory` with the actual path to the directory containing the Juice executable. The automated installer creates `/usr/local/bin/juice` unless you set `INSTALL_JUICE_SYMLINK=skip`. 

3. Save and exit the editor. 
    :::tip
    In nano, you can save and exit by pressing Ctrl+X, then Y, then Enter. 
    :::

4. Apply the changes to your current session: 

    ```powershell
    source ~/.bashrc 
    ```
