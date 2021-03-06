/*
notes

asyncronous is weird but also necessary for website experience

cannot both do async and sync at the same time

using javascript promises to make request with fetch
this took alot longer to figure out than i expected
*/



async function onLoad(){

    

    /*
    purpose: collection of all things that need to be done onLoad (easier to write in html all as one function)
    */



    updateDate();
    createEventList();
}

async function getEventsPromise(){

    /*
    no params:

    purpose: returns resolved promise with the json array inside
    */


    //updated to restaurant deals
    const URL = "https://script.google.com/macros/s/AKfycbzkpfSd0jZMhmUKZS52eTMSQV3NjFal7LX8eLByZOKUQv49nRmIQJWttMdjw0YE-BM9SQ/exec";


    

    return await fetch(URL)
        .then(function(res){
            return res.json();
        })
        /*
        .then(function(data){
            console.log(data);
        })
        */
        .catch(function(){
            console.log("Fetch promise rejected")
        })
}



function compareTwoEvents(eva,evb){
    /* 
    purpose: 
    - used for sorting the array of events by starting date
    


    params: two events
    */
}

function filterEvents(ev){
    /*
    purpose
    - do not display events that are passed i.e. remove passed events from event list
    - returns true if event should stay, false if event should be removed
    - callback function

    params
    - single event, this is automatically called back in Array.filter()
    */


    //no ending date = offer never expires
    if (ev["Ending Date"] === ""){
        return true;
    }

    let preciseNow = new Date(Date.now());

    let preciseEnd;

    //code to get the very last moment that the offer is available below
    let dayEnd = new Date(ev['Ending Date']);
    let timeEnd = new Date(ev['Ending Time']);

    preciseEnd = new Date(dateEnd.getFullYear(), dateEnd.getMonth(), dateEnd.getDate(), timeEnd.getHours(), timeEnd.getMinutes());



    return preciseEnd < preciseNow;//true if the time has not elapsed yet
    
    




    
    
}


async function createEventList(){
    let allevents = await getEventsPromise() //usable array

    /*
    let events = allevents.filter(filterEvents);//removing events that are passed
    events.sort(compareTwoEvents);//sort by starting date
    */


    let events = allevents;

    //remove loading spinners
    let allSpinners = document.getElementsByClassName("spinner");
    for(let i = 0; i<allSpinners.length; i++){
        allSpinners[i].style.display = "none";
    }

    for(let i = 0; i<events.length; i++){
        document.getElementById("container-events").innerHTML += createOneListing(events[i]);
    }

}





function createOneListing(data){
    /*
    params: json object that represents the info for each

    purpose: return string of the element with all of the information, to be later added to the innerhtml of the event list
                all listings are styled the same i.e. same classes and stuff

    */

    //template for event listing

    let titleString = `${data['Name of Discount']} - ${data['Name of Restaurant']}`;

    //does a link exist?
    let query = encodeURIComponent(`${data['Address']}, ${data['City']}, ${data['Province']}`);

    //console.log(`https://www.google.com/maps/place/${query}`);

    
    let linkString = data['Website'] === "" ? 
    `<button class = "visit-button" style = "visibility: visible;" onclick=" window.open('https://www.google.com/maps/place/${query}','_blank')">VISIT</button>` 
    : 
    `<button class = "visit-button" style = "visibility: visible;" onclick=" window.open('${data['Website']}','_blank')">VISIT</button>` ;

    //https://www.google.com/maps/search/?api=1&parameters
    

    /*
    let linkString = data['Website'] === "" ? 
    ""
    : 
    `<button class = "visit-button" style = "visibility: visible;" onclick=" window.open('${data['Website']}','_blank')">VISIT</button>` ;
    */

    


    //string for first row of text
    let validityString = `Valid all day`;//default for when there is no submission for starting and ending time

    if(data['Starting Time'] !== "" && data['Ending Time'] !== ""){
        //both exist
        const timeOps = {hour: 'numeric', minute: 'numeric', hour12: true};
        let startTime = new Date(data['Starting Time']);
        let endTime = new Date(data['Ending Time']);

        validityString = `Valid between ${startTime.toLocaleTimeString("en-US", timeOps)} - ${endTime.toLocaleTimeString('en-US', timeOps)}`;
    }
    else if (data['Starting Time'] === "" && data['Ending Time'] !== ""){
        //only ending time
        const timeOps = {hour: 'numeric', minute: 'numeric', hour12: true};
        let endTime = new Date(data['Ending Time']);

        validityString = `Valid until ${endTime.toLocaleTimeString('en-US', timeOps)}`;
    }
    else if (data['Starting Time'] !== "" && data['Ending Time'] === ""){
        const timeOps = {hour: 'numeric', minute: 'numeric', hour12: true};
        let startTime = new Date(data['Starting Time']);

        validityString = `Valid starting from ${startTime.toLocaleTimeString("en-US", timeOps)}`;
        
    }





    //string for the second row of text
    let expiryString = ``;
    
    //does an expiry date exist
    if(data['Ending Date'] === ""){
        expiryString += "No expiry date"
    }
    else{
        let endingDate = new Date(data['Ending Date']);
        expiryString += `Offer valid until ${endingDate.getDate()} ${endingDate.toLocaleString("en-US", {month: "long"})} ${endingDate.getFullYear()}`;
    }

    //does a coupon code exist?
    expiryString += data['Coupon Code'] === "" ? " | No coupon needed" : ` | Use coupon code: ${data['Coupon Code']}`




    let result = 
    `
    <div class = "event">
        <h4 class = "event-title">${titleString}</h4>
        <div class = "event-content">
            <p> <img src="Calendar_Icon.png" alt="Calendar Icon" title="Calendar Icon">${validityString}</p>
            <p><img src="Info_Icon.png" alt="Information Icon" title="Information Icon">${expiryString}</p>
            <p><img src="Location_Icon.png" alt="Location Icon" title="Location Icon">${data['Address']}, ${data['City']}, ${data['Province']}</p>
        </div>

        ${linkString}      
        
    </div> 
    `;

    return result;



 
}


function updateDate(){
    /*
    purpose: take a specific header in the html and change its text to be updated

    */

    const dayOps = {year: 'numeric', month: 'long', day: 'numeric'};//format "setttings" for toLocale__String() for dates


    let element = document.getElementById("date-header");
    let now = new Date(Date.now());///js date object

    element.innerHTML = now.toLocaleDateString("en-US", dayOps);
    
}






