---
title:   'CUDA Compatibility'
sidebar_position: 11
---
# CUDA Compatibility

Juice supports remote access to GPUs using the CUDA API via PyTorch 2.4.0 and TensorFlow 2.17.0 on Windows 10, Windows 11, and Ubuntu 22, including from Windows Subsystem for Linux (WSL).

#### Juice does not currently support a subset of CUDA APIs: 

- Tensor Map Objects
- Multicast Objects
- Green Contexts
- Coredump
- Profiler Control
- Memory Arrays
- External Semaphores

Generally CUDA APIs that aren’t used directly by PyTorch, TensorFlow, or other supported applications have less testing and are more likely to have problems.

#### Juice does not currently support graphics OS-interoperability involving the following APIs: 

- [Textures](https://docs.nvidia.com/cuda/cuda-driver-api/group__CUDA__TEXOBJECT.html)
- [Surfaces](https://docs.nvidia.com/cuda/cuda-driver-api/group__CUDA__SURFOBJECT.html#group__CUDA__SURFOBJECT)
- [Direct3D 9](https://docs.nvidia.com/cuda/cuda-driver-api/group__CUDA__D3D9.html#group__CUDA__D3D9)
- [Direct3D 10](https://docs.nvidia.com/cuda/cuda-driver-api/group__CUDA__D3D10.html#group__CUDA__D3D10)
- [Direct3D 11 Interop.](https://docs.nvidia.com/cuda/cuda-driver-api/group__CUDA__D3D11.html#group__CUDA__D3D11)
- [OpenGL Interop.](https://docs.nvidia.com/cuda/cuda-driver-api/group__CUDA__GL.html#group__CUDA__GL)
- [VPDAU Interop.](https://docs.nvidia.com/cuda/cuda-driver-api/group__CUDA__VDPAU.html#group__CUDA__VDPAU)
- [EGL Interop.](https://docs.nvidia.com/cuda/cuda-driver-api/group__CUDA__EGL.html#group__CUDA__EGL) 

:::warning
Juice does not currently support the CUDA Profiling Tools Interface (CUPTI).
:::

### The NVIDIA Collective Communications Library (NCCL)

The [NVIDIA Collective Communications Library (NCCL)](https://developer.nvidia.com/nccl) is only supported on Linux. This means that Juice only supports the use of NCCL when the client and agent are both running on Linux.  

:::note
NCCL, and applications that use it, will fail when connecting to a GPU hosted on Windows. Either connect to a GPU hosted on Linux or disable the use of NCCL in the application to avoid this problem.
:::

Within the features that Juice supports there are some differences that arise because Juice operates over a network: 

- Unified memory is not supported, and kernels are unable to access host memory. The host and GPU are in separate machines, so the GPU has no direct access to this memory. Host and managed memory cannot be passed to kernels directly and must be first copied to device memory for GPU access.  Managed memory is emulated as host memory only and is inaccessible by the GPU directly. 

- Synchronization is subtly different. Juice interprets synchronization calls (i.e. **cuCtxSynchronize()**, **cuStreamSynchronize()**, and **cuEventSynchronize()**) as synchronization with changes that are visible to the host only. The app only synchronizes with copies to the host and kernel launches, which can cause problems if you plan to synchronize copies to the device.  There is generally no need to synchronize with copies to ensure that host memory used for staging data to the GPU can be reused, because Juice ensures that the memory involved in a to-device copy has been copied out before returning to the application, even in asynchronous calls.  Synchronization with kernel launches can be disabled by setting API Conformance to “Relaxed” or passing the `--relaxed-api` flag on the command line. This change provides a slight performance boost at the cost of asynchronous kernel launches. 
