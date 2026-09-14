---
sidebar_label: 'Kubernetes'
sidebar_position: 6
---

# Running the Agent with Kubernetes

Juice provides a [Helm Chart](https://github.com/Juice-Labs/juice-oss/tree/main/charts/agent) to install the Juice Agent into your existing Kubernetes cluster. This chart can run your Agents in one of two ways:

#### Deployment

Runs a Deployment with a fixed replica count (`replicaCount`, default `1`). This can be extended with an HPA. The chart uses a rolling update with `maxSurge: 0`.

#### DaemonSet

Set `daemonSet: true` to start a Juice Agent on every selected GPU node instead of a fixed replica count.

## Quickstart

1. Add the helm repository

```bash
helm repo add juicelabs https://juice-labs.github.io/juice
```

2. Create a Kubernetes secret with your M2M token and pool. The chart reads `JUICE_TOKEN` and `JUICE_POOL` by default (`credentials.tokenKey` / `credentials.poolKey`).

```bash
kubectl create secret generic juice-credentials \
  --from-literal=JUICE_TOKEN=<m2m_token> \
  --from-literal=JUICE_POOL=<juice-pool-id>
```

Create the token with `juice m2m create --description kubernetes` and choose a pool with `juice pool list`. See [M2M Tokens](../user-guide/cli-app/m2m-tokens.md).

3. Install the chart

```bash
helm install juice juicelabs/agent --set credentials.secretName=juice-credentials
```

`credentials.secretName` is required. The image in `values.yaml` is `docker.io/juicelabs/agent:latest` (the generated chart README table and `values.schema.json` that list `juicelabs/server` are stale). The upstream Helm README also misspells `--from-literal` as `--from-liternal`; use the command above.

For all options see [values.yaml](https://github.com/Juice-Labs/juice-oss/blob/main/charts/agent/values.yaml).

## How the chart wires the agent

The pod spec (from `charts/agent/templates/_agent.yaml`) sets:

| Setting | Behavior |
| --- | --- |
| `JUICE_TOKEN` / `JUICE_POOL` | Loaded from the credentials secret |
| `JUICE_HOST_IP` | Set from `status.podIP` |
| `agent.port` | Container port, default `7865` |
| Config / cache / tmp | `emptyDir` mounts at `/home/juice/.config/Juice GPU`, `/home/juice/.cache/Juice GPU`, and `/tmp` |
| Security context | UID `1000`, non-root, read-only root filesystem, all capabilities dropped |
| Resources | CPU `500m` and memory `128Mi` requests only; no `nvidia.com/gpu` resource request |
| Topology spread | `maxSkew: 1` on `kubernetes.io/hostname` with `DoNotSchedule` |

The chart does not create a Service. Clients connect using the advertised pod IP, so they need network reachability to that address on the agent port.

Use `env` (a string map) to pass extra container variables consumed by the official image, such as `JUICE_HOST_PORT` or `JUICE_ADDITIONAL_ARGS`. `envFrom` is rendered with `toYaml` and must be a Kubernetes `envFrom` **list** (not the empty mapping shown in `values.yaml`).

Cache and config are ephemeral: they reset when the pod is replaced. See [Cache](../user-guide/cli-app/cache.md).

## Node selection and GPU taints

If you do not set `nodeSelector`, the chart falls back to `nodeSelectorPreset` (default `nvidia.com/gpu.present: "true"`) and adds a toleration for `nvidia.com/gpu` (`Exists` / `NoSchedule`).

If you set a custom `nodeSelector`, that fallback selector **and** the default GPU taint toleration are omitted.

:::warning
`values.yaml` declares `tolerations` and `podLabels`, but `charts/agent/templates/_helpers.tpl` never renders `.Values.tolerations` or `.Values.podLabels`. Setting those keys in a values file has no effect. To schedule onto tainted GPU nodes, leave `nodeSelector` empty so the chart can apply its built-in `nvidia.com/gpu` toleration, or fork the chart to add the taint you need.
:::

```bash
helm upgrade --install juice juicelabs/agent \
  --set credentials.secretName=juice-credentials \
  --set daemonSet=true
```

## Placement constraints

The pod spec always includes a topology spread constraint: at most one agent pod per hostname (`maxSkew: 1`, `whenUnsatisfiable: DoNotSchedule`). A Deployment with `replicaCount` greater than the number of matching nodes will leave extra pods `Pending`.

`hostNetwork` is honored by the template when set (`--set hostNetwork=true`) but is not declared in `values.yaml`. Default pods use the cluster network and advertise `status.podIP`.

## Common pitfalls

- Secret name typos: `credentials.secretName` must match the Secret you created.
- Clients cannot reach `status.podIP`: check CNI routing, NetworkPolicies, and whether the agent port is reachable from the client network.
- Custom `nodeSelector` on tainted GPU nodes: pods stay `Pending` because the default `nvidia.com/gpu` toleration is dropped and `tolerations` in values is ignored.
- Topology spread vs replica count: do not request more replicas than GPU nodes you want to schedule onto.
- Missing NVIDIA device plugin / Container Toolkit: the official agent image still needs GPU devices inside the pod. The chart does not request `nvidia.com/gpu`, so GPU admission depends on your cluster's device plugin and node labels.
- `readOnlyRootFilesystem: true` plus UID `1000`: custom images that write outside the mounted `emptyDir` paths will fail.
