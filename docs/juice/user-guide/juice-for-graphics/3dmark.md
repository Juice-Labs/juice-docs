---
title:  '3DMark'
sidebar_position: 2
---

# 3DMark

Run [3DMark](https://www.3dmark.com/) with Juice:

~~~cmd
juice run "C:\Program Files\UL\3DMark\3DMark.exe"
~~~

## 3DMark via Steam

You can run the Steam version of [3DMark](...) by providing the Steam App ID in a file named `steam_appid.txt` in the same directory as the 3DMark executable.  See the [Steam](steam.md) section for more details:

Run the Steam version of 3DMark with Juice by providing the Steam App ID for your Steam install of 3DMark in the `steam_appid.txt` file in 3DMark executable directory, e.g. `C:\Program Files (x86)\Steam\steamapps\common\3DMark\bin\x64\steam_appid.txt`:

~~~cmd
juice run "C:\Program Files (x86)\Steam\steamapps\common\3DMark\bin\x64\3DMark.exe"
~~~

## Active Paths

Activate `C:\Program Files\UL\3DMark` or `C:\Program Files (x86)\Steam\steamapps\common\3DMark` to run 3DMark through Juice automatically when a Juice session is current:

~~~cmd
juice session add-path "C:\Program Files\UL\3DMark"
~~~

Or for 3DMark installed through Steam:

~~~cmd
juice session add-path "C:\Program Files (x86)\Steam\steamapps\common\3DMark"
~~~
