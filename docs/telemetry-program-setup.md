---
title: 'Collecting Telemetry Data'
sidebar_class_name: 'hidden'
---

# Collecting Telemetry Data


Before you begin, you must be part of the Juice Telemetry collection program. You should have received an **email invitation** to join. If you haven't received an invite, [please contact our support team](mailto:help@juicelabs.co).

---

## Setup Instructions


### Step 1: Accept Your Invitation

First, find the telemetry program invitation in your email inbox and accept it. Follow the link and create your account 


### Step 2: Create an M2M Token

The agent requires a secure Machine-to-Machine (M2M) token to authenticate with the Juice platform.

1.  Log in to the Juice admin interface at [**app.juicelabs.co**](https://app.juicelabs.co/).
2.  Navigate to the **M2M Tokens** page. 
3.  Click **Create Token** and give it a name (e.g., `telemetry-agent-token`).
4.  Copy the generated token immediately and store it somewhere safe. You won't be able to see it again after you navigate away from the page.

:::danger Important
The M2M token is a security credential. Treat it like a password and do not share it or expose it in public repositories.
:::

### Step 3: Install the Agent

Choose from one of the Agent installation methods below. Whichever method you choose, you will need the **M2M Token** you created in the previous step to configure the agent.

#### Bare Metal and Virtual Machines

For standard Linux environments, you can use the one-step `curl` command to download and run the installer. This is the fastest way to get started.

:::tip Before You Run
Make sure to replace `[token]` with the M2M token you created in Step 2.
:::

```bash
curl [https://get.juicelabs.co](https://get.juicelabs.co) | \
INSTALL_JUICE_TOKEN=[token] \
INSTALL_JUICE_POOL=telemetry \
sh -
```
For more details on the installer script, see the repository here: [Installer](https://github.com/Juice-Labs/juice-oss/tree/main/installer)


#### Docker and Docker Compose 
[Dockerfile](https://docs.juicelabs.co/docs/juice/user-guide/docker/docker-agent)

#### Kubernetes
[Helm Charts](https://github.com/Juice-Labs/juice-oss/tree/main/charts/agent)

### Step 4: View Your Data
Once the agent is running, it will begin collecting and sending data.

Navigate to the Metrics page in the admin interface.

You're all set! The agent will now run in the background and continue to collect telemetry. 🚀


## Getting Help
If you run into any issues during setup or have questions, don't hesitate to reach out.

Email: Send a detailed message to help@juicelabs.co.

Help Widget: Click the Feedback widget on the [**app.juicelabs.co**](https://app.juicelabs.co/) website.