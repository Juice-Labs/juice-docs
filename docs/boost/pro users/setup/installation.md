---
title:   'Installation'
sidebar_position: 2
---
# Installation

If you're new to Boost, contact your administrator to have a license allocated for you. You’ll receive an invitation via email with the subject: ***HP Boost Invitation***.

![Download links](/img/boost/download_links.png)

### Windows
1. Click on the download link for the Windows release on the Boost website.

2. Run the installer and follow the steps outlined in the installation wizard.


### Linux

#### Downloading the Boost for Linux requires a few more steps:

1. Click the download link for the Linux release on the Boost website. 

    :::note
    Depending on your Linux configuration, you may need to download the file on a different system and transfer it to your intended Linux client system. 
    :::
 
2. Unzip the downloaded file: 

    ```powershell
    tar -xf [boost_linux_release].tar 
    ```

3. Replace ***boost_linux_release.tar*** with the filename of the downloaded archive. 

The Boost executable will be selectable in the unzipped directory. 



## (Optional) Adding Boost to PATH 

#### To run Boost from any directory using the boost command: 

1. Open your shell's configuration file in a text editor:

    ```powershell
    nano ~/.bashrc
    ```

2. Add the following at the end of the file:

    ```powershell
    export PATH=$PATH:/path/to/boost_directory
    ```

3. Replace ***/path/to/boost_directory*** with the actual path to the directory containing the Boost executable. 

4. Save and exit the editor. 
    :::tip
    In nano, you can save and exit by pressing Ctrl+X, then Y, then Enter. 
    :::

5. Apply the changes to your current session: 

    ```powershell
    source ~/.bashrc 
    ```

6. After completing these steps, you should be able to run Boost by typing ***boost*** in any terminal. 


## Using the CLI Application and GPU Sharing 

For information on using the Boost CLI application and sharing GPU resources, please refer to the following sections of our documentation: 

- [The CLI Application Guide](/docs/boost/pro%20users/cli-app/cli-app.md)

- [Sharing a GPU](/docs/boost/pro%20users/cli-app/gpu-sharing.md)