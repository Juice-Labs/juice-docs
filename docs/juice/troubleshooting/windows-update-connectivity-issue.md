---
title: 'Troubleshooting: Connectivity Issues After Windows Update'
description: 'Resolving Juice client connection failures to remote GPUs caused by specific Windows updates (KB5063709, KB5063875, KB5063878).'
---

# Troubleshooting Connectivity Issues After Windows Update

If you are suddenly unable to connect to a remote GPU and start a session using the Juice client, a recent Windows update may be the cause.

---

## Symptoms

-   The Juice client fails to establish a connection to a remote GPU.
-   Sessions do not start, often with a timeout or network-related error.
-   These issues began occurring after a recent Windows update.

---

## Cause

Specific Windows updates have been identified as causing network connectivity problems that interfere with the Juice client. The known problematic updates are:

-   `KB5063709`
-   `KB5063875`
-   `KB5063878`

---

## Resolution

To restore connectivity, you must uninstall the problematic update from your system.

:::warning Important

Uninstalling Windows security updates may expose your system to vulnerabilities. We recommend pausing future updates temporarily until a permanent fix is released and reinstalling them once the connectivity issue is resolved by Microsoft.

:::

### How to Uninstall a Windows Update

1.  Press **Windows Key + I** to open the **Settings** app.
2.  Navigate to **Windows Update** > **Update history**.
3.  Scroll to the bottom and click on **Uninstall updates**.
4.  In the list, locate the update you want to remove (e.g., `KB5063709`).
5.  Select it and click **Uninstall**.
6.  Restart your computer after the uninstallation is complete.

For more detailed instructions, please refer to the official Microsoft support page: [How to uninstall a Windows update](https://support.microsoft.com/en-us/windows/how-to-uninstall-a-windows-update-c77b8f9b-e4dc-4e9f-a803-fdec12e59fb0).

After restarting, please try connecting with the Juice client again. Your connectivity should now be restored.