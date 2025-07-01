---
title: 'Multiple GPUs'
position: 9
---

# Multiple GPUs

Juice supports multiple GPUs on a single host.

For CUDA workloads all visible GPUs will be available automatically to the CUDA runtime. These can be used either multi-threaded, or assigned to a single process

To use a specific GPU for example in PyTorch this can be done by using the device context, for example

~~~py
with torch.cuda.device(<device>):
  # some tensor stuff here
~~~

# NCCL

NCCL is supported currently on Linux, including in PyTorch and Tensorflow. Simply select the NCCL backend when running the specific CUDA workload. All available transports except multi-node connections are currently supported.

# Filtering

Juice supports a number of different ways to filter GPU devices on both the server and client.

# Server

Running the Juice Server with `CUDA_VISIBLE_DEVICES` environment variable set will filter available GPUs exposed to clients. A client will always get a subset of these devices. Re-ordering of devices can also be done to present a more powerful device as the default device, i.e `CUDA_VISIBLE_DEVICES=1,0`, devices can also be referenced by their device UUID, see https://docs.nvidia.com/cuda/cuda-c-programming-guide/index.html#env-vars for more information

# Client

A client can select a subset of the available GPUs a server presents by again using the `CUDA_VISIBLE_DEVICES` environment variable, these however must be device ordinals, for example `0,1,2,3`. Re-ordering of devices is also supported. Note that devices will always be a subset of those those visible on the server.

`CUDA_VISIBLE_DEVICES=0,1 python <some pytorch script>`

Forcing a client to use specific GPUs identified by their PCI bus ID is supported in the `juice.cfg`, see https://github.com/Juice-Labs/Juice-Labs/wiki/Juice-Configuration#connection, for example:
 
~~~json
{
  "pcibus": [
    "2D:00.0",
    "2E:00.0"   
  ]
}
~~~
