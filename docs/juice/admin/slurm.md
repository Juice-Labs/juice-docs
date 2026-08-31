---
sidebar_label: 'Slurm'
sidebar_position: 8
---

# Running Jobs with Slurm

[Juice-Labs/juice-slurm](https://github.com/Juice-Labs/juice-slurm) ships a Slurm SPANK plugin plus `slurmctld` prolog/epilog hooks. The plugin lets Slurm jobs reserve GPUs from a Juice pool and run the job command through `juice run`, even when the compute nodes themselves have no local GPUs.

Source of truth for flags and hook behavior is the plugin and hook scripts in that repository, not the repository README (the README currently lists `--juice-gpu-count`; the plugin registers `--juice-num-gpus`).

## Architecture

1. A user submits `srun` or `sbatch` with `--juice-pool`.
2. The SPANK plugin on the submission path records the pool, GPU count, and optional VRAM slice, and creates a per-job session encryption key.
3. `PrologSlurmctld` runs `juice session request --export-session ...` against the Juice controller using an M2M token. On success it writes an encrypted session file onto a shared filesystem.
4. Slurm starts the job on a compute node. The plugin prepends `juice --no-banner run --import-session <session-file>` to the task command so the workload uses the reserved remote GPU.
5. `EpilogSlurmctld` runs `juice session release --import-session ...` and deletes the session file.

All GPUs for one job must come from a single Juice Agent. Requesting more GPUs than any one agent in the pool can provide will fail the session request.

## Build the SPANK plugin

The plugin must be compiled against the Slurm headers for the cluster version:

```bash
cd spank-plugin
make
```

`Makefile` defaults:

- Include path: `/usr/include/slurm`
- Library path: `/usr/lib64`
- Output: `juice.so`

Override `SLURM_INC` / `SLURM_LIB` if your Slurm install uses different paths.

## Configure every Slurm node

Install the `juice` CLI and `juice.so` on all nodes that submit or run jobs. Add the plugin to `plugstack.conf` with two arguments: the `juice` binary path (the path must end in `juice`) and a shared data directory that exists on every node:

```text
juice.so /opt/juice/juice /opt/juice/.data
```

The data directory holds per-job session files (`<data-dir>/sessions/job-<jobid>.cfg`). It must be on a filesystem visible to `slurmctld` and the compute nodes.

## Configure slurmctld hooks

Copy the four files from `slurm-hooks/` onto the controller. Set the M2M token in `juice-config.sh`:

```bash
export JUICE_PATH=/opt/juice
export JUICE_TOKEN=m2m_YOUR_TOKEN
export JUICE_EXTRA_ARGS="--no-banner"
export JUICE_ERROR_LOG=/tmp/juice.log
```

`juice-init.sh` derives:

- `JUICE_CMD=$JUICE_PATH/juice`
- `JUICE_DATA=$JUICE_PATH/.data`
- `JUICE_SESSIONS=$JUICE_DATA/sessions`

`JUICE_PATH/.data` must match the second `plugstack.conf` argument.

Point Slurm at the hooks:

```text
PrologSlurmctld=/hooks/juice-prolog.sh
EpilogSlurmctld=/hooks/juice-epilog.sh
```

Create the token with `juice m2m create --description slurm` on a machine that can reach the controller. See [M2M Tokens](../user-guide/cli-app/m2m-tokens.md).

Jobs submitted without `--juice-pool` leave the prolog and epilog immediately (`exit 0`).

## Job flags

| Flag | Required | Default | Purpose |
| --- | --- | --- | --- |
| `--juice-pool=<name-or-id>` | Yes, to use Juice | unset | Pool to reserve from. Passed to `session request --pool-ids`. |
| `--juice-num-gpus=<count>` | No | `1` | GPU count. Must be a positive integer. Passed to `--num-gpus`. |
| `--juice-vram=<gib>` | No | omitted | Integer GiB of VRAM to reserve. Passed to `--vram`. Values below `1` are rejected. |

Examples:

```bash
srun --juice-pool=test hostname -A

srun --juice-pool=test --juice-num-gpus=2 hostname -A

srun --juice-pool=test --juice-vram=1 hostname -A

sbatch --juice-pool=test --wrap="python train.py"
```

`--juice-vram` is parsed with `atoi`, so `2.5` becomes `2`. For suffix-based VRAM requests (`2.5GiB`, `2560MiB`), use `juice session request --vram` directly. See [GPU Slicing](../user-guide/cli-app/gpu-slicing.md).

## Constraints and pitfalls

- Shared storage is required. If compute nodes cannot read `job-<id>.cfg`, `juice run --import-session` fails.
- The plugin rejects a `juice` path that does not exist or does not end with `juice`.
- `--juice-num-gpus=0` and `--juice-vram` less than `1` are errors.
- A failed `session request` makes the prolog exit non-zero, so Slurm does not start the compute phase.
- Hook failures are appended to `JUICE_ERROR_LOG` (default `/tmp/juice.log`) on the controller.
- You cannot combine GPUs from multiple agents in one job.

A local compose-based development cluster is included under `dev-cluster/` in the juice-slurm repository.
