## Juice Client Configuration

Once the driver is installed, the configuration for connecting to a specific GPU host comes from a config file. The config file **(always named juice.cfg)** can live in two locations and is checked in the following order:

1. The working directory of the game/application
2. C:\Program Files\Juice\juice.cfg

### Options

juice.cfg is a very simple text file (subject to change in the future) with each option delimited by a space.

> e.g. \<option1\>\<value1\> \<option2\>\<value2\>

**h\<ip address\>**
: The GPU host IP address.

**p\<port\>**
: The GPU host port. Default 12345

So if the IP address of your GPU host were `123.45.678.90`, your config file would contain exactly:

`h123.45.678.90 p12345`
