window.addEventListener('load',()=>{
    let long;
    let lat;

 if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position =>{
       long = position.coords.longitude;
       lat = position.coords.latitude   
       let apikey = `X48WFZ35Z932MXXCPRR8YW9LT`
       const  api = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/New%20York%20City%2CNY?unitGroup=us&key=${apikey}&contentType=json`
      
    })
   }
})








