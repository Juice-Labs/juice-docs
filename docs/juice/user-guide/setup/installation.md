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

#### One-step agent installer

On Linux hosts that should share GPUs, the supported install path is the one-step installer from [get.juicelabs.co](https://get.juicelabs.co) (source: [`Juice-Labs/juice-oss` installer](https://github.com/Juice-Labs/juice-oss/tree/main/installer)). It downloads the matching `amd64` or `arm64` archive from `/v3/download/linux/${ARCH}/...`, verifies the SHA-256, and can install a systemd or OpenRC service.

```powershell
curl https://get.juicelabs.co | INSTALL_JUICE_TOKEN=m2m_XXX INSTALL_JUICE_POOL="lab" sh -
```

Quote pool names that contain spaces. `INSTALL_JUICE_TOKEN` is required (an M2M token; see [M2M Tokens](../cli-app/m2m-tokens.md)). The installer checks the token against `https://<controller>/v1/status` before downloading.

`INSTALL_JUICE_POOL` is optional in the script. When it is set, the installer creates a system user (default `juice`), writes a service unit, and starts the agent into that pool. When it is omitted, binaries are still installed but the agent service is skipped (client-only).

Pass extra agent flags either as script arguments or with `INSTALL_JUICE_EXEC`:

```powershell
curl https://get.juicelabs.co | INSTALL_JUICE_TOKEN=m2m_XXX INSTALL_JUICE_POOL="lab" sh -s - --cache-size=16
```

| Variable | Read by the script? | Notes |
| --- | --- | --- |
| `INSTALL_JUICE_TOKEN` | Yes (required) | M2M token used to authenticate and download |
| `INSTALL_JUICE_POOL` | Yes (optional) | Pool name or id. Omit to skip service install |
| `INSTALL_JUICE_CONTROLLER` | Yes | Custom controller host. Default `electra.juicelabs.co` |
| `INSTALL_JUICE_VERSION` | Yes | Pin a release. Default is `/v1/build/latest` |
| `INSTALL_JUICE_USER` | Yes | Service user. Default `juice` |
| `INSTALL_JUICE_SYSTEMD_DIR` | Yes | systemd unit directory. Default `/etc/systemd/system` |
| `INSTALL_JUICE_SKIP_ENABLE` / `INSTALL_JUICE_SKIP_START` | Yes | Skip enable and/or start |
| `INSTALL_JUICE_FORCE_RESTART` | Yes | Restart even when hashes are unchanged |
| `INSTALL_JUICE_SYMLINK` | Yes | `skip`, `force`, or default (symlink `/usr/local/bin/juice` if missing) |
| `INSTALL_JUICE_EXEC` | Yes | Extra `juice agent run` flags for the service |
| `INSTALL_JUICE_NAME` | **No** | Header mentions it; `SYSTEM_NAME` is hardcoded to `juice` |
| `INSTALL_JUICE_INSTALL_DIR` | **No (broken)** | After the if/else, the script always assigns `INSTALL_DIR=${INSTALL_ROOT}/juice`. If you set this variable, `INSTALL_ROOT` is unset and the install path becomes `/juice` |

The header comment about preserving `JUICE_*` environment variables for systemd is also unimplemented. Set extra flags with `INSTALL_JUICE_EXEC` or script arguments instead.

**Service layout**

- systemd: unit `juice.service` in `INSTALL_JUICE_SYSTEMD_DIR` (default `/etc/systemd/system`). The unit runs `juice agent run --service ... --log-file stdout --stderr stdout --stdout /var/lib/juice/logs/agent_service.log`. Type is `simple`, `Restart=always`, `RestartSec=5s`.
- OpenRC (when `/sbin/openrc-run` exists and systemd does not): unit `/etc/init.d/juice`, env file `/etc/juice/juice.env`, logs `/var/log/juice.log` with a `logrotate` snippet at `/etc/logrotate.d/juice`.
- Data directory: `/var/lib/juice` (config, cache, uninstall state, systemd agent logs).
- Uninstall: `/usr/local/juice/uninstall.sh` (or `/opt/juice/uninstall.sh` if `/usr/local` is not writable). The uninstall script also removes `/tmp/juice-agent.lock`.

The installer requires **glibc 2.27+**, `curl` or `wget`, and either systemd or OpenRC. Architecture must be `x86_64`/`amd64` or `arm64`. See [System Requirements](./systerm-reqs.md) for libraries.

#### Manual archive install

1. Click the download link for the Linux release.

    :::note
    Depending on your Linux configuration, you may need to download the file on a different system and transfer it to the Linux system where you intend to run Juice.
    :::

2. Unzip the downloaded file:

    ```powershell
    tar -xf [juice_linux_release].tar
    ```

   ...replacing `juice_linux_release` with the filename of the downloaded archive.

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
