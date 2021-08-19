"use strict";

// api urls
const QUERY_WEATHER = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = 'b05f3bf7064c9791bb53d10145b39d45';

const DAYS = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ];
const ICONS = {
  clouds: 'images/HeavyCloud.png',
  clear: 'images/Clear.png',
  snow: 'images/Snow.png',
  rain: 'images/HeavyRain.png',
  drizzle: 'images/LightRain.png',
  thunderstorm: 'images/Thunderstorm.png'

}

const modalSearch = document.querySelector('#modal-search');
const changeLocationForm = document.querySelector('#change-location');
const changeBtn = document.querySelector('#change-btn');

changeLocationForm.addEventListener('submit', event => {

  event.preventDefault();

  const locationInput = document.querySelector('#location');
  const cityName = locationInput.value;
  updateWeatherWithName(cityName);

  locationInput.value = '';
  modalSearch.style.display = 'none';

});

changeBtn.addEventListener('click', () => modalSearch.style.display = 'flex');

window.onload = () => {
  
  navigator.geolocation.getCurrentPosition(position => {
    updateWeatherWithCoords(position.coords);
  });

};

// Functions that get current weather
function updateWeatherWithCoords(coords) {
  
  fetch(`${QUERY_WEATHER}?lat=${coords.latitude}&lon=${coords.longitude}&appid=${API_KEY}`)
    .then(response => response.json())
    .then(weather => displayWeather(weather));

}

function updateWeatherWithName(cityName) {

  fetch(`${QUERY_WEATHER}?q=${cityName}&appid=${API_KEY}`)
    .then(response => response.json())
    .then(weather => displayWeather(weather));

}

function displayWeather(weather) {

  const today = new Date();
  const state = (weather.weather[0]).main;
  const temperature = Math.round(weather.main.temp - 273.15);
  const windVelocity = Math.round(weather.wind.speed * 3.6);

  document.querySelector('#weather-day').innerText = DAYS[today.getDay()];
  document.querySelector('#weather-date').innerText = today.toDateString();
  document.querySelector('#weather-location').innerHTML = `
  <i class="fas fa-map-marker-alt"></i> ${weather.name}, ${weather.sys.country}
  `;
  document.querySelector('#weather-icon').src = ICONS[state.toLowerCase()];
  document.querySelector('#weather-temperature').innerText = `${temperature}°C`;
  document.querySelector('#weather-state').innerText = state;

  document.querySelector('#weather-pressure').innerText = weather.main.pressure;
  document.querySelector('#weather-humidity').innerText = weather.main.humidity + '%';
  document.querySelector('#weather-wind').innerText = windVelocity + 'km/h';

}