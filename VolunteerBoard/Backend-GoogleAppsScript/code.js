

//id of test sheet, switch to official sheet later
const sheetID = "1hHW5u7QfYhbyy2Q25foPcyApy5HfqGCn_jY1kOLKqQs";



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


  let sheet = SpreadsheetApp.openById(sheetID).getSheetByName("Form Responses 1");
  let lastLoop = sheet.getLastRow();
  
  let result = [];

  for(let i = 2; i<= lastLoop; i++){
    result[i-2] = rowJSON(i)
  }
  
  console.log(result)
  return result;
}


const attributeNames = ["Timestamp", "Title of Event / Position", "Organization Name","Description of the Role and Requirements","Add an Image", "Webpage Link", "Address", "City", "Postal Code", "Contact Email",  "Contact Phone Number" , "Is this position in person or online?"];


function rowJSON(rowNumber){
  let sheet = SpreadsheetApp.openById(sheetID).getSheetByName("Form Responses 1");
  let rowRange = sheet.getRange(rowNumber, 1, 1, 12);

  //method getRange(row, column, numRows, numColumns)


  let valArray = rowRange.getValues(); // get all the information from a row
  // function gives a 2d array with [row][col] relative to top left positioning, this is a single row so only [0][col] is in range

  let result = {};

  for(let i = 0; i<valArray[0].length; i++){  // loop to give us a single list
      result[attributeNames[i]] = valArray[0][i]; 
  }


  return result; // returns entire list of all the values in the row

}


