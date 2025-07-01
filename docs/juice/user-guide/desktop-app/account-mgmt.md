---
title: 'Account Management'
sidebar_position: 4
---



# Account Management

Selecting **Account** in sidebar navigation lets users view and edit their account settings.

---

## View Account

This menu displays your username, email address, the application version, and information about your current license. You can also use this menu to sign out of the application.

---

## Settings

Users can adjust their Juice settings from the **Settings** section to further customize their experience.


### Log Level
This setting decides the level of detail that Juice adds to the log file.

:::caution Important
Leave this setting on **Error** unless instructed otherwise by a support representative.
:::

### Log File Directory
This shows the location on your computer where the log file is saved. You may need this for resolving an issue with your administrator or with support.

### Automatic GPU Return
This setting helps manage GPU resources efficiently. It defines the period of inactivity after which an active session will automatically close. Once the session ends, the GPU is returned to the pool, making it available for other users to connect.

You can select a specific time limit from the dropdown menu. To maintain a persistent connection that never times out, choose Never.

### Disable Cache
Check this box if you would like your applications to always send their data to the GPU, even if that data has previously been sent.

![Settings](/img/juice/settings.png)

### Cache Size Limit
This setting allows you to define the maximum amount of disk space on the host machine to be allocated for caching shared data. Use the dropdown menu to select the desired Cache Size Limit.

:::caution Restart Required
Changes to the cache size will only take effect after you restart the sharing agent from the Share GPUs section.
:::

### Step-by-Step Tutorial
Click **Rerun** to restart the interactive tutorial you were shown when you first launched the application.