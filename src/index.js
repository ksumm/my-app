let now = new Date();
let showdate = document.querySelector("#current-date");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
showdate.innerHTML = `${day}, ${hours}:${minutes}  `;

//Homework 5
function cityTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let mainTemperatureCelsius = document.querySelector("#temp");
  mainTemperatureCelsius.innerHTML = `${temperature} °C`;
  let newCity = document.querySelector("#current-city");
  newCity.innerHTML = response.data.name;
}

function citySelect(event) {
  event.preventDefault();
  let key = "6d68aadfacdd4f5163bc273049a0cf2d";
  let currentcity = document.querySelector("#formGroupExampleInput").value;
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currentcity}&appid=${key}&&units=${unit}`;
  axios.get(`${apiUrl}`).then(cityTemperature);
}
let form = document.querySelector("#submit-form");
form.addEventListener("submit", citySelect);

// Current geolocation

function newPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "acf5998fd34eb7e73e1c9495b523f481";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(cityTemperature);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(newPosition);
}

let current = document.querySelector("#current-location-button");
current.addEventListener("click", getCurrentPosition);
