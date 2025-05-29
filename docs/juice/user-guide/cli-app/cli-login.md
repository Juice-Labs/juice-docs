---
title:   'CLI App Login'
sidebar_position: 2
---
# CLI App Login

CLI commands are downloaded to your machine when you download Juice. To initiate the CLI app, simply open a terminal window from your device's application manager. 

#### To log in: 

1. Run the following command: 
    ```powershell
    ./juice login 
    ```

2. If you're not redirected to a browser window, copy the link that populates and paste it into your browser. Then, log in with your JuiceID. 

3. Wait for confirmation before closing your browser window. 

Once your login is confirmed, the CLI will update your status to *logged in*. If you need more persistent access to Juice for scriptable or automated projects, you can also use an M2M token to log in.  

#### To log in with a machine-to-machine (m2m) token:

1. Run the following command to generate the token: 
    ```powershell
    ./juice m2m create -d <token name of your choice>
    ```

2. Save the token in a secure private location.  

3. To log in, run the command: 
    ```powershell
    ./juice login -t <token>
    ```

:::tip
Use `m2m list` to show available tokens. 

To destroy a token use `m2m remove <token id>`.
To retrieve `<token id>`: `run juice m2m list`
:::
    
