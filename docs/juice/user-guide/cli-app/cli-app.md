---
title: 'Running Applications with Juice'
sidebar_position: 1
---

# Running Applications with Juice

Run an application with Juice by launching it with `juice run` from the command line or by activating the path to the application's executable(s).

Running an application with `juice run` by passing the path to the application and any arguments on the command line.  This will launch the application to use Juice to connect to remote GPUs as if they were local.

For example, assuming the `juice` tool is included in the `PATH` the following will run `<application>` with Juice, selecting the first GPU available:

~~~
juice run <application>
~~~

See [Juice for Compute](../juice-for-compute/index.md) for examples of running CUDA-based applications like [Jupyterlab](../juice-for-compute/jupyterlab.md), [Ollama](../juice-for-compute/ollama.md), and [Stable Diffusion](../juice-for-compute/stable-diffusion.md) with Juice.

See [Juice for Graphics](../juice-for-graphics/index.md) for examples of running graphical applications like [3DMark](../juice-for-graphics/3dmark.md), [Superposition](../juice-for-graphics/superposition.md), [Maya](../juice-for-graphics/maya.md) through Juice.

Graphics workloads are currently only supported from the Windows client.  NOTE: This is a client-side restriction only -- the Juice client on Windows can connect to a machine running the Agent on Linux or Windows to serve graphics workloads.

# Using the CLI App

The command-line interface (CLI) is a powerful tool designed to facilitate various operations and configurations for users. You can run commands to help manage:

- Agents and pools
- Organizations and users
- Sessions and runs
- Authentication processes

## Getting Started

Get in-context help by appending `--help` or `-h` to any command:

```powershell
juice --help          # Top-level help
juice session --help  # Help with sessions
juice run --help      # Help with running applications
```

:::note
Example commands are formatted for Linux machines. For Windows commands, substitute `./juice` for either `juice.exe` or `juice`.
:::

For more information on advanced CLI capabilities, see the guides on [Advanced CLI Processes](/docs/juice/pro-users/cli-app/advanced-cli/advanced-cli.md).
