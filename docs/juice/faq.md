---
title:  'FAQ'
position: 10
---

### How can I get help or provide feedback?

_Email [support@juicelabs.co](mailto:support@juicelabs.co)._

### What uses are supported by Juice across operating systems?

| Client \<--\> Server | Supported APIs / Use Cases |
|:---:|:---:|
|Ubuntu \<--\> Ubuntu|CUDA only (ML/AI/HPC)*|
|Ubuntu \<--\> Windows|CUDA only (ML/AI/HPC)*|
|Windows \<--\> Windows|CUDA + Graphics|
|Windows \<--\> Ubuntu|CUDA + Graphics|

_*Basically, we aren't targeting support for graphical applications running on Linux because there is very little demand for this - but we cover everything else. You CAN run graphical applications on Windows vs. a Linux server._

### What are the network requirements for operating Juice?

_Juice employs caching and compression to minimize the network traffic of any workload.  There are no fixed network requirements, but low bandwidth or high latency can cause applications to run more slowly than would be expected if running instead on a local PCIe-connected physical discrete GPU.  Of course, performance expectations will vary depending on the type of application.  Some examples of how expectations might relate to performance via Juice:_

- _To run a AAA game at 60FPS, a minimum of 150Mbps upload from the client to the server is generally required, with 300Mbps+ being ideal. Client-server latency should be &lt; 50ms._
- _To run an AI inference job like the ResNet and YOLO examples provided, where the result is not expected to return to the user instantly - there is no simple answer, as turnaround times will vary based on the profile of the data exchange between the application and the GPU combined with the bandwidth and latency between client and server._

### Can I run the Juice Client and Juice Server on the same machine just to try it out?

_Yes, this is called Loopback Mode.  Just point the client to_ `127.0.0.1`_.  Of course the machine will need a physical GPU to act as a Juice Server._

### Can I run the Juice Client inside a virtual machine or a container?

_Yes!  Take a look at the [instructions for Docker](./user-guide/docker/docker-client.md)._

### Can I run the Juice Server inside a virtual machine or a container?

_Yes, as long as the server software has access to the attached physical GPU._

### Does anything about the Juice Client and Juice Server operating environments need to match?

_No, you can run any combination of Client and Server (Windows or Ubuntu, physical machines or VMs or containers) - the Juice communication protocol between the Client and Server is always the same, so the systems do not need to match._

### I'm running out of disk space - how can I clear (part of) the Juice Server cache?

_In_ `JuiceServer-*\agent\juicecache` _, you will see a directory for each application you've tried via Juice. You can safely clear or remove these directories, and the cache will refill as needed through usage._

### I'm behind a proxy or firewall, which hosts should I add to my allow list?

_You will need to add the following domains to your allow list:_

#### Juice Agent and Client
```
https://electra.juicelabs.co
```
#### Juice Web Portal
```
https://login.juicelabs.co
https://app.juicelabs.co
```
#### Download software
```
https://juice-artifacts.s3.us-east-2.amazonaws.com
```

### Where do I find logs?

| OS | Client/Server | Log location |
|:---:|:---:|---|
|Linux|Client|`~/.config/Juice GPU/logs/client-<session-id>.log`|
|Linux|Server|`~/.config/Juice GPU/logs/agent-<session-id>.log`, `~/.config/Juice GPU/logs/agent_service.log`|
|Windows|Client|`%APPDATA%\Juice GPU\logs\client-<session-id>.log`|
|Windows|Server|`%APPDATA%\Juice GPU\logs\agent-<session-id>.log`, `%APPDATA%\Juice GPU\logs\agent_service.log`|

_*alternate locations configured using the `log-file` parameter on the command line_
