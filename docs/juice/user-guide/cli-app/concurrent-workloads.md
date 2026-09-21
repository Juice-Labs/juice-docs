---
title:   'Running Concurrent Workloads'
sidebar_position: 4
---
# Running Concurrent Workloads

You can run multiple applications concurrently using the CLI in two ways.

`juice run` treats the first positional argument as the **application**, not the pool. Select pools with `--pool-ids` (comma-separated). A command such as `juice run pool-1 python train.py` tries to execute a binary named `pool-1`.

## Running Applications in the Same Pool

When you have a pool with sufficient GPU resources, you can run multiple applications using the same pool:

```powershell
juice run --pool-ids [pool-id] application1
juice run --pool-ids [pool-id] application2
```

For example:
```powershell
juice run --pool-ids pool-1 python train.py
juice run --pool-ids pool-1 jupyter lab
```

## Running Applications Across Different Pools

When you need to distribute your workload across multiple pools (e.g., when no single pool has enough GPUs):

```powershell
juice run --pool-ids [pool-id-1] application1
juice run --pool-ids [pool-id-2] application2
```

For example:
```powershell
juice run --pool-ids pool-1 python train.py
juice run --pool-ids pool-2 jupyter lab
```

:::tip
Use `juice pool list` to see available pools and their IDs.
:::
