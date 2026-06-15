---
sidebar_label: 'Kubernetes'
sidebar_position: 6
---

# Running the Agent with Kubernetes

Juice provides a [Helm Chart](https://github.com/Juice-Labs/juice-oss/tree/main/charts/agent) to install the Juice Agent into your existing Kubernetes cluster. This chart can run your Agents in one of two ways:

#### Deployment

Runs a deployment with a fixed replica count to determine how many Agents to run in the cluster. This is useful when you want to control Agent count directly.

#### DaemonSet

Runs a DaemonSet to start a Juice Agent on every matching GPU node. Use this when each GPU node should advertise itself to Juice automatically.

## Quickstart

1. Add the Helm repository:

```bash
helm repo add juicelabs https://juice-labs.github.io/juice
```

2. Create the Kubernetes secret with your M2M token and pool ID:

```bash
kubectl create secret generic juice-credentials \
  --from-literal=JUICE_TOKEN=<m2m_token> \
  --from-literal=JUICE_POOL=<juice-pool-id>
```

3. Install the chart:

```bash
helm install juice juicelabs/agent --set credentials.secretName=juice-credentials
```

## Common values

| Value | Default | Description |
| --- | --- | --- |
| `credentials.secretName` | `""` | Secret that contains the Agent credentials. Required. |
| `credentials.tokenKey` | `JUICE_TOKEN` | Secret key that stores the M2M token. |
| `credentials.poolKey` | `JUICE_POOL` | Secret key that stores the Juice pool ID. |
| `image.repository` | `docker.io/juicelabs/agent` | Agent image repository. |
| `image.tag` | `latest` | Agent image tag. Pin this for repeatable rollouts. |
| `agent.port` | `7865` | UDP gateway port exposed by the Agent container. |
| `daemonSet` | `false` | Set to `true` to run one Agent per matching node. |
| `replicaCount` | `1` | Number of replicas when `daemonSet` is `false`. |
| `nodeSelectorPreset` | `nvidia.com/gpu.present` | GPU node selector used when `nodeSelector` is empty. |
| `nodeSelector` | `{}` | Explicit node selector. Overrides the preset when set. |
| `tolerations` | `[]` | Tolerations for scheduling onto tainted GPU nodes. |
| `env` | `{}` | Additional environment variables for the Agent container, such as `JUICE_ADDITIONAL_ARGS`. |
| `envFrom` | `{}` | Additional environment sources from ConfigMaps or Secrets. |

Example DaemonSet install:

```bash
helm upgrade --install juice juicelabs/agent \
  --set credentials.secretName=juice-credentials \
  --set daemonSet=true
```

The chart sets `JUICE_HOST_IP` from the pod IP (`status.podIP`). Make sure clients can route UDP traffic to the advertised pod IP and `agent.port`. If clients connect from outside the pod network, configure your cluster networking accordingly; for clusters where host networking is required, set `hostNetwork=true`.

For detailed instructions please see the [README](https://github.com/Juice-Labs/juice-oss/tree/main/charts/agent/README.md) and all available options in the [values.yaml](https://github.com/Juice-Labs/juice-oss/tree/main/charts/agent/values.yaml).