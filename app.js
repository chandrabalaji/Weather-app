const temp = document.getElementById("temp");
let date = document.getElementById("date-time");
const cityinput = document.getElementById("city");
let btn = document.getElementById("btn");
let condition = document.querySelector("#condition");
let locat = document.querySelector("#crt-location");
let icon = document.querySelector(".icon");
let dailydays = document.querySelector(".day");
let dailytemps = document.querySelector(".temps");
let pressure = document.querySelector(".pressure");
// let pressureimg = document.querySelector(".pressure-img");

let windspeed = document.querySelector(".wind-speed");
// let windstatus = document.querySelector(".wind-status");

let sunrise = document.querySelector(".Sunrise");
let sunset = document.querySelector("#sunset");

let humidity = document.querySelector(".humidity");
// let humiditystatus = document.querySelector(".humidity-status");

let visibility = document.querySelector(".Visibility");
// let visibilityst = document.querySelector(".Visibility-status");

let feellike = document.querySelector(".feels-like");

let sunsettime = document.getElementById("Sunsetbtn");
let sunrisetime = document.getElementById("Sunrise");
let geolocation = document.querySelector(".location-btn");
let hour = "week";

//date & time

function getdatetime() {
  let now = new Date(),
    hour = now.getHours();
  minute = now.getMinutes();

  let days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thersday",
    "friday",
    "saturday",
  ];

  if (hour > 12) {
    hour -= 12;
  }
  if (hour < 10) {
    hour = "0" + hour;
  }
  if (minute < 10) {
    minute = "0" + minute;
  }

  let daystring = days[now.getDay()];

  return `${daystring},${hour}:${minute}`;
}
setInterval(() => {
  date.innerText = getdatetime();
}, 500);

const API = "e581e5209be8f71d5ecf50eb1accb345";
const cityname = () => {
  const city = cityinput.value;
  const GEOCODING = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API}`;
  fetch(GEOCODING)
    .then((res) => res.json())
    .then((data) => {
      if (!data.length) return alert(`'not fount ${city}'`);
      console.log(data);
      const { name, lon, lat } = data[0];

      getweather(name, lon, lat);
      locat.innerText = name;
    })
    .catch((err) => console.log(err));
};

btn.addEventListener("click", () => {
  cityname(), dailysunrise();
  value();
});

// set all highlights in weather information

const getweather = (name, lon, lat) => {
  //  const weather_api = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt={7}&appid=${API}`;
  const weather_api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API}`;
  fetch(weather_api)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      // weather(data)
      temp.innerText = `${(data.main.temp - 273.15).toFixed(0)}`;
      dailytemps.innerHTML = `${(data.main.temp - 273.15).toFixed(0)}`;
      condition.innerText = data.weather[0].main;
      windspeed.innerText = data.wind.speed + "k/h";
      humidity.innerText = data.main.humidity + "%";
      visibility.innerText = value(data.visibility) + "Km";
      pressure.innerText = data.main.pressure + "mb";
      feellike.innerHTML = (data.main.feels_like - 273.15).toFixed(0) + "º";
      sunrise.innerHTML = dailysunrise(data.sys.sunrise) + "am";
      dailysunset(data.sys.sunset);
      daily();
    })
    .catch((err) => err);
};

function value(data) {
  let out = data.toString().split("");
  return out[0];
}

// sunrise
function dailysunrise(val1) {
  let sunrise = new Date(val1 * 1000);

  let hr = sunrise.getHours();
  let min = sunrise.getMinutes();
  let rise = `${hr}:${min}`;

  // console.log(rise,set)
  sunrisetime.addEventListener("click", () => {
    document.querySelector(".Sunrise").innerHTML = rise + "am";
  });
  return rise;
}
// sunset
function dailysunset(val) {
  let sunset = new Date(val * 1000);
  let hr = sunset.getHours();
  if (hr > 12) {
    hr -= 12;
  }
  let min = sunset.getMinutes();
  let set = `${hr}:${min}`;

  sunsettime.addEventListener("click", () => {
    sunrise.innerHTML = set + "pm";
  });
}

/// get current location  from user
function userlocation() {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      console.log(position);
      const { latitude, longitude } = position.coords;
      const geo_location = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API} `;
      fetch(geo_location)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          const { lat, lon, name } = data[0];
          getweather(name, lon, lat);
          locat.innerText = name;
        })
        .catch(() => {
          alert("curretn location request denied");
        });
    },
    (error) => {
      console.log(error);
    }
  );
}
geolocation.addEventListener("click", userlocation);

function daily() {
  let day = new Date().getDay();
  let days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thersday",
    "friday",
    "saturday",
  ];

  dailydays.innerHTML = days[day];
}
