---
title:   'Cache'
sidebar_position: 10
---
# Cache

Data sent from the client to the server (e.g. from the CPU to the remote GPU via **cuMemcpyHtoD()** or **cuMemcpyHtoDAsync()**), is cached on the server to save bandwidth if that data is referenced again. Caching improves load time on inference workloads by caching the model data between runs. Once the model is loaded and inference is being run, caching has no further effect on performance. The default budget is 16GB of data per concurrent connection, and that cached data will be reused for subsequent workloads run against the same server.

Change the agent cache budget with `--cache-size` on `juice agent run` / `juice agent service install`, or by passing the same flag through the Linux installer (`INSTALL_JUICE_EXEC` or `sh -s - --cache-size 128`) or Docker/Helm `JUICE_ADDITIONAL_ARGS`.

Caching improves performance during a training workload by caching the training data. You'll want to ensure that the size of your training data fits within the configured cache size, or structure training so that the working set of training data fits within that budget. If you can't limit your working set this way, then you might get better performance by disabling the cache from the Juice application or with the juice run option `--disable-cache`.

Cache eviction occurs in FIFO order; the oldest entry is evicted to make room for any new entry once the size limit is reached. Make sure that your working set (i.e. the model or training data) fits within this space for ideal performance. 

The cached data and amount of GPU memory are independent. Plenty of results and values generated on the GPU will be stored in memory without needing to be cached.  The cache size should be related to the size of the working set of data for the workload rather than the amount of GPU memory available on the server. 

#### On Windows, the cache is stored in the numbered directories beneath:
    ```powershell
    %LocalAppData%\Juice GPU\cache and C:\Windows\ServiceProfiles\juice\AppData\Local\Juice GPU\cache
    ```

#### On Linux, the cache can be found here:
    ```powershell
    ~/.cache/Juice/cache
    ```

:::note
You may delete these numbered directories while not sharing your GPU to recover disk space. 
:::

Concurrent means that if this agent is being used by more than one connection (i.e. different users, different workloads, etc.) at the same time, each concurrent connection might also consume up to the configured cache budget in the agent. There is currently no explicit limit on the number of concurrent connections a server can accept beyond the GPUs work limit.

Helm agents mount cache at `/home/juice/.cache/Juice GPU` as an `emptyDir`, so the cache is discarded when the pod is replaced.

### Example:

100 concurrent connections at the default 16GB budget can drive the cache size to up to 100 x 16GB = 1600 GBs.    

 
