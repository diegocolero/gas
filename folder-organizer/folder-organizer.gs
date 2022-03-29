const PUB_FOLDER = '';
const F_PUBL = '';
const F_UNPL = '';
const yearNow = new Date().getFullYear().toString();
const monthNow = new Date().getMonth() + 1;
const dayNow = new Date().getDate();

const mToPubl = new Date();
mToPubl.setDate(dayNow - 2); //Custom days to move

const mToYear = new Date();
mToYear.setDate(dayNow + 2); //Custom days to move

/**
 * Global action 
 */
function organizer() {
  const yearFolderId = getYearFolderId();
  if (!yearFolderId) {
    Logger.log('No exist year folder: "' + yearNow + '"');
    return;
  }
  const publicadasFolder = getPublicadasFolderF(yearFolderId);
  const pendientesFolderId = getPendientesFolderId(yearFolderId);
  const yearFolderF = getYearFolderF(yearFolderId);
  
  moveToPubl(yearFolderId, publicadasFolder);
  moveToUnpu(pendientesFolderId, yearFolderF);
}

/**
 * @return {string} Return Id from actual year folder
 */
function getYearFolderId() {
  var folders = DriveApp.getFolderById(PUB_FOLDER).getFolders();
  while (folders.hasNext()) {
    var folder = folders.next();
    if (folder.getName() == yearNow) {
      return folder.getId();
    }
  }
}

/**
 * @return {Folder} Return Folder from actual year folder
 */
function getYearFolderF() {
  var folders = DriveApp.getFolderById(PUB_FOLDER).getFolders();
  while (folders.hasNext()) {
    var folder = folders.next();
    if (folder.getName() == yearNow) {
      return folder;
    }
  }
}

function getPublicadasFolderId() {

}

/**
 * @param {string} Id from actual year folder
 * @return {Folder} Return Folder "published"
 */
function getPublicadasFolderF(yearFolderId) {
  var folders = DriveApp.getFolderById(yearFolderId).getFolders();
  while (folders.hasNext()) {
    var folder = folders.next();
    if (folder.getName() == F_PUBL) {
      return folder;
    }
  }
}

/**
 * @param {string} Id from actual year folder
 * @return {string} Return id folder "pendiente"
 */
function getPendientesFolderId(yearFolderId) {
  var folders = DriveApp.getFolderById(yearFolderId).getFolders();
  while (folders.hasNext()) {
    var folder = folders.next();
    if (folder.getName() == F_UNPL) {
      return folder.getId();
    }
  }
}

/**
 * @param {string} Id from year folder
 * @return {Folder} Folder
 */
function getPendientesFolderF(yearFolderId) {
  var folders = DriveApp.getFolderById(yearFolderId).getFolders();
  while (folders.hasNext()) {
    var folder = folders.next();
    if (folder.getName() == F_UNPL) {
      return folder;
    }
  }
}

/**
 * @param {string} Id folder
 * @param {Folder} Folder to move
 */
function moveToPubl(sFolderId, destinationFolder) {
  var folders = DriveApp.getFolderById(sFolderId).getFolders();
  while (folders.hasNext()) {
    var folder = folders.next();
    var dateF = folder.getName().split(" ");
    var dandm = dateF[0].split('-');
    var dateM = new Date(new Date().getFullYear(), parseInt(dandm[0]) - 1, parseInt(dandm[1]));
    if (dateM.getMonth() <= mToPubl.getMonth()) {
      if (dateM.getDate() < mToPubl.getDate()) {
        folder.moveTo(destinationFolder);
        Logger.log("Move to Published folder: " + folder.getName());
      }
    }
  }
}

/**
 * @param {string} Id folder
 * @param {Folder} Folder to move
 */
function moveToUnpu(sFolderId, destinationFolder) {
  var folders = DriveApp.getFolderById(sFolderId).getFolders();
  while (folders.hasNext()) {
    var folder = folders.next();
    var dateF = folder.getName().split(" ");
    var dandm = dateF[0].split('-');
    var dateM = new Date(new Date().getFullYear(), parseInt(dandm[0]) - 1, parseInt(dandm[1]));
    if (dateM.getMonth() <= mToYear.getMonth()) {
      if (dateM.getDate() < mToYear.getDate()) {
        folder.moveTo(destinationFolder);
        Logger.log("Move to year: " + folder.getName());
      }
    }
  }
}
