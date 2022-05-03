/**
 * Global variables
 * Set up with your IDs, Names and Custom config
 */
const FOLDER_ID = '';
const ADMIN_MAIL= '';

/**
 * Lists all activies for RRSS Santa Marta.
 */
function listDriveActivity() {
  const lastExec = getLastExec();
  var body = "";
  const request = {
    filter: 'time >= "' + lastExec + '" AND detail.action_detail_case:(CREATE EDIT)',
    ancestorName: 'items/' + FOLDER_ID
    // Use other parameter here if needed.
  };
  try {
    // Activity.query method is used Query past activity in Google Drive.
    const response = DriveActivity.Activity.query(request);
    const activities = response.activities;
    if (!activities || activities.length === 0) {
      Logger.log('No activity.');
      return;
    }
    Logger.log('Found activity:');
    body += HtmlService.createHtmlOutputFromFile("message_header")
                       .getContent();
    for (let i = 0; i < activities.length; i++) {
      body += "<tr>"
      const activity = activities[i];
      // get time information of activity.
      const time = getTimeInfo(activity);
      // get the action details/information
      const actors = activity.actors.map(getActorInfo);
      // get target information of activity.
      const targets = activity.targets.map(getTargetInfo);
      // print the time,actor,action and targets of drive activity.
      const type = getOneOf(activity.primaryActionDetail);
      //body += "Fecha: "+time+" - Acción: "+type+"\t Archivo: "+targets[0].split("driveItem:")[1]+"\n";
      body += "<td>" + time + "</td><td>" + type + "</td><td>" + targets[0].split("\"")[1] + "</td>"
      body += "</tr>"
    }
    body += HtmlService.createHtmlOutputFromFile("message_footer")
                       .getContent();
    setExec();
    sendEmail(body);
  } catch (err) {
    // TODO (developer) - Handle error from drive activity API
    Logger.log('Failed with an error %s', err.message);
  }
}

/**
 * @param {object} object
 * @return {string}  Returns the name of a set property in an object, or else "unknown".
 */
function getOneOf(object) {
  for (const key in object) {
    return key;
  }
  return 'unknown';
}

/**
 * @param {object} activity Activity object.
 * @return {string} Returns a time associated with an activity.
 */
function getTimeInfo(activity) {
  if ('timestamp' in activity) {
    return activity.timestamp;
  }
  if ('timeRange' in activity) {
    return activity.timeRange.endTime;
  }
  return 'unknown';
}

/**
 * @param {object} actionDetail The primary action details of the activity.
 * @return {string} Returns the type of action.
 */
function getActionInfo(actionDetail) {
  return getOneOf(actionDetail);
}

/**
 * @param {object} user The User object.
 * @return {string}  Returns user information, or the type of user if not a known user.
 */
function getUserInfo(user) {
  if ('knownUser' in user) {
    const knownUser = user.knownUser;
    const isMe = knownUser.isCurrentUser || false;
    return isMe ? 'people/me' : knownUser.personName;
  }
  return getOneOf(user);
}

/**
 * @param {object} actor The Actor object.
 * @return {string} Returns actor information, or the type of actor if not a user.
 */
function getActorInfo(actor) {
  if ('user' in actor) {
    return getUserInfo(actor.user);
  }
  return getOneOf(actor);
}

/**
 * @param {object} target The Target object.
 * @return {string} Returns the type of a target and an associated title.
 */
function getTargetInfo(target) {
  if ('driveItem' in target) {
    const title = target.driveItem.title || 'unknown';
    return 'driveItem:"' + title + '"';
  }
  if ('drive' in target) {
    const title = target.drive.title || 'unknown';
    return 'drive:"' + title + '"';
  }
  if ('fileComment' in target) {
    const parent = target.fileComment.parent || {};
    const title = parent.title || 'unknown';
    return 'fileComment:"' + title + '"';
  }
  return getOneOf(target) + ':unknown';
}

/**
 * @return {string} Returns date from script propierties
 */
function getLastExec() {
  var properties = PropertiesService.getScriptProperties();
  var lastExec = properties.getProperty('lastExec');
  return lastExec;
}

/**
 * @return {string} Set date in script propierties
 */
function setExec() {
  var date = new Date().toISOString();
  var properties = PropertiesService.getScriptProperties();
  properties.setProperty('lastExec', date);
}

/**
 * Send email to admin
 */
function sendEmail(body) {
  MailApp.sendEmail(ADMIN_MAIL, 'Recent Activity', body, { noReply: true });
}
