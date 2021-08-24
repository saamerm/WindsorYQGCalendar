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
    let allevents = await getEventsPromise() //usable array of all event objects
    console.log(allevents)

    for(let i = 0; i<allevents.length; i++){
      document.getElementById("event-list").innerHTML += createOneListing(allevents[i], `event-number${i}`);
    }

    //console.log('asda')
    

}




//TEMPLATE OF JSON
/*

Add an Image:'https://drive.google.com/open?id=1OR1_Nl6zWUFwrRCD-ZZ-KYxaX0kZDLgE'
Address:'Test Adress'
City:'Test City'
Contact Email:'TestEmail@gmail.com'
Contact Phone Number:'Test Number'
Description of the Role and Requirements:'Test Description of the Role and Requirements'
Is this position in person or online?: 'In Person' OR 'Online'
Organization Name:'Test Organization Name '
Postal Code:'Test Postal Code'
Timestamp:'2021-08-12T16:39:22.867Z'
Title of Event / Position:'Test Title'
Webpage Link:'https://thefirstprototype.com/windsor-ontario-yqg-events-calendar/'
*/


/*
`
<div class="accordion-item">
    <div class="accordion-header"  >
        <div class=" accordion-button collapsed" data-bs-toggle="collapse" href="#${id}" role="button"  aria-expanded="false" aria-controls="${id}" id="heading-${id}">



            <!-- formatting that is custom made goes here-->
            <div   class="container-fluid accordian-content">
                <div  class="row">
                    <div class="col-6">
                        <h2 class="title">${data["Title of Event / Position"]}</h2>
                        <p class="company-name">${data["Organization Name"]}</p>
                    </div>
                    <div class="col-3 location"> 
                        <p>${data["Adress "]},</p>
                        <p>${data["City"]}</p>                     
                    </div>
                    <div class="col-3 posted-time"><p>2 hrs Ago</p></div>
                </div>
            </div>
        </div>
    </div>
    <div id="${id}" class="accordion-collapse collapse" aria-labelledby="heading-${id}" data-bs-parent="#event-list">
        <div class="accordion-body">

            <!--all content that will collapse goes here-->

            <div class="container-fluid collapse-content">

                <h3 class="description-title">Description:</h3>

                <!--all images need their own source or link-->
                
                <img class="collapse-img" src="https://drive.google.com/uc?export=view&id=${imglink}" allow="autoplay"></img>
              
                <img class="collapse-img" src="${data["Add an Image"]}" alt="image failed to load">
                <!--for multiple paragraphs you need many p elements with the class, this can be done in js-->
                <p class="description-content">
                    ${data["Description of the Role and Requirements"]}
                </p>
                <h3 class="contact-title">Contact Information:</h3>
                <!--contact info and stuff goes into 2 columns-->
                <div class="container contact-content">
                    <div class="row">
                        <div class="col-8 contact-text">
                            <a href="${data["Webpage Link"]}" target="_blank">${data["Organization Name"]}</a>
                            <a>${data["Contact Email"]}</a>
                            <p>${data["Contact Phone Number"]}</p>
                        </div>
                        <div class="col-4 contact-text">
                            <p>${data["Adress "]}</p>
                            <p>${data["City"]}</p>
                            <p>${data["Postal Code"]}</p> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
`;


}
*/





function createOneListing(data, id){
  

  /*
  params:
  - data: object with all the info of a single event
  - id, a unique string that is the id to attach the header to the collapse


  purpose:
  - return a string that is html formatted correctly, so that in createEventList we can add it to the innerHtml of #event-list

  will need a seperate js function to update the posted-time text automatically

  */

  //accordian header


  //console.log(location);

  let location = remoteChange(data);

  let accordian_header = 
  `
  <div class="accordion-header">
    <div class=" accordion-button collapsed" data-bs-toggle="collapse" href="#${id}" role="button"  aria-expanded="false" aria-controls="${id}" id="heading-${id}">
        <!-- formatting that is custom made goes here-->
        <div   class="container-fluid accordian-content">
            <div  class="row">
                <div class="col-6">
                    <h2 class="title">${data["Title of Event / Position"]}</h2>
                    <p class="company-name">${data["Organization Name"]}</p>
                </div>
                <div class="col-3 location"> 
                    <p> ${location} </p>
                    <!-- <p>${data["Address"]},</p>
                    <p>${data["City"]}</p>  -->                   
                </div>
                <div class="col-3 posted-time"><p>2 hrs Ago</p></div>
            </div>
        </div>
    </div>
</div>
`;


//accordian body

//blank image tag if no image
let img_tag = data['Add an Image'] !== "" ? `<img class="collapse-img" src="https://drive.google.com/uc?export=view&id=${getImageID(data['Add an Image'])}" alt="image failed to load" allow="autoplay">` : "";

let accordian_body = 
`
<div id="${id}" class="accordion-collapse collapse" aria-labelledby="heading-${id}" data-bs-parent="#event-list">
    <div class="accordion-body">


        <div class="container-fluid collapse-content">

            <h3 class="description-title">Description:</h3>
  
            <!--image tag if neccesary-->
            ${img_tag}

            <p class="description-content">
                ${data["Description of the Role and Requirements"]}
            </p>
            <h3 class="contact-title">Contact Information:</h3>
            <!--contact info and stuff goes into 2 columns-->
            <div class="container contact-content">
                <div class="row">
                    <div class="col-8 contact-text">
                        <a href="${data["Webpage Link"]}" target="_blank">${data["Organization Name"]}</a>
                        <a>${data["Contact Email"]}</a>
                        <p>${data["Contact Phone Number"]}</p>
                    </div>
                    <div class="col-4 contact-text">
                        <p>${data["Address"]}</p>
                        <p>${data["City"]}</p>
                        <p>${data["Postal Code"]}</p> 
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
`;


//finally combining the header and body
let ans = 
`
<div class="accordion-item">
${accordian_header}
${accordian_body}
</div>
`;


return ans;

}


function getImageID(imglink){
  // getting only the image id from the image link
  let index = imglink.indexOf('id=');

  imglink = imglink.slice(index+3);
  //console.log(index);
  //console.log(imglink);

  return imglink;
}

function remoteChange(data){
  //changes the adress to "Remote" if it is online and also formats the adress

  let adress = data["Address"];
  let city = data["City"];
  let location;

  if(data["Is this position in person or online?"] === "Online"){
    location = "Remote";
  }
  else{
    location = adress + "<br>" + city;
  }

  return location;
}




/* TOP NAVIGATION BAR*/

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    document.getElementById("nav").style.height = "73px";
    document.getElementById("header").style.marginTop = "73px";
    document.getElementById("logoImage").style.height = `${0.8*73}px`
  } 
  else {
    document.getElementById("nav").style.height = "93px";
    document.getElementById("header").style.marginTop = "93px";
    document.getElementById("logoImage").style.height = `${0.8*93}px`
  }

  
}