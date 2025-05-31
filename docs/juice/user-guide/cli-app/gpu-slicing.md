---
title:   'GPU Slicing'
sidebar_position: 7
---
# Slicing a GPU

Sometimes it can be useful to treat a single large GPU as a collection of
smaller GPUs. For example, if you have access to a single GPU with 80 GB of
VRAM, but want to run multiple jobs that will only ever need a few gigabytes of
memory each. In order to accomplish this workload we can use Juice's GPU
slicing functionality.

:::note
GPU slicing is currently only supported for single-GPU compute workloads.
:::

## Cutting a Slice

Slicing a GPU starts by requesting a session on a GPU with a specific amount of VRAM with the `--vram` option:

```powershell
juice session request --vram 4
```

The above command will request a session with 4 GiB of VRAM from the available
resources in your pool. `--vram` expects a number as an argument representing
the amount of VRAM to reserve, expressed in GiBs. This number can be a decimal
number and/or end with an appropriate suffix to allow more fine-grained
requests. 

The following are all equivalent ways of asking for the same amount of VRAM:

```powershell
juice session request --vram 2.5
juice session request --vram 2.5GiB
juice session request --vram 2560MiB
juice session request --vram 2684.35456MB
juice session request --vram 2684354560B
```

By default `--vram` can return a session that has been allocated fewer bytes
than requested if there is no GPU capable of fulfilling the request and the
remaining amount is at least 93% of what was requested. This behavior is 
intended to make slicing of GPUs whose VRAM capacity is not a whole number of
GiBs more ergonomic. This can be overridden with the inclusion of the
`--vram-strict` flag which requires precisely the bytes requested to be
available.

## Ephemeral Slices

The `--vram` and `--vram-strict` options are also accepted as options to `juice
run`. This is especially useful when combined with the `--ephemeral` option to 
force one-off sessions when launching multiple jobs that target the same GPU.

For example:

```powershell
juice run --ephemeral --vram 2 python script_1.py
juice run --ephemeral --vram 2 python script_2.py
```
