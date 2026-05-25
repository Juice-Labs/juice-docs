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

### Automated Linux install

For Linux hosts that will run the Juice agent as a service, use the installer script with an M2M token and the pool name or ID where the agent should register:

```bash
curl https://get.juicelabs.co | \
INSTALL_JUICE_TOKEN=<m2m_token> \
INSTALL_JUICE_POOL="<pool name or id>" \
sh -
```

The installer downloads and verifies the Linux release, installs the `juice` binary, and creates a system service when `INSTALL_JUICE_POOL` is set. Pool names with spaces are supported when quoted, as shown above.

If you only need the client binary, omit `INSTALL_JUICE_POOL`:

```bash
curl https://get.juicelabs.co | \
INSTALL_JUICE_TOKEN=<m2m_token> \
sh -
```

When no pool is provided, the installer skips service creation. It still checks client dependencies and warns if agent-only libraries are missing.

Common installer options:

| Option | Use |
| --- | --- |
| `INSTALL_JUICE_CONTROLLER=<host>` | Use a custom Juice controller instead of the default controller. |
| `INSTALL_JUICE_VERSION=<version>` | Install a specific Juice version. |
| `INSTALL_JUICE_USER=<user>` | Run the service as a specific local user instead of `juice`. |
| `INSTALL_JUICE_SKIP_START=true` | Create and enable the service without starting it immediately. |
| `INSTALL_JUICE_EXEC="<agent flags>"` | Add flags to the generated agent service command. |

You can also pass agent flags after `sh -s -`. For example, this creates a service with a 16 GB cache:

```bash
curl https://get.juicelabs.co | \
INSTALL_JUICE_TOKEN=<m2m_token> \
INSTALL_JUICE_POOL="<pool name or id>" \
sh -s - --cache-size=16
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
