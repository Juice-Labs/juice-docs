---
sidebar_label:  'Juice Glossary'
sidebar_position: 1
---

# Juice Glossary

**Agent**: The software component running on a machine that shares its GPU resources with the Juice system.

**Client**: The software component that users install on their local machines to connect to and use remote GPUs.

**Labels**: Key-value pairs attached to Agents (GPU-hosting machines) to categorize and organize them based on specific attributes.

**M2M (Machine-to-Machine) Token**: A secure authentication method used for automated processes or long-running tasks in Juice, allowing access without interactive user login.

**Match Labels**: Criteria used when creating sessions to ensure that the session is assigned to an Agent with specific labels.

**Organization**: The top-level entity in Juice, typically representing a company, institution, or department. Organizations can contain multiple pools and users. 

**Pool**: A group of shared GPUs within an organization. Pools are used to organize and manage GPU resources and control user access.

**Session**: An active connection between a user and a shared GPU, established when a user runs an application or requests GPU resources. A session can be written to a file with `--export-session` and reused with `--import-session` (used by the Slurm hooks).

**Taints**: Attributes applied to Agents to repel certain workloads unless they explicitly tolerate the taint, used for specialized hardware or compliance requirements.

**Tolerations**: Specifications used when creating sessions to allow workloads to run on Agents with specific taints.
