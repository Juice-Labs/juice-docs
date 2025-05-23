---
title: 'Getting Started'
position: 2
sidebar_position: 2
---

# Getting Started

Once you've installed Juice you're all set to start sharing your GPUs over the network.  These examples give you some quick steps to get started quickly.

The examples all assume you are running from a command prompt or shell with the `juice` executable available in the path, e.g. with the Juice install directory `C:\Program Files\Juice GPU` listed in the `PATH` environment variable.

## Log In or Sign Up

Login to begin using Juice by running `juice login`.  This will redirect you to a browser where you can enter the username and password of your Juice account or sign up for one if you haven't already.  Once logged in on a machine you can share and use GPUs using the Juice CLI through the command `juice`.

## Share a GPU

Share a GPU with Juice by running `juice agent run {pool-id}` where `{pool-id}` is the identifier of the pool you want to share the GPU in.  A pool is one of the ways in which clients can identify or choose the GPUs they want to connect to.

List the available pools by running `juice pool list`.  You should see something like the following with at least a pool named for the name and email address that you signed up with:

~~~sh
juice pool list
... list of pools to choose from ...
23234234-1234-1234 Charles Baker [charles@juicelabs.co]
~~~

Then share GPUs in your machine by running `juice agent run <pool-id>`:

~~~sh
juice agent run <pool-id>
~~~

Confirm that your GPUs are available by running `juice gpu list` from a separate shell or command prompt:

~~~sh
juice gpu list
... shared GPUs ...
~~~

This shows the GPUs you've just shared plus any other GPUs you might have access to through other pools.  Running applications with Juice, without specifying any arguments to limit GPU selection, will choose one of these GPUs to act as the local GPU for that application.

## Run an Application

There are two ways to launch an application using a remote GPU provided by Juice.  The first uses `juice run ...` to launch an executable directly from the command line; the second activates a path beneath which any launched executables will use a Juice GPU.

Run an application with Juice by launching it through the `juice run` command line tool, passing the path to the application and any arguments on the command line.

For example, assuming the directory you extracted the client archive to is included in `PATH` the following will run `<application>` with Juice selecting the first available GPU:

~~~
juice run <application>
~~~

Limit the GPU selection to a pool with `--pool-ids`:

~~~sh
juice run --pool-ids <pool-id> <application>
~~~

Multiple pools can be specified in a comma separated list.  Avoid spaces or use quoting as necessary.

Limit to a specific GPU with `--gpu-ids`:

~~~sh
juice run --gpu-ids <gpu-id> <application>
~~~

Multiple GPUs can be specified in a comma separated list provided they're all hosted from the same machine.


## Active Paths (Windows only)

Run applications automatically with a Juice GPU on Windows by activating the paths to those applications with Juice.  Executables launched from active paths while there is a current Juice session automatically use the Juice GPU.  Launching without a Juice session will launch the application normally, i.e. without any remote connected GPU, this will use a local GPU if available or otherwise behave however the application behaves when it runs without a GPU by falling back to use CPU or perhaps not running at all.

Create a session and make it current by running `juice session request ...` using many of the same selection parameters previously described in the `juice run ...` command to select which GPU to connect to.  A session is a reservation of GPU ram on a particular GPU available within the pools you have access to.

~~~sh
juice session request ...
... session created successfully example ...
~~~

Once you have a session any executable launched that is beneath an active path or is listed as an active path itself will be launched to use the Juice GPU as part of the current session.  This removes the need to use the command line to launch the executable explicitly and is especially useful for applications that use an intermediate launcher or have complicated command lines.

## More Examples

See [Juice for Compute](juice-for-compute/) for examples of running CUDA-based applications like [Stable Diffusion](juice-for-compute/stable-diffusion.md) with Juice.

See [Juice for Graphics](juice-for-graphics/) for examples of running graphical applications like [3DMark](juice-for-graphics/3dmark.md), [Superposition](juice-for-graphics/superposition.md), and [Maya](juice-for-graphics/maya.md) through Juice.

Graphics workloads are currently only supported from the Windows client.  NOTE: This is a client-side restriction only -- the Juice client on Windows can connect to a machine running the Agent on Linux or Windows to serve graphics workloads.
