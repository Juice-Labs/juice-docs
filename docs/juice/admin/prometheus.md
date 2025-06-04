---
sidebar_label: 'Prometheus'
sidebar_position: 7
---

# Gathering Metrics with Prometheus

Juice Agents expose a number of metrics that can be ingested by Prometheus or Victoria Metrics from inside a Kubernetes cluster or on a standalone server.

## Enabling Metrics

To enable Prometheus metrics, add --metrics-address to the command line options when starting the agent:

```bash
juice agent run --metrics-address 127.0.0.1:9090 ...
```

This enables the metrics, which can be verified by visiting the address in a web browser.


## Available Metrics

| Metric | Type | Description |
|--------|------|-------------|
| juice_agent_gpu_allocated | gauge | Number of GPUs in use by Sessions |
| juice_agent_gpu_count | gauge | Number of GPUs on this Agent |
| juice_agent_gpu_utilization | gauge | Total GPU utilization per GPU (0-1) |
| juice_agent_gpu_vram_allocated | gauge | Allocated VRAM per GPU (MB) |
| juice_agent_gpu_vram_available | gauge | Available VRAM per GPU (MB) |
| juice_agent_gpu_vram_total | gauge | Total VRAM per GPU (MB) |
| juice_agent_session | gauge | Active sessions per User |

Example:

```
juice_agent_gpu_allocated{gpu_id="c869cad0-2e64-42ac-9251-7edd981ad5ae",gpu_name="NVIDIA GeForce RTX 3090",pool_id="20b6be11-a9de-4fa0-85fb-d8745d1df029",pool_name="example pool"} 1
juice_agent_gpu_count{pool_id="20b6be11-a9de-4fa0-85fb-d8745d1df029",pool_name="test pool"} 1
juice_agent_gpu_utilization{gpu_id="c869cad0-2e64-42ac-9251-7edd981ad5ae",gpu_name="NVIDIA GeForce RTX 3090",pool_id="20b6be11-a9de-4fa0-85fb-d8745d1df029",pool_name="example pool"} 0.02
juice_agent_gpu_vram_allocated{gpu_id="c869cad0-2e64-42ac-9251-7edd981ad5ae",gpu_name="NVIDIA GeForce RTX 3090",pool_id="20b6be11-a9de-4fa0-85fb-d8745d1df029",pool_name="example pool"} 8590
juice_agent_gpu_vram_available{gpu_id="c869cad0-2e64-42ac-9251-7edd981ad5ae",gpu_name="NVIDIA GeForce RTX 3090",pool_id="20b6be11-a9de-4fa0-85fb-d8745d1df029",pool_name="example pool"} 0
juice_agent_gpu_vram_total{gpu_id="c869cad0-2e64-42ac-9251-7edd981ad5ae",gpu_name="NVIDIA GeForce RTX 3090",pool_id="20b6be11-a9de-4fa0-85fb-d8745d1df029",pool_name="example pool"} 8590
juice_agent_session{user_id="37bc58dd-741b-4494-98b7-e60b23d6adea"} 1
```
