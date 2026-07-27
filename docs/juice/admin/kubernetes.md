---
sidebar_label: 'Kubernetes'
sidebar_position: 6
---


# Running the Agent with Kubernetes

Juice provides a [Helm Chart](https://github.com/Juice-Labs/juice-oss/tree/main/charts/agent) to install the Juice Agent into your existing Kubernetes cluster. This chart can run your Agents in one of two ways:

#### Deployment

Runs a deployment with a fixed replica count to determine how many agents to run in the cluster. This can easily be extended with an HPA to dynamically control the number agents.

#### DaemonSet

Runs a daemonset to start a Juice Agent on every node that has a GPU attached. Enable with `--set daemonSet=true`.

## Quickstart

1. Add the helm repository

```bash
helm repo add juicelabs https://juice-labs.github.io/juice
```

2. Create an M2M token and choose a pool

```bash
juice m2m create --description kubernetes
juice pool list
```

3. Create the kubernetes secret with your M2M token and pool

```bash
kubectl create secret generic juice-credentials \
  --from-literal=JUICE_TOKEN=<m2m_token> \
  --from-literal=JUICE_POOL=<juice-pool-id>
```

4. Install the chart

```bash
helm upgrade --install juice juicelabs/agent --set credentials.secretName=juice-credentials
```

### Important chart defaults

| Value | Default | Notes |
| --- | --- | --- |
| `image.repository` | `docker.io/juicelabs/agent` | Official agent image |
| `image.tag` | `latest` | Pin a version for production |
| `agent.port` | `7865` | Agent UDP/gateway port |
| `daemonSet` | `false` | Set `true` to schedule one agent per matching node |
| `nodeSelectorPreset` | `nvidia.com/gpu.present` | Used when `nodeSelector` is empty so pods land on GPU nodes |
| `credentials.tokenKey` / `credentials.poolKey` | `JUICE_TOKEN` / `JUICE_POOL` | Keys read from the credentials secret |

The chart sets `JUICE_HOST_IP` from each pod's `status.podIP`. Clients must be able to reach that address on the agent port. If pod networking is not reachable from clients, configure an alternate reachable address path (for example host networking or an externally advertised IP) before expecting remote sessions to connect.

For detailed instructions please see the [README](https://github.com/Juice-Labs/juice-oss/tree/main/charts/agent/README.md) and all available options in the [values.yaml](https://github.com/Juice-Labs/juice-oss/tree/main/charts/agent/values.yaml).
