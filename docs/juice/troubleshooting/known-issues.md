---
title:   'Known Issues'
sidebar_position: 12
---
# Known Issues

- The official Docker agent advertises `JUICE_HOST_IP` and listens on a published UDP port (default `7865`). Host networking is optional, not required. Clients must be able to reach the advertised address. WSL sharing GPUs has the same limitations as Docker WSL and is subnetted with the host machine.

- DX11/DX12/OpenGL/Vulkan are the only supported graphics APIs. Most graphical software should work out of the box. Agent hosts need an NVIDIA driver 535 or greater and a CUDA driver from 12.2 through 13.0. The official Docker agent image is built on CUDA 13. PyTorch and TensorFlow binaries also work out of the box. 

- Resolutions beyond 4K may have questionable performance due to video encoder/decoder limitations. This will be addressed with a software encoder in the future. 

- Graphics applications rendering significantly above 60 FPS (i.e. benchmarks like FurMark) will be limited by video encoder capabilities rather than GPU rendering. This may result in degraded performance at very high frame rates compared to native execution. 

- Applications that are being run with juice will not fall back to a local GPU on the client when the remote GPU disconnects.  

- Using a log level that's not ERROR on the CLI may severely degrade performance. 

- Client applications that leverage a remote GPU for juice may take a few minutes to close when the GPU is disconnected, depending on the application. This can cause confusion if another GPU is connected in the meantime.

- Running the juice login command from a Linux shell may trigger an output from the browser launching (e.x. "Failed to load module 'canberra-gtk-module'", etc.). You can safely disregard this output.
