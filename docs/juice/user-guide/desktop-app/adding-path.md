---
title: 'Adding a Path'
sidebar_position: 3
---

# Adding a Path

To run an application from the Juice desktop application on the client side, first configure it by adding its path to the **Connect GPU** section. The Juice desktop application will bridge the remote GPU into any application path you specify.

:::info Example
If the path `C:\AI` is added to the **Connect GPU** section, any application that launches from that folder or its subfolders will leverage the connected remote GPU.
:::
![Add Paths](/img/juice/connect_gpu_nopaths.png)


## Auto-Detecting Paths 🕵️

Juice can automatically find common supported application paths on your machine.

1.  Click **Edit** in the **Paths** panel of the **Connect GPU** section.
2.  Click **Auto-Detect** to open the scan dialog and begin the machine scan.
3.  Select the paths you would like added to Juice and click **Add**.

![Auto-Detect Paths](/img/juice/connect_gpu_paths_autodetect.png)


## Manually Adding a Path ✍️

1.  Click **Edit** in the **Paths** panel of the **Connect GPU** section.
2.  Add a specific application or entire folder by entering the file path in the space provided. Alternatively, click the folder icon to browse for the path.
3.  Click **Add** to save the path.

![Manually Add Paths](/img/juice/connect_gpu_path_manual.png)
