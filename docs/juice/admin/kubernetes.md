---
sidebar_label: 'Kubernetes'
sidebar_position: 6
---

# Running the Agent with Kubernetes

Juice provides a [Helm Chart](https://github.com/Juice-Labs/juice-oss/tree/main/charts/agent) to install the Juice Agent into your existing Kubernetes cluster. This chart can run your Agents in one of two ways:

#### Deployment

Runs a Deployment with a fixed replica count (`replicaCount`, default `1`) to determine how many agents to run in the cluster. This can be extended with an HPA to dynamically control the number of agents. The chart uses a rolling update with `maxSurge: 0`.

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

`credentials.secretName` is required. The default image is `docker.io/juicelabs/agent:latest`.

For detailed instructions see the [README](https://github.com/Juice-Labs/juice-oss/tree/main/charts/agent/README.md) and all available options in the [values.yaml](https://github.com/Juice-Labs/juice-oss/tree/main/charts/agent/values.yaml).

## How the chart wires the agent

The pod spec (from `charts/agent/templates/_agent.yaml`) sets:

| Setting | Behavior |
| --- | --- |
| `JUICE_TOKEN` / `JUICE_POOL` | Loaded from the credentials secret |
| `JUICE_HOST_IP` | Set from `status.podIP` |
| `agent.port` | Container port, default `7865` |
| Config / cache | `emptyDir` mounts at `/home/juice/.config/Juice GPU` and `/home/juice/.cache/Juice GPU` |
| Security context | Runs as UID `1000`, non-root, read-only root filesystem |

The chart does not create a Service. Clients connect using the advertised pod IP, so they need network reachability to that address on the agent port.

## Node selection and GPU taints

If you do not set `nodeSelector`, the chart falls back to `nodeSelectorPreset` (default `nvidia.com/gpu.present: "true"`) and adds a toleration for `nvidia.com/gpu` (`Exists` / `NoSchedule`).

If you set a custom `nodeSelector`, that fallback selector **and** the default GPU taint toleration are omitted. Add equivalent `tolerations` yourself when GPU nodes are tainted.

```bash
helm upgrade --install juice juicelabs/agent \
  --set credentials.secretName=juice-credentials \
  --set daemonSet=true
```

Use `env` / `envFrom` in values to pass extra container environment variables, for example a custom `JUICE_HOST_PORT` or `JUICE_ADDITIONAL_ARGS` consumed by the official agent image.

## Common pitfalls

- Secret name typos: `credentials.secretName` must match the Secret you created.
- Clients cannot reach `status.podIP`: check CNI routing, NetworkPolicies, and whether the agent port is reachable from the client network.
- Custom `nodeSelector` without GPU tolerations: pods stay `Pending` on tainted GPU nodes.
- Missing NVIDIA device plugin / Container Toolkit: the official agent image still needs GPU devices inside the pod.
