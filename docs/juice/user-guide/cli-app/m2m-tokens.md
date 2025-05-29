---
title:   'M2M Tokens'
sidebar_position: 8
---
# Machine-to-Machine Tokens

In Juice, Machine-to-Machine (M2M) tokens provide a secure way to authenticate automated processes or long-running tasks without an interactive user login. These tokens are essential for scenarios where human intervention for authentication is impractical or impossible. 

## Key Features of M2M Tokens 

- Long-lived authentication mechanism 

- Can be created, managed, and revoked independently of user accounts 

- Ideal for automated scripts, CI/CD pipelines, and server-to-server communication 

- Have a maximum life-time of 365 days


## Creating and Managing M2M Tokens 

1. This command generates a new token and displays it. Save this token in a secure location once it’s generated.
    ```powershell
    ./juice m2m create -d '<token name>'
    ```

2. This command List existing M2M tokens:
    ```powershell
    ./juice m2m list 
    ```

3. Remove an M2M token:
    ```powershell
    ./juice m2m remove '<token id*>' 
    ```
    \* to retrieve token id `run juice m2m list`

By default a token will last 30 days, but by specifying the --expire-days parameter on creation you can extend this out to a maximum of 365 days.

## Using M2M Tokens 

**To authenticate using an M2M token**:
```powershell
./juice login -t '<token>'
```

## Example Use Cases 

- **Automated Nightly Batch Jobs**: Set up a script to run intensive GPU computations during off-hours: 
    ```powershell
    #!/bin/bash 

    ./juice login -t 'my_m2m_token_xyz' 

    ./juice run --pool-id nightly_pool my_nightly_job.py 
    ```

- **CI/CD Pipeline Integration**: In your CI/CD configuration (e.g., GitLab CI): 
    ```powershell
    gpu_test_job: 

    script: 

    - ./juice login -t 'my_m2m_token_xyz'

    - ./juice run --gpu-ids '<the gpu id>' gpu_intensive_tests.py 
    ```

- **Long-Running Server Applications**: For a server that needs persistent access to GPU resources: 
    ```powershell
    import subprocess 

    def gpu_task(): 

    subprocess.run(["./juice", "login", "-t", "m2m_token_abc"]) 

    subprocess.run(["./juice", "run", "long_running_gpu_task.py"]) 

 

    # Run this function periodically or as needed 
    ```

- **Distributed Computing Setup**: In a distributed system where multiple nodes need GPU access:
    ```powershell
    def node_gpu_access(node_id): 

    token = f"m2m_token_node_{node_id}" 

    subprocess.run(["./juice", "login", "-t", token]) 

    subprocess.run(["./juice", "run", f"node_{node_id}_task.py"]) 
    ```

- **Automated Resource Management**: Script to check and release idle GPU sessions: 
    ```powershell
    #!/bin/bash 

    ./juice login -t 'my_m2m_token_xyz' 

    idle_sessions=$(./juice session list --all | grep "idle" | awk '{print $1}') 

    for session in $idle_sessions; do 

    ./juice session release $session 

    done
    ```

## Best Practices 

- Treat M2M tokens like passwords; store them securely 

- Use a separate token for each distinct application or use case 

- Regularly audit and rotate M2M tokens 

- Limit the permissions associated with each token to the minimum necessary 

- Implement monitoring and alerting for unusual token usage patterns 


Leveraging M2M tokens, you can securely automate GPU resource management and integrate Juice into various workflows and systems, enhancing productivity and resource utilization.          
