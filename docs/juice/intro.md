---
sidebar_label: 'Welcome to Juice'
sidebar_position: 1
---

import Link from '@docusaurus/Link';

# Welcome to Juice

## What is Juice?

Juice is GPU-over-IP: deployable GPUaaS software that allows GPUs to be pooled, shared, and used remotely over a standard TCP/IP network.

No modifications are necessary to application software - client applications are unaware that the physical GPU is remote. Juice software runs on physical machines, VMs, and containers on both Linux and Windows. The only hard requirements are physical GPUs to serve capacity into pools, and standard network connectivity.

 ![Juice Components](/img/juice/JuiceComponents.png)

Juice is simple to use - it consists of:

- Installable **Client** and **Agent**: software you install on your systems that contains both the **Agent** (for making physical GPUs on that system available remotely in a shared pool) and the **Client** (for running GPU-hungry applications on that system using remote GPU from a shared pool) - this install allows you to run command line (CLI) Juice, and to run the Windows Desktop app.
- a Juice-hosted **Controller** that governs sharing, pools, and connections among Clients and Agents (we manage the Controller; you don't need to worry about that part)
- a browser-based **Admin interface** to the Controller so you can manage users, pools, etc. for your Org (and Org could be a team or company; it's how we license Juice to you and organize users, pools, and sharing)
- a Windows Desktop app for running applications and sharing GPUs
- a reporting interface that gives admins visibility to utilization and activity within their Org

Today Juice works with:

- NVIDIA GPUs
- Windows and Linux
- CUDA-based AI workloads, e.g. those running on top of PyTorch or TensorFlow frameworks
- Many graphics applications*
- Physical, virtual, or container-based systems
 
*_Graphics applications are not supported on Linux clients yet, but Linux systems can act as agents to provide GPUs for any workload including graphics._

Once Juice is installed, launching an application to use remote GPU is as simple as using the Windows Desktop app, or running it through our command line tool `juice`. For example:

Run PyTorch-based inference with `juice run python pytorch/resnet.py`

## Why Juice?

GPU use is hampered by a major limitation: a GPU-hungry application can only run in the same physical machine as the GPU itself.  This limitation causes local-resourcing problems -- there's either not enough (or none, depending on the size and power needs of the device), or GPU capacity sits idle and wasted (global utilization of GPU capacity is estimated at 15%).

By abstracting application hosts from physical GPUs, Juice decouples GPU-consuming clients from GPU-providing servers.  Benefits include (but are not limited to):

1. Any client workload can access GPU from anywhere, creating new capabilities
1. GPU capacity is pooled and shared across any deployment area, from local to regional/intercloud -- GPU hardware scales independently of other computing resources
1. GPU utilization is driven higher, and stranded capacity is rescued, by dynamically adding multiple clients to the same GPU based on resource needs and availability -- i.e. more workloads are served with the same GPU hardware

