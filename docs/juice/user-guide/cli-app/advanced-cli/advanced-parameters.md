---
title:   'Advanced Parameters'
sidebar_position: 2
---
# Advanced Parameters 

Juice offers several advanced parameters to fine-tune your GPU sessions and application runs: 

 

## Run Command Options 

- --disable-cache

    Prevents the system from using previously cached data for the current run. Use when you need to ensure fresh data for each run, e.g., when testing data-dependent applications or when data integrity is crucial.  

    **Example**:

    ```powershell
    juice run --disable-cache my_data_processing_app.py 
    ```
 

- --disable-compression

    Turns off data compression between the client and the GPU agent. Useful for applications sensitive to data integrity or when network bandwidth isn't a bottleneck. Can also help in diagnosing data transfer issues. 

    **Example**:

    ```powershell
    juice run --disable-compression my_high_fidelity_image_processing.py 
    ```
 

- --ephemeral

    Creates a new session for the run and immediately releases it after completion. Ideal for one-off tasks or when you need a clean state for each run, preventing any potential interference from previous sessions. 

    **Example**:

    ```powershell
    juice run --ephemeral my_benchmarking_script.py 
    ```
 

- --match-labels \<string\>

    Filters available GPUs based on specified labels, ensuring the task runs on a GPU with matching attributes. Use when you need to select GPUs with specific characteristics (e.g., GPU type, installed software). 

    **Example**:

    ```powershell
    juice run --match-labels "gpu-type=v100,env=pytorch" my_ml_model.py 
    ```
 

- --no-version-check

    Bypasses the version compatibility check between the client and the GPU agent. Use cautiously when you need to run on potentially incompatible versions, typically in testing environments. 

    **Example**:

    ```powershell
    juice run --no-version-check my_experimental_app.py 
    ```

- --on-connection-error \<string\>

    Specifies the behavior when a connection error occurs. Options: [fail, continue] Use in scripts or automated workflows where you want to control how the system responds to connection issues. 

    **Example**:

    ```powershell
    juice run --on-connection-error continue my_resilient_app.py 
    ```
 

- --on-queue-timeout \<string\>

    Defines the action to take when the queue time exceeds the specified limit. Options: [fail, continue] Use in time-sensitive scenarios or when you need to control the behavior of long-waiting jobs. 

    **Example**:

    ```powershell
    juice run --on-queue-timeout continue --wait-for 300 my_long_running_job.py 
    ```
 

- --pool-ids \<string\>

    Restricts GPU selection to specific pools identified by their IDs. Use for resource management in multi-team setups or when you need to use GPUs from particular pools.  

    **Example**:

    ```powershell
    juice run --pool-ids pool1,pool2 my_app.py 
    ```
 

- --wait-for \<uint\>

    Sets the maximum time (in seconds) to wait for GPU availability. Use to prevent indefinite waits in resource-constrained environments or for time-sensitive applications.  

    **Example**:

    ```powershell
    juice run --wait-for 600 my_time_sensitive_app.py 
    ```
 

- --tolerates \<string\>

    Specifies which taints the session can tolerate, allowing use of GPUs with specific constraints. Use when you need to use GPUs that have been marked with certain restrictions or characteristics.

    **Example**:

    ```powershell
    juice run --tolerates "high-priority=true" my_critical_task.py
    ```

- --vram \<size\> / --vram-strict

    Request a slice of VRAM instead of a whole GPU. On the Juice CLI this accepts decimals and suffixes (`2.5`, `2.5GiB`, `2560MiB`). See [GPU Slicing](../gpu-slicing.md). The Slurm plugin flag `--juice-vram` is different: integer GiB via `atoi` only.

    **Example**:

    ```powershell
    juice run --ephemeral --vram 4 python train.py
    ```

- --import-session \<path\> / session request --export-session \<path\>

    Export a session file from `juice session request` and import it later with `juice run --import-session` or `juice session release --import-session`. The [Slurm](/docs/juice/admin/slurm.md) hooks use this pair with a per-job encryption key.

    **Example**:

    ```powershell
    juice session request --pool-ids pool-1 --export-session /tmp/job.cfg
    juice run --import-session /tmp/job.cfg python train.py
    juice session release --import-session /tmp/job.cfg
    ```

- --cache-size (agent)

    Sets the per-connection cache size on `juice agent run` (and the Linux installer via `INSTALL_JUICE_EXEC` or extra script args). Docker/Helm pass it in `JUICE_ADDITIONAL_ARGS`. See [Cache](../cache.md).

    **Example**:

    ```powershell
    juice agent run --cache-size 32 <pool-id>
    ```

- --metrics-address (agent)

    Binds the Prometheus metrics endpoint. See [Prometheus](/docs/juice/admin/prometheus.md).

    **Example**:

    ```powershell
    juice agent run --metrics-address 0.0.0.0:9090 <pool-id>
    ```

## Global Command Options

- --log-file

    Directs CLI output to a specified file instead of standard output. Useful for debugging, creating audit trails, or when you need to review operation logs later.
  **Example**:
  ```powershell
  juice --log-file=/path/to/juice.log run my_app.py
  ```

- --log-level

    Sets the verbosity level of logging. Options: debug, info, warn, error, fatal. Adjust for more detailed logs when troubleshooting or less verbose output in production.

    **Example**:

    ```powershell
    juice --log-level debug run my_problematic_app.py 
    ```
 

- --quiet

    Suppresses most output from the CLI. Use in scripts or automated environments where you want to minimize output.

    **Example**:

    ```powershell
    juice --quiet run my_background_task.py 
    ```
 

- --no-banner

    Removes the startup banner from the CLI output. Use in scripts or when you need cleaner output without the banner information.

    **Example**:

    ```powershell
    juice --no-banner run my_app.py 
    ```


These advanced parameters provide fine-grained control over Juice's behavior, allowing users to optimize their workflows for specific use cases and environments.
