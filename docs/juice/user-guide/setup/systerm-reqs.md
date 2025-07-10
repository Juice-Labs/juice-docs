---
title:   'System Requirements'
sidebar_position: 1
---
# System Requirements


### Windows

Both the **Client** and **GPU Agent** are supported on Windows 10 and Windows 11. 


### Linux

The client and GPU agent are supported on Debian-based distributions (version 11 and greater, like Ubuntu 20.04) and Red Hat Enterprise Linux (RHEL) 9-based distributions, such as AlmaLinux 9 or greater. Other distributions with similar or newer release dates are also likely supported.

:::note
Currently, only the client is supported when running in WSL on Windows.
:::


:::note
Graphical apps are currently only supported on Windows clients. Both Linux and Windows agents support graphics.
:::


## Client Prerequisites for Running Applications

### Windows 

- Windows 10 or Windows 11 

If you're running on a virtual machine with graphics drivers that don't support Vulkan, you must install the [Vulkan Runtime](https://vulkan.lunarg.com/sdk/home#windows) separately. Make sure to download the "Runtime" not the SDK (e.g. `VulkanRT-<version>-Installer.exe`).

### Linux 

#### Ubuntu 20.04 or greater, Debian 11 or greater. 
- The following packages must be installed: 

    - libatomic1 

    - libnuma1 

    :::tip
    These packages can be installed by running the command: 
        
        ```powershell
        sudo apt update && sudo apt install libatomic1 libnuma1
        ```
    :::
#### AlmaLinux 9 or greater, (RHEL)-based. 
- The following packages must be installed: 

  - libatomic
  
  - numactl-libs

    :::tip
    These packages can be installed by running the command: 
        
        ```powershell
        sudo dnf update && sudo dnf install libatomic numactl-libs
        ```
    :::

## Agent Device Prerequisites for GPU Hosting

On all platforms an NVIDIA GPU with an installed driver version 535 or greater, and a CUDA driver version 12.2 through to 12.9. 

### Windows 

- Windows 10 or 11 

### Linux 

#### Ubuntu 20.04 or greater, Debian 11 or greater. 
- The following packages must be installed: 

    - libatomic1 

    - libnuma1 

    - libvulkan1 

    - libgl1 

    - libglib2.0-0 


    :::tip
    These packages can be installed by running the command: 
        
        ```powershell
        sudo apt update && sudo apt install libvulkan1 libgl1 libglib2.0-0 libatomic1 libnuma1
        ```
    :::

#### AlmaLinux 9 or greater, (RHEL)-based. 
- The following packages must be installed: 

  - libatomic
  
  - numactl-libs
  
  - vulkan-loader
  
  - mesa-libGL
  
  - glib2

    :::tip
    These packages can be installed by running the command: 
        
        ```powershell
        sudo dnf update && sudo dnf install vulkan-loader mesa-libGL glib2 libatomic numactl-libs
        ```
    :::

 