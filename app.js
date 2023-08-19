window.addEventListener('load',()=>{
    let long;
    let lat;

 if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position =>{
       long = position.coords.longitude;
       lat = position.coords.latitude   
    })
 }



})











const  api = `https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m`