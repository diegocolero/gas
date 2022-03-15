const sheet = '';
const SS = SpreadsheetApp.openById(sheet);
const ui = SpreadsheetApp.getUi();
const sheetI = SS.getSheetByName('items');
const sheetS = SS.getSheetByName('separator');

function onOpen(e) {
  SpreadsheetApp.getUi()
      .createMenu('Items to separator')
      .addItem('Apply', 'setSeparator')
      .addToUi();
}

function getSeparator() {
  var item;
  item = sheetI.getRange(2, 2).getValues();
  return item[0][0];
}

function getItems() {
  var items;
  if(sheetI.getLastRow() <= 2){
    return null
  }
  items = sheetI.getRange(2, 1, sheetI.getLastRow()-1).getValues();
  return items;
}

function setSeparator() {
  var items = getItems();
  if (items == null){
    alertError('No items (2 or more items needed)');
    return
  }
  var separator = getSeparator();
  if (separator == ''){
    alertError('No separator set')
    return
  }
  var ret = '';
  for (var i = 0; i < items.length; i++) {
    if (i != items.length-1) {
      ret += items[i] + separator;
    } else {
      ret += items[i];
    }
  }
  sheetS.clear()
  sheetS.appendRow([ret]);
}

function alertError(error){
  ui.alert(error)
}
