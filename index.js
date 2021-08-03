/*
notes

asyncronous is weird but also necessary for website experience

cannot both do async and sync at the same time

using javascript promises to make request with fetch
this took alot longer to figure out than i expected
*/

async function getEventsPromise(){

    /*
    no params:

    purpose: returns resolved promise with the json array inside
    */

    //const URL = "https://script.google.com/macros/s/AKfycbylYZAjhwYRLKAo0IdgElCMgo9aIr5CxYV4qN8YweehvaZKqGRI8Bg__tZzMgSb77PpUg/exec";
    const URL = "https://script.google.com/macros/s/AKfycbxyAZKxb-4i8i95ajBPgvfde-iorPBbgQHbbtHJeqyQQ2wDPuQgimKe3e2VC4AOCziWkQ/exec";

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


async function createEventList(){
    let events = await getEventsPromise() //actual array now

    for(let i = 0; i<events.length; i++){
        document.getElementById("container-events").appendChild(createOneListing(events[i]));
    }

}




//icons used in each event
let timeIcon = document.createElement("img");
timeIcon.setAttribute("src", "Calendar_Icon.png");
timeIcon.setAttribute("alt", "Calendar Icon");
timeIcon.setAttribute("title", "Calendar Icon");

let infoIcon = document.createElement("img");
infoIcon.setAttribute("src", "Info_Icon.png");
infoIcon.setAttribute("alt", "Info Icon");
infoIcon.setAttribute("title", "Info Icon.png");


let locationIcon = document.createElement("img");
locationIcon.setAttribute("src", "Location_Icon.png");
locationIcon.setAttribute("alt", "Location Icon");
locationIcon.setAttribute("title", "Location Icon");

;




function createOneListing(data){
    /*
    params: json object that represents the info for each

    purpose: return the element with all of the information, to be later put into the html using DOM methods
                all listings are styled the same i.e. same classes and stuff

    */


    //icons used in each event
    let timeIcon = document.createElement("img");
    timeIcon.setAttribute("src", "Calendar_Icon.png");
    timeIcon.setAttribute("alt", "Calendar Icon");
    timeIcon.setAttribute("title", "Calendar Icon");

    let infoIcon = document.createElement("img");
    infoIcon.setAttribute("src", "Info_Icon.png");
    infoIcon.setAttribute("alt", "Info Icon");
    infoIcon.setAttribute("title", "Info Icon.png");


    let locationIcon = document.createElement("img");
    locationIcon.setAttribute("src", "Location_Icon.png");
    locationIcon.setAttribute("alt", "Location Icon");
    locationIcon.setAttribute("title", "Location Icon");



    //big container containing everything 
    let outershell = document.createElement("div");
    outershell.classList.add("event");

    //small container with info about the event
    let eventcontent = document.createElement("div");
    eventcontent.classList.add("event-content");
    
    //name of event
    let title = document.createElement("h4");
    title.innerHTML = data["name"];
    eventcontent.appendChild(title);

    

    //time frame
    let dateStart = new Date(data["dateStart"]);
    let timeStart = new Date(data["timeStart"]);
    let dateEnd = new Date(data["dateEnd"]);
    let timeEnd = new Date(data["timeEnd"]);

    let timeframe = document.createElement("p");
    timeframe.appendChild(timeIcon);

    //for toLocale___String formatting
    const timeOps = {hour: 'numeric', minute: 'numeric', hour12: true};
    const dayOps = {year: 'numeric', month: 'long', day: 'numeric'};

    //single date event
    if (data["dateStart"] === data["dateEnd"] || data["dateEnd"] === ""){
        timeframe.appendChild(document.createTextNode(
            ` ${timeStart.toLocaleTimeString("en-US",timeOps)} - ${timeEnd.toLocaleTimeString("en-US",timeOps)} | ${dateStart.toLocaleDateString("en-US", dayOps)}`
            ));
    }
    else{
        timeframe.appendChild(document.createTextNode(
            ` ${timeStart.toLocaleTimeString("en-US",timeOps)} ${dateStart.toLocaleDateString("en-US", dayOps)} - ${timeEnd.toLocaleTimeString("en-US",timeOps)} ${dateEnd.toLocaleDateString("en-US", dayOps)}`
            ));
    }

    eventcontent.appendChild(timeframe);


    //location or link
    let place = document.createElement("p");
    place.appendChild(locationIcon);

    //online
    if (data["isOnline"] === "Online"){
        place.appendChild(document.createTextNode(` ${data["link"]}`))
    }
    else{
        place.appendChild(document.createTextNode(` ${data["address"]} ${data["city"]}, ${data["province"]}, ${data["postalCode"]}`))
    }

    eventcontent.appendChild(place);

    




    


    //small container with visiting button
    let visitbutton = document.createElement("button");
    visitbutton.appendChild(document.createTextNode("Visit"));
    visitbutton.classList.add("visit-button");

    if (data["link"] === ""){
        //no link
        visitbutton.style.visibility = "hidden";
    }
    else{
        //has link
        visitbutton.style.visibility = "visible";
        visitbutton.setAttribute("onclick", `window.open('${data["link"]}','_blank')`);
    }


    outershell.appendChild(eventcontent);
    outershell.appendChild(visitbutton);


    return outershell;
}


//createEventList()






