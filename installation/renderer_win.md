## Renderer_Win Installation

Installation of Renderer_Win is quite simple as it is a simple server. Start one server per-client on a system with a GPU.

### Requirements
- [NVidia Video Codec SDK](https://developer.nvidia.com/nvidia-video-codec-sdk/download)

### Notes

Unfortunately, at this point in time, the starting of Renderer_Win is a manual process as there is no direct support for auto-starting on each clients connection. This is coming soon.

The purpose for a per-client instance of Renderer_Win is to keep the resources separate but also to ensure any issues from one client does not hurt other executing clients.
