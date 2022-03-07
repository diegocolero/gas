# Activity Checker - Google Drive

Little project where you can check activities in your folders, sending you a mail with all changes.



## Environment Variables

To run this project, you will need to add the following environment variables at start your script

`FOLDER_ID` Folder ID / Too can use Shared Drivers if you are using some GSuite Edition.
To get that just get ID from URL 

Example: https://drive.google.com/drive/folders/ `00AA11BB22CC33dd44Ee`

`ADMIN_MAIL` Email for notifications
## Installation / Prerequisites

Do you need a Google Account and follow Google instructions about activate and integrate Drive Activity API in your script.

All info about it can found here [Get Started](https://developers.google.com/drive/activity/v2#getting_started)

**Important**
First time you execute this script you need execute `setExec` function for set actual time.

![image](https://user-images.githubusercontent.com/48905875/156349270-9d8200d8-3c42-4a8e-93cf-2921fb1016fb.png)

## Documentation

[Drive Activity API](https://developers.google.com/drive/activity/v2/reference/rest/v2/activity/driveactivity)
[Class MailAPP](https://developers.google.com/apps-script/reference/mail/mail-app)

## Uses

I already have some script like this executed with GAS triggers. Normally set every 30 minutes but you can set every minute.
