async function onLoad(){
    /*
    purpose: collection of all things that need to be done onLoad (easier to write in html all as one function)
    */

    createList();
}

async function createEventList(){
    let allevents = await getEventsPromise() //usable array


    //let events = allevents.filter(filterEvents);//removing events that are passed
    //events.sort(compareTwoEvents);//sort by starting date


    //remove loading spinners
    let allSpinners = document.getElementsByClassName("spinner");
    for(let i = 0; i<allSpinners.length; i++){
        allSpinners[i].style.display = "none";
    }

    for(let i = 0; i<events.length; i++){
        document.getElementById("container-events").appendChild(createOneListing(events[i]));
    }

}