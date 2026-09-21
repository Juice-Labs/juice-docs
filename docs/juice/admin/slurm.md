---
sidebar_label: 'Slurm'
sidebar_position: 8
---

# Running jobs with Slurm

[Juice-Labs/juice-slurm](https://github.com/Juice-Labs/juice-slurm) is a SPANK plugin plus slurmctld prolog/epilog hooks. It requests a Juice session on the controller when a job starts, stores an encrypted session file on a shared filesystem, wraps the task with `juice run --import-session`, and releases the session when the job ends.

Agents stay **outside** the Slurm cluster. Jobs cannot span GPUs from more than one agent.

## Build and install the plugin

On every node that will submit or run Juice jobs:

```bash
cd spank-plugin
make
```

The Makefile compiles against `SLURM_INC=/usr/include/slurm` and `SLURM_LIB=/usr/lib64`. Override those if your Slurm headers live elsewhere.

Install `juice.so` and add it to `plugstack.conf` with **exactly two arguments**: the Juice binary path and a shared data directory. Both paths must exist at plugin load, and the binary path must end with the five characters `juice` (the plugin checks `argv[0]` that way):

```
required juice.so /opt/juice/juice /opt/juice/.data
```

Those strings are copied into 256-byte buffers (`juice_cmd` and `juice_data`). Keep the paths shorter than that.

## Configure slurmctld hooks

Copy `slurm-hooks/` onto the controller. Edit `juice-config.sh`:

```bash
export JUICE_PATH=/opt/juice
export JUICE_TOKEN=[insert token here]
export JUICE_EXTRA_ARGS="--no-banner"
export JUICE_ERROR_LOG=/tmp/juice.log
```

Replace the token placeholder with an M2M token. `juice-init.sh` derives:

- `JUICE_CMD=$JUICE_PATH/juice`
- `JUICE_DATA=$JUICE_PATH/.data`
- `JUICE_SESSIONS=$JUICE_DATA/sessions`

Session files are `$JUICE_SESSIONS/job-$SLURM_JOBID.cfg`. That directory must be on a filesystem shared by slurmctld and the compute nodes.

```
PrologSlurmctld=/hooks/juice-prolog.sh
EpilogSlurmctld=/hooks/juice-epilog.sh
```

## What the plugin does

1. User flags set `juice_pool`, `juice_num_gpus` (default 1), and `juice_vram` (unset means the whole GPU).
2. After option parsing, the plugin generates a 32-character key and exports `JUICE_SESSION_ENCRYPTION_KEY`. The prolog reads it as `SPANK_JUICE_SESSION_ENCRYPTION_KEY`.
3. If `--juice-pool` was not passed, the plugin and hooks do nothing.
4. Prolog runs `juice session request --export-session ... --pool-ids <pool> [--num-gpus N] [--vram N]`. A non-zero exit requeues the job.
5. On the compute node, `slurm_spank_task_init` **prepends** `juice --no-banner run --import-session <session file>` to the task argv. Do not wrap the job command with `juice run` yourself or the command is double-wrapped.
6. Epilog runs `juice session release --import-session ...`, deletes the session file, and **always `exit 0`**, even if release fails. Check `$JUICE_ERROR_LOG` (default `/tmp/juice.log` on the controller) if GPUs stay reserved.

## Job flags

Registered names in `spank-plugin/juice.c` (the juice-slurm README listing `--juice-gpu-count` is wrong):

| Flag | Meaning | Parsing |
| --- | --- | --- |
| `--juice-pool=<name-or-id>` | Required to enable Juice for the job | Copied into a **64-byte** buffer (63 characters plus NUL). Longer values are truncated |
| `--juice-num-gpus=<n>` | GPU count | `atoi`. `0` is rejected. Negative strings are not rejected (`atoi("-1")` is non-zero) |
| `--juice-vram=<n>` | VRAM slice in **integer GiB** | `atoi`. Values `< 1` are rejected. Suffixes such as `2.5GiB` are **not** parsed; unlike `juice session request --vram`, this is an integer only |

```bash
srun --juice-pool=test hostname -A
srun --juice-pool=test --juice-num-gpus=2 hostname -A
srun --juice-pool=test --juice-vram=1 hostname -A
```
