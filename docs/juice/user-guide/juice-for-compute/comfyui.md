---
title:  'ComfyUI'
sidebar_position: 2
---

# ComfyUI

Download and install [ComfyUI](https://www.comfy.org/) on Windows.

For real-time updates on verified features and version compatibility, refer to the [Juice Application Matrix](../../../app-matrix.md).

## Supported PyTorch Versions

To ensure compatibility with Juice, you must use specific PyTorch builds.

* **Supported CUDA Versions:** `cu128`, `cu126`.
* **Unsupported Versions:** `13`, `13.1`, `13.2`. 

### Installing the Correct PyTorch Build

If you are using a manual or Conda-based installation, run the following command to install the supported `cu128` release build:

~~~powershell
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu128
~~~

## Running ComfyUI with Juice

When using a **Portable Installation**, it is a critical requirement to navigate into the internal `ComfyUI` folder before executing the run command. This ensures all relative paths for models and custom nodes are resolved correctly.

### Portable Installation Execution
~~~powershell
cd C:\Path\To\Your\ComfyUI_windows_portable\ComfyUI
juice run python.exe main.py --disable-cuda-malloc 
~~~

:::tip
The `--disable-cuda-malloc` argument is specified for optimal performance with Juice.  ComfyUI will still run through Juice without this argument but responses will take longer to generate.
:::

### Desktop Application Execution
Run ComfyUI with Juice on Windows using the default application path:

~~~powershell
juice run "%USERPROFILE%\AppData\Local\Programs\@comfyorgcomfyui-electron\ComfyUI.exe" --disable-cuda-malloc
~~~


Replace `%USERPROFILE%` with the path to your user directory on Windows, e.g. `C:\Windows\joeb`, if you prefer.

:::tip RTX 5080 Stability
For 16GB VRAM cards, adding `--lowvram`,  `--reserve-vram 2.0` and `--use-pytorch-cross-attention` to your run command is highly recommended to prevent Out of Memory (OOM) errors during video generation.
:::



## Active Paths

Activate the ComfyUI directory to run it through Juice automatically when a Juice session is created:

~~~powershell
juice session add-path %USERPROFILE%\AppData\Local\Programs\@comfyorgcomfyui-electron
~~~

Replace `%USERPROFILE%` with the path to your user directory on Windows, e.g. `C:\Users\joeb`, if you prefer.
