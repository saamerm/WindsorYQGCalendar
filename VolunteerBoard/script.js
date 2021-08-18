async function onLoad(){
    /*
    purpose: collection of all things that need to be done onLoad (easier to write in html all as one function)
    */

    console.log("halo");
    createEventList();
}

async function getEventsPromise(){

  /*
  no params:

  purpose: returns resolved promise with the json array inside
  */


  //saamer's google script + sheet, will be the final version
  //const URL = "https://script.google.com/macros/s/AKfycbyHIaJZF69BACYAfZt0UlSwyG-lLPPYoNChNfmHBrnn1MAaL0huHQix1hkgQKrNHpuLWA/exec";


  //Anya's google script + sheet, actually editable so this is the rough copy
  const URL = "https://script.google.com/macros/s/AKfycbyQbfa1nKhp25NPZ1SQ10SPnX3fXq0TF0IzmBkcVCIiDdOlfBfv0NOeCvqxrfodWCm0/exec";

  return await fetch(URL)
      .then(function(res){
          console.log("happening");
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
    let allevents = await getEventsPromise() //usable array
    console.log(allevents)


    //let events = allevents.filter(filterEvents);//removing events that are passed
    //events.sort(compareTwoEvents);//sort by starting date


    //remove loading spinners
    /*
    let allSpinners = document.getElementsByClassName("spinner");
    for(let i = 0; i<allSpinners.length; i++){
        allSpinners[i].style.display = "none";
    }
    */

    /*
    for(let i = 0; i<allevents.length; i++){
        document.getElementById("container-events").appendChild(createOneListing(allevents[i]));
    }
    */

    

}












/* TOP NAVIGATION BAR*/

window.onscroll = function() {scrollFunction()};

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
