/*
notes

asyncronous is weird but also necessary for website experience

using javascript promises to make request with fetch
this took alot longer to figure out than i expected
*/

async function getEventsPromise(){

    /*
    no params:

    purpose: returns resolved promise with the json array inside
    */

    const URL = "https://script.google.com/macros/s/AKfycbylYZAjhwYRLKAo0IdgElCMgo9aIr5CxYV4qN8YweehvaZKqGRI8Bg__tZzMgSb77PpUg/exec";

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

    console.log(events)

    //put info into html under here




}

createEventList()






