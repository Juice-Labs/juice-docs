---
sidebar_label: 'Kubernetes'
sidebar_position: 6
---

# Running the Agent with Kubernetes

Juice provides a [Helm Chart](https://github.com/Juice-Labs/juice-oss/tree/main/charts/agent) to install the Juice Agent into your existing Kubernetes cluster. This chart can run your Agents in one of two ways:

#### Deployment

Runs a deployment with a fixed replica count to determine how many agents to run in the cluster. This can easily be extended with an HPA to dynamically control the number agents.

#### DaemonSet

Runs a daemonset to start a Juice Agent on every node that has a GPU attached.

## Quickstart

1. Add the helm repository

```bash
helm repo add juicelabs https://juice-labs.github.io/juice
```

2. Create the kubernetes secret with your M2M token
```bash
kubectl create secret generic juice-credentials --from-literal=JUICE_TOKEN=<m2m_token> --from-literal=JUICE_POOL=<juice-pool-id>
```

3. Install the chart

```bash
helm install juice juicelabs/agent --set credentials.secretName=juice-credentials
```

For detailed instructions please see the [README](https://github.com/Juice-Labs/juice-oss/tree/main/charts/agent/README.md) and all available options in the [values.yaml](https://github.com/Juice-Labs/juice-oss/tree/main/charts/agent/values.yaml)