---
sidebar_label: 'Kubernetes'
sidebar_position: 6
---

# Running the Agent with Kubernetes

Juice provides a [Helm Chart](https://github.com/Juice-Labs/juice-oss/tree/main/charts/agent) to install the Juice Agent into your existing Kubernetes cluster. This chart can run your Agents in one of two ways:

#### Deployment

Runs a deployment with a fixed replica count to determine how many agents to run in the cluster. This can easily be extended with an HPA to dynamically control the number agents.

#### DaemonSet

Runs a daemonset to start a Juice Agent on every node that has a GPU attached (`daemonSet: true`).

The chart does **not** create a Kubernetes Service. Clients reach the agent using `JUICE_HOST_IP`, which the template sets from `status.podIP` (`--gateway-ips` in the container). There is no in-cluster Service DNS name for the agent port.

## Quickstart

1. Add the helm repository

```bash
helm repo add juicelabs https://juice-labs.github.io/juice
```

2. Create the kubernetes secret with your M2M token and pool

```bash
kubectl create secret generic juice-credentials --from-literal=JUICE_TOKEN=<m2m_token> --from-literal=JUICE_POOL=<juice-pool-id>
```

3. Install the chart, passing the **secret name** (required; Helm fails if `credentials.secretName` is empty)

```bash
helm install juice juicelabs/agent --set credentials.secretName=juice-credentials
```

The image is `docker.io/juicelabs/agent` (`values.yaml`). Generated chart docs and `values.schema.json` still list `juicelabs/server`; that name is stale.

For detailed instructions please see the [README](https://github.com/Juice-Labs/juice-oss/tree/main/charts/agent/README.md) and all available options in the [values.yaml](https://github.com/Juice-Labs/juice-oss/tree/main/charts/agent/values.yaml).

## Placement, GPUs, and networking

Default scheduling (when `nodeSelector` is empty):

- `nodeSelector`: `nvidia.com/gpu.present=true` (`nodeSelectorPreset`)
- one built-in toleration: `nvidia.com/gpu` `Exists` `NoSchedule`

If you set a custom `nodeSelector`, the template **drops** that GPU taint toleration. GPU nodes that use the NVIDIA `NoSchedule` taint will not take the pod unless you restore a matching toleration another way.

The chart does **not** request `nvidia.com/gpu` (or any other GPU resource). `resources` in `values.yaml` are CPU/memory requests only (`500m` / `128Mi`). Scheduling is label/taint based, not device-plugin resource based. Multiple agent pods can land on the same node unless topology spread prevents it; the image sets `NVIDIA_VISIBLE_DEVICES=all`.

Topology spread is always rendered:

- `maxSkew: 1`
- `topologyKey: kubernetes.io/hostname`
- `whenUnsatisfiable: DoNotSchedule`

That means at most one agent pod per hostname. A Deployment `replicaCount` larger than the number of matching GPU nodes will leave extra pods Pending.

`hostNetwork` is honored in the pod template when set to `true`, but it is **not** in `values.yaml`. Pass `--set hostNetwork=true` (or an equivalent `--set-string`) if clients cannot reach `status.podIP` on UDP `agent.port` (default 7865).

## Values the templates actually use

| Value | Rendered? | Notes |
| --- | --- | --- |
| `credentials.secretName` / `poolKey` / `tokenKey` | Yes | Secret name is required |
| `env` | Yes | **Map** of `KEY: value`, not a list of `{name, value}` |
| `envFrom` | Yes, via `toYaml` | Must be a **list** of envFrom sources. `values.yaml` defaults to `{}` (a map). An empty map is Helm-truthy, so the default can emit invalid `envFrom: {}`. Set `envFrom: []` unless you are adding sources |
| `podAnnotations` | Yes | Attached to the pod template |
| `podLabels` | **No** | Declared in `values.yaml`; `_helpers.tpl` never merges them |
| `tolerations` | **No** | Declared in `values.yaml`; the template only injects the built-in GPU taint when `nodeSelector` is empty. Do not set Helm `tolerations` expecting GPU taints to be tolerated |
| `securityContext` | Yes | Default: drop all capabilities, `readOnlyRootFilesystem: true`, `runAsNonRoot: true`, `runAsUser: 1000` (matches the image user) |
| `image.*` | Yes | Repository `docker.io/juicelabs/agent` |
| `agent.port` | Yes | Container port only; no Service |

Config, cache, and `/tmp` are `emptyDir`. Cache does not survive reschedules. `readOnlyRootFilesystem: true` means the process can only write to those mounts.

## Deployment update strategy

The Deployment sets `rollingUpdate.maxSurge: 0` (and includes a `serviceName` field, which Kubernetes uses on StatefulSets, not Deployments or DaemonSets). Combined with topology spread, surgeless rollouts need a free GPU node or a sufficient `maxUnavailable` default to replace a pod.

## Extra agent flags

There is no dedicated Helm value for CLI flags. Add them as `JUICE_ADDITIONAL_ARGS` through `env`:

```yaml
env:
  JUICE_ADDITIONAL_ARGS: "--metrics-address 0.0.0.0:9090 --cache-size 32"
```
