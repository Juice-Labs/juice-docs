---
title: Using Redshift with Juice
sidebar_label: Redshift
sidebar_position: 2
---

## Prerequisites

* **Juice Agent:** The Juice Agent must be installed, configured, and running. This makes the GPU visible to your Juice Client.
* **Juice Client:** The Juice client application must be installed. This is the control center for sending jobs to your remote Agent. 
* **Redshift Installer:** You must have the appropriate Redshift installer executable (`.exe` for Windows) downloaded from your Maxon account.

***

## Installation and Configuration

A critical aspect of Redshift's performance is its use of kernel files specifically compiled for the GPU hardware it runs on. To ensure successful rendering, you must run the Redshift installer on the specific GPU you intend to use for your workload.

This installation only needs to be performed once per unique GPU hardware configuration. If you later connect to an agent with a different type of GPU, you will need to repeat this process for that hardware.


1.  **Connect to Target GPU:** Use the Juice client to establish a connection to the remote agent equipped with the GPUs you will be rendering on.

2.  **Run the Installer via Juice:** Open a command-line terminal or PowerShell and execute the `juice run` command to launch the Redshift installer.

    ```bash
    juice run C:\path\to\your\downloads\redshift_installer_vX.X.XX.exe
    ```
    *Replace `C:\path\to\your\downloads\redshift_installer_vX.X.XX.exe` with the actual path to your downloaded Redshift installer.*

Once the installation is finished, the necessary GPU-specific drivers and plugins will be configured for the remote node, enabling it to process Redshift render jobs correctly.

***

## Submitting a Redshift Render Job

You can submit Redshift jobs to Juice using the `juice run` command, which executes the appropriate command-line renderer for your software (e.g., `hscript` for Houdini).

### Example: Dynamic Houdini Job

This example covers a common scenario where the scene file does not have a Redshift render node saved within it, and one must be created dynamically at render time. It also shows how to set environment variables to prevent common GPU memory errors.

:::note
For these commands to work correctly, they should be executed from the Houdini Command Line Tools terminal provided with your Houdini installation.
:::

```bash
juice run ^
    cmd /c "(echo cd /out& echo opadd Redshift_ROP& echo render -f 1 1 Redshift_ROP1) | hscript C:\path\to\your\scene.hip"

