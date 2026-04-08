---
title:   'Installation'
sidebar_position: 2
---
# Installation

Use this page for both desktop/client installation and Linux agent installation.

Before you begin, make sure you have:
- An account on [app.juicelabs.co](https://app.juicelabs.co)
- Administrator privileges on your system
- At least 500 MB of free disk space

## Desktop App Or CLI Binary Install

Log in to [app.juicelabs.co](https://app.juicelabs.co) and open the Downloads area:

![Download links](/img/juice/download_links.png)

### Windows
1. Download the Windows release.
2. Run the installer and follow the wizard.

### Linux (Manual Archive)
1. Download the Linux release archive.
2. Extract it:

```bash
tar -xf [juice_linux_release].tar
```

Replace `juice_linux_release` with your downloaded filename.

## Linux Agent Installer Script

For bare metal or VM hosts, use the hosted installer script:

```bash
curl https://get.juicelabs.co | INSTALL_JUICE_TOKEN=m2m_xxx INSTALL_JUICE_POOL=<pool-id-or-name> sh -
```

This installs Juice and configures a `juice` service (systemd or openrc) when `INSTALL_JUICE_POOL` is provided.

### Common Installer Examples

Install and configure an agent service:

```bash
curl https://get.juicelabs.co | INSTALL_JUICE_TOKEN=m2m_xxx INSTALL_JUICE_POOL=lab sh -
```

Install client binaries only (no service):

```bash
curl https://get.juicelabs.co | INSTALL_JUICE_TOKEN=m2m_xxx sh -
```

Use a custom controller:

```bash
curl https://get.juicelabs.co | INSTALL_JUICE_TOKEN=m2m_xxx INSTALL_JUICE_POOL=lab INSTALL_JUICE_CONTROLLER=controller.example.com sh -
```

Pass runtime args to the service command:

```bash
curl https://get.juicelabs.co | INSTALL_JUICE_TOKEN=m2m_xxx INSTALL_JUICE_POOL=lab sh - --cache-size=16
```

Equivalent via `INSTALL_JUICE_EXEC`:

```bash
curl https://get.juicelabs.co | INSTALL_JUICE_TOKEN=m2m_xxx INSTALL_JUICE_POOL=lab INSTALL_JUICE_EXEC="--cache-size=16" sh -
```

### Key Installer Environment Variables

| Variable | Required | Description |
| --- | --- | --- |
| `INSTALL_JUICE_TOKEN` | Yes | M2M token used to authenticate and fetch releases. |
| `INSTALL_JUICE_POOL` | No | Pool ID/name for agent service install. If omitted, no service is created. |
| `INSTALL_JUICE_CONTROLLER` | No | Custom controller host. Defaults to `electra.juicelabs.co`. |
| `INSTALL_JUICE_VERSION` | No | Version to install. Defaults to latest available release. |
| `INSTALL_JUICE_EXEC` | No | Extra arguments injected into the service start command. |
| `INSTALL_JUICE_SKIP_ENABLE` | No | If `true`, installer does not enable/start the service. |
| `INSTALL_JUICE_SKIP_START` | No | If `true`, installer enables but does not start the service. |

### Installer Constraints

- `INSTALL_JUICE_TOKEN` is required.
- `INSTALL_JUICE_POOL` is optional.
- If `INSTALL_JUICE_POOL` is not set, the installer does not create/start a service.
- The installer requires either `systemd` or `openrc` to manage a service.
- The service name created by the installer is `juice`.

For Linux dependency requirements and package guidance, see [System Requirements](./systerm-reqs).

## Optional: Add `juice` To PATH

If you installed manually and want `juice` available from any shell directory:

1. Open your shell config (example):

```bash
nano ~/.bashrc
```

2. Add:

```bash
export PATH=$PATH:/path/to/juice_directory
```

3. Reload your shell config:

```bash
source ~/.bashrc
```
