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
## Documentation

[Drive Activity API](https://developers.google.com/drive/activity/v2/reference/rest/v2/activity/driveactivity)

## Uses

I already have some script like this executed with GAS triggers. Normally set every 30 minutes
