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

    ```bash
    tar -xf [juice_linux_release].tar 
    ```

   ...replacing `juice_linux_release` with the filename of the downloaded archive.

### Linux Installer Script

Use the Linux installer when you want to install the CLI binaries and, optionally, register a persistent GPU agent service. The installer requires an M2M token and can be configured with environment variables.

Install the CLI only:

```bash
curl -fsSL https://get.juicelabs.co | \
  INSTALL_JUICE_TOKEN='m2m_your_token' \
  sh -
```

Install the CLI and start an agent service for a pool:

```bash
curl -fsSL https://get.juicelabs.co | \
  INSTALL_JUICE_TOKEN='m2m_your_token' \
  INSTALL_JUICE_POOL='Rendering Pool' \
  sh -s - --cache-size=16
```

Key options:

- `INSTALL_JUICE_TOKEN` is required and must contain a Juice M2M token.
- `INSTALL_JUICE_POOL` can be a pool name or pool ID. If it is omitted, the installer installs the binaries but does not install or start the agent service.
- Quote `INSTALL_JUICE_POOL` values that contain spaces, as shown above.
- Arguments after `sh -s -` are appended to the service command. Use this for agent options such as `--cache-size` or temporary troubleshooting flags such as `--log-level trace`.
- `INSTALL_JUICE_CONTROLLER` sets a custom controller host when you are not using the default Juice controller.

By default, the Linux service runs as the `juice` system user, stores service data under `/var/lib/juice`, and writes the service log to `/var/lib/juice/logs/agent_service.log`.

## (Optional) Adding juice to PATH 

#### To enable your system to run `juice` from any directory: 

1. Open your shell's configuration file in a text editor:

    ```bash
    nano ~/.bashrc
    ```

2. Add the following at the end of the file:

    ```bash
    export PATH=$PATH:/path/to/juice_directory
    ```

...replacing `/path/to/juice_directory` with the actual path to the directory containing the Juice executable. 

3. Save and exit the editor. 
    :::tip
    In nano, you can save and exit by pressing Ctrl+X, then Y, then Enter. 
    :::

4. Apply the changes to your current session: 

    ```bash
    source ~/.bashrc 
    ```
