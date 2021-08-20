async function onLoad(){
    /*
    purpose: collection of all things that need to be done onLoad (easier to write in html all as one function)
    */

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


    
     

}




/* TOP NAVIGATION BAR*/

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 21 || document.documentElement.scrollTop > 21) {   
    document.getElementById("nav").style.top = "-14px";
    document.getElementById("logoImage").style.top = "1px";
    //document.getElementById("nav").style.height = "65px";

    //document.getElementById("nav").style.padding = "0px";

    //console.log("a")
  } 
  
  else {
    document.getElementById("nav").style.top = "0px";
    document.getElementById("logoImage").style.top = "0px";

    //document.getElementById("nav").style.height = "93px";

    //document.getElementById("nav").style.padding = "50px 0px 50px 0px";
    //console.log("b")
  }
}