'use strict';

const API_KEY = `69b9fc16a3e799fb6aafe5cbdfa00c88`;

const loadWeatherData = async (cityName) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;

  const res = await fetch(url);
  const data = await res.json();
  displayWeatherData(data);
};

const setInnerText = (id, text) => {
  document.getElementById(id).innerText = text;
};

const displayWeatherData = (data = {}) => {
  const {
    name,
    dt,
    timezone,
    visibility,
    main: { humidity, temp, feels_like },
    sys: { country, sunrise, sunset },
  } = data || {};

  console.log(data);

  setInnerText('city', name);
  document.getElementById('temperature').innerHTML = `${temp.toFixed(0)}&deg;C`;
  document.getElementById('country').innerText = `, ${country}`;
};

//* handle search button click
document.getElementById('search-btn').addEventListener('click', () => {
  const searchElement = document.getElementById('search-field');
  const cityName = searchElement.value;

  loadWeatherData(cityName);
});

//* handle search field enter key press
document.getElementById('search-field').addEventListener('keydown', (e) => {
  const searchElement = document.getElementById('search-field');
  const cityName = searchElement.value;

  if (e.key === 'Enter') {
    loadWeatherData(cityName);
  }
});
