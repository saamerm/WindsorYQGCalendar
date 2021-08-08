// Official Sheet ID
const sheetID = "1capzJ-WkHkTP-3ygHCToyhQnBPLYmVfglqEUoHPt08Q";

// Duplicate Sheet ID with Andy
// const sheetID = "1g50flJoVjRA-1O-IDto8a2qM1xOis342CPJ0doRr2js";

//GET method

function doGet(){
  var result = processGetRequest();


  return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}




//private helper functions
function processGetRequest(){

  /*
  purpose: goes through all data in spreadsheet and return JSON that works
  */


  let sheet = SpreadsheetApp.openById(sheetID).getSheetByName("Form Responses");


  let lastRow = sheet.getLastRow();

  
  let result = [];

  for(let i = 2; i<= lastRow; i++){
    result[i-2] = rowToObj(i)
  }
  
  //console.log(JSON.stringify(result));
  return result;
}




const attributeNames = ["timestamp", "email", "name","description","link", "dateStart", "timeStart", "dateEnd", "timeEnd", "isOnline",  "address", "postalCode", "city", "province", "country"];


function rowToObj(rowNum){
  /*
  purpose: convert a row into a JS object. Each row represents a different event that was submitted

  params: integer corresponding to row number
  */

  //this may be passed into function instead
  let sheet = SpreadsheetApp.openById(sheetID).getSheetByName("Form Responses");
  let rowRange = sheet.getRange(rowNum, 1, 1, 15);

   
  /*
  2d array with [row][col] relative to top left positioning, this is a single row so only [0][col] is in range

  all time related things are JS Date objects, which is difficult to use in JSON

  
  */
  let valArray = rowRange.getValues();

  let result = {};

  for(let i = 0; i<15; i++){   
      result[attributeNames[i]] = valArray[0][i];   
  }


  return result;
}


/*
ADD TRIGGER:
- left side of script editor --> click clock icon
- click big button "add trigger"
- "Choose which function to run" --> deleteOldRows()
- "choose which deployment should run" --> head (means current project code)
- "Select event source" --> Time-driven
- "Select type of time based trigger" --> Day timer
- "Select time of day" --> any time there are little users, preferable midnight - 1am because thats a new day

*/



function deleteOldRows(){


  /*
  purpose: loop through every event listing (row) and remove the row if the event has already passed

  details:
  - iterate backwards to now mess up indexes when deleting
  - the date objects for dateStart/End and timeStart/End are not consistent, 
  have to create a new date object with date information from former and time information from latter (if exists)

  - dateEnd is optional to fill out (if blank then its a single day event, corresponding to dateStart day)
  - timeEnd is required to fill out(all event end at a time)

  */

  let now = new Date(Date.now());
  let sheet = SpreadsheetApp.openById(sheetID).getSheetByName("Form Responses");


  const dateStartCol = 5;
  const timeStartCol = 6;
  const dateEndCol = 7;
  const timeEndCol = 8;


  for(let i = sheet.getLastRow(); i >=2; i--){

    let vals = sheet.getRange(i, 1, 1, 15).getValues();//2d array of current row, only one row though so access with rowRange[0][col]

    let now = new Date(Date.now());

    //no end date or same day event
    if (!vals[0][dateEndCol] || vals[0][dateStartCol].getTime() === vals[0][dateEndCol].getTime()){
      let preciseEnd = new Date(
      vals[0][dateStartCol].getFullYear(), vals[0][dateStartCol].getMonth(), vals[0][dateStartCol].getDate(),
       vals[0][timeEndCol].getHours(), vals[0][timeEndCol].getMinutes());

       //the end is before now ie event passed
       if (preciseEnd < now){
         sheet.deleteRow(i);
       }
      
    }
    //multiday event
    else{
      let preciseEnd = new Date(
      vals[0][dateEndCol].getFullYear(), vals[0][dateEndCol].getMonth(), vals[0][dateEndCol].getDate(),
       vals[0][timeEndCol].getHours(), vals[0][timeEndCol].getMinutes());

      //the end is before now ie event passed
      if (preciseEnd < now){
        sheet.deleteRow(i);
      }

    }
  }
}

// https://script.google.com/macros/s/AKfycbyHIaJZF69BACYAfZt0UlSwyG-lLPPYoNChNfmHBrnn1MAaL0huHQix1hkgQKrNHpuLWA/exec