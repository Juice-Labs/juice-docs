---
title:   'Manually Managing Sessions'
sidebar_position: 5
---
# Manually Managing Sessions

You can also manage sessions yourself, without the run command. This could prove useful if you want to: 

    - Stay connected to the same GPU across multiple application runs

    - Connect to a specific GPU 

Use 

```powershell
juice session request 
```
to connect you to a GPU in one of your pools. You will remain connected until you run session release. You can use this command to run multiple processes under a single session a single machine.

A client system cannot maintain multiple sessions simultaneously. At any given time it will have one, and only one, *active* session. Trying to request a session while one is already active will result in an error message. 

Use session list to see your current session if any, adding --all to see all sessions in pools you have access to.

### Enabling applications to automatically run with Juice **Windows only**

When you have an active session, you can use these commands to force applications to always run with Juice:

```powershell
juice session add-path <path>
```

```powershell
juice session remove-path <path>
```

You can use either the full path to the executable or a folder path. Using a folder path will automatically enable all executables under that folder to use Juice.

The commands are applied only for the *current active session*. When the session is released, the paths are reset and will have to be added again.

  :::tip
  `add-path` and `remove-path` are only available under Windows.
  :::

### Choosing a Specific GPU

There may be times where you want to make sure you are able to connect to a specific GPU within a pool via the CLI. 

#### To connect to a specific GPU: 

1. Use gpu list to see all GPUs available to you in any of your pools. 

2. Look for a GPU where Used VRAM is 0 B, indicating that it is available.

3. Copy the ID value of the GPU that you want to connect to. 

    :::tip
    Specify the GPU’s ID for the run command using run -–gpu-ids \<id\> or by requesting a session using session request --gpu-ids \<id\>.
    :::


### Requesting a Multi-GPU Session 

To specify the number of GPUs you want for a session, you must input the following in the CLI after requesting a session or running an application:

```powershell
--num-gpus <count>
```

The syntax for this is:
```powershell
juice run -–num-gpus 2 <application> 
```

For this to work, you must have multiple shared and available GPUs from the same machine, otherwise you will get an error message.  