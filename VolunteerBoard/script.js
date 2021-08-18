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












/* TOP NAVIGATION BAR*/
/*
window.onscroll = function() {scrollFunction()};
*/
function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {   
    /*document.getElementById("nav").style.top = "-14px";
    document.getElementById("logoImage").style.top = "-7px";*/
    document.getElementById("nav").style.height = "65px";
  } 
  else {
    document.getElementById("nav").style.height = "93px";
  }
}
