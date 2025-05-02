---
title:  'Steam'
sidebar_position: 2
---

## Steam

Steam games and applications often require a running Steam client in order to run.  This can be tricky when launching from the command line with `juice run`.  That said many games do work and there's no harm in trying.  There are three methods you can use to launch Steam games with Juice:

1. Launch the game from the command line with `juice run`
2. Place the Steam App ID in `steam_appid.txt` and launch with `juice run`
3. Close and relaunch Steam with `juice run`

**Launch with `juice run`:**

Games that allow launching without Steam, e.g. Cyberpunk 2077, can be launched with `juice run` without any extra steps.  This is the easiest method if it works and you should try this first.

**Place Steam App ID in `steam_appid.txt` and launch with `juice run`:**

Games that report being unable to connect to the Steam client when run directly from the command line often run once their Steam App ID is placed in a file named `steam_appid.txt` in the same directory as the game executable.  A game's Steam App ID is the six digit number shown on the game's UPDATES page in the Steam library, click on the gears icon (Manage) > Properties > UPDATES.

**Close and relaunch Steam with `juice run`:**

Games that won't launch with Juice by the above two methods might work when Steam is launched with `juice run`.  Quit Steam completely and relaunch with `juice run`.  After this anything launched through Steam will use Juice.

~~~
juice run "C:\Program Files (x86)\Steam\steam.exe"
~~~

