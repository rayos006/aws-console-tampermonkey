# aws-console-tampermonkey

## Install
1. Install [Tampermonkey](https://tampermonkey.net/)
2. Copy the [script](https://github.com/rayos006/aws-console-tampermonkey/blob/master/aws-sso-account-alert.js)
3. In your browser, click the Tampermonkey icon and select "Create a new script"
4. Paste script and hit save

Done!

# Scripts

## AWS SSO Account Alert (aws-sso-account-alert.js)
Tampermonkey script to let you know what account you're logged into and with what permission set. It will color code your AWS console's top bar based on a hash of your account name.

![Screenshot](https://github.com/rayos006/aws-console-tampermonkey/blob/master/images/sso-tampermonkey.png?raw=true)

### Note
This is intended to work with the AWS Single Sign-On setup where the logged in user shows as `AWSReservedSSO_RoleName_12345abcdef...`