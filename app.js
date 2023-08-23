const temp = document.getElementById("temp");
let date = document.getElementById("date-time");
const cityinput = document.getElementById("city");
let btn = document.getElementById("btn");
let condition = document.querySelector(".condition");
let locat = document.querySelector(".location");
let icon = document.querySelector(".icon");

let pressure = document.querySelector(".pressure");
let UV_index = document.querySelector(".uv-index");

let windspeed = document.querySelector(".wind-speed");
let windstatus = document.querySelector(".wind-status");

let sunrise = document.querySelector(".Sunrise");
// let sunset = document.querySelector('#sunset')

let humidity = document.querySelector(".humidity");
let humiditystatus = document.querySelector(".humidity-status");

let visibility = document.querySelector(".Visibility");
let visibilityst = document.querySelector(".Visibility-status");

let air = document.querySelector(".air-quality");
let airstatus = document.querySelector(".air-quality-status");

let morning = document.getElementById("Sunrise1");
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
    minute = "0" + hour;
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

const getweather = (name, lon, lat) => {
  //  const weather_api = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt={7}&appid=${API}`;
  const weather_api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API}`;
  fetch(weather_api)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      // weather(data)
      temp.innerText = `${(data.main.temp - 273.15).toFixed(0)}`;
      condition.innerText = data.weather[0].main;
      windspeed.innerText = data.wind.speed + "k/h";
      humidity.innerText = data.main.humidity + "%";
      visibility.innerText = value(data.visibility) + "Km";
      pressure.innerText = data.main.pressure + "mb";

      sunrise.innerHTML = dailysunrise(data.sys.sunrise) + "AM";
      dailysunset(data.sys.sunset);
    })
    .catch((err) => err);
};

function value(data) {
  let out = data.toString().split("");
  console.log(out);
  return out[0];
}
// value()

function dailysunrise(val1) {
  let sunrise = new Date(val1 * 1000);

  let hr = sunrise.getHours();
  let min = sunrise.getMinutes();
  let rise = `${hr}:${min}`;

  // console.log(rise,set)

  return rise;
}

function dailysunset(val) {
  let sunset = new Date(val * 1000);
  let hr = sunset.getHours();
  if (hr > 12) {
    hr -= 12;
  }
  let min = sunset.getMinutes();
  let set = `${hr}:${min}`;

  morning.addEventListener("click", () => {
    sunrise.innerHTML = "";
    document.querySelector("#sunset").innerText = set + "pm";
  });
}
