## To upload

Here is a script for organize folders in published and unpublished by year. I made this while working as CM for a high school.

## Prerequisites

- To start, you need specific folder structure:

First folder `PUB_FOLDER` which been base folder for our structure follows to year folder follow for two folder "published" and "unpublished". Those two folder can have custom name.

![folder_structure](https://user-images.githubusercontent.com/48905875/159897228-d1d3292f-d1d9-4663-a1d9-beab093c8917.png)

We will need the "root" folder which is `PUB_FOLDER`, inside we have any folder with year for name and inside each year folder we have "published" and "unpublished" folder. Main process is move folder from "unpublished" folder to year folder with time between date we specify in code:
```bash
const mToPubl = new Date();
mToPubl.setDate(dayNow - 2);

const mToYear = new Date();
mToYear.setDate(dayNow + 2);
```
in this case will be 2 days after and before from date in folder name.

Folders inside "unpublished" and "published" folders must name like this: "MM-dd folder_name" being MM for month in 2 digit format and dd days in 2 digit format

**Examples:** 01-23 Name1 | 12-03 Name2 | 06-29 Name3

## Script track explication

To start, create a new folder in your Google Drive. Inside, create some folder with year (mandatory actual year), then inside create two more folder for "published" and "unpublished", those name can be custom.

No get the Folder ID from first folder you created (Root folder), and paste into Google Apps Script at `PUB_FOLDER` variable. Then, set the name for your folder into `F_PUBL` and `F_UNPL` variables.

# Future features
- Add notification with moves with possible turn on/off
