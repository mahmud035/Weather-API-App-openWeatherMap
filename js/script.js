'use strict';

const API_KEY = `69b9fc16a3e799fb6aafe5cbdfa00c88`;

const loadWeatherData = async (cityName) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;

  const res = await fetch(url);
  const data = await res.json();

  if (data.cod === '404') {
    document.getElementById('error').classList.remove('d-none');
    return;
  } else {
    document.getElementById('error').classList.add('d-none');
  }

  displayWeatherData(data);
};

const setInnerText = (id, text) => {
  document.getElementById(id).innerText = text;
};

const getTime = (seconds) => {
  const sec = seconds;
  const date = new Date(sec * 1000);
  const timeString = date.toLocaleTimeString();
  return timeString;
};

const displayWeatherData = (data = {}) => {
  const {
    name,
    dt,
    timezone,
    visibility,
    main: { humidity, temp, feels_like },
    sys: { country, sunrise, sunset },
    wind: { speed },
  } = data || {};

  console.log(data);

  setInnerText('city', name);

  document.getElementById('temperature').innerHTML = `${temp.toFixed(0)}&deg;C`;
  document.getElementById('country').innerText = `, ${country}`;
  document.getElementById('forecast').innerText = `${
    data?.weather[0]?.main ? data?.weather[0]?.main : 'N/A'
  }`;
  document.getElementById('humidity').innerHTML = ` ${
    humidity ? humidity : 'N/A'
  }%`;

  document.getElementById('feel-like').innerHTML = `${
    feels_like ? feels_like.toFixed(0) : 'N/A'
  }&deg;C`;

  document.getElementById('wind').innerHTML = `${
    speed ? speed.toFixed(0) : 'N/A'
  } m/s`;

  const sunriseTime = getTime(sunrise).slice(0, 4);
  document.getElementById('sunrise').innerText = `${sunriseTime} AM`;

  const sunsetTime = getTime(sunset).slice(0, 4);
  document.getElementById('sunset').innerText = `${sunsetTime} PM`;

  document.getElementById('visibility').innerHTML = `${visibility / 1000} km`;

  // set weather icon
  const iconURL = `http://openweathermap.org/img/wn/${
    data?.weather[0]?.icon ? data?.weather[0]?.icon : 'N/A'
  }@2x.png`;

  const imgIcon = document.getElementById('weather-icon');
  imgIcon.setAttribute('src', iconURL);

  //* set current time and Date
  document.getElementById('todays-date').innerText = new Date()
    .toString()
    .slice(0, 31);
};

//* handle search button click
document.getElementById('search-btn').addEventListener('click', () => {
  const searchElement = document.getElementById('search-field');
  const cityName = searchElement.value;

  loadWeatherData(cityName);
  searchElement.value = '';
});

//* handle search field enter key press
document.getElementById('search-field').addEventListener('keydown', (e) => {
  const searchElement = document.getElementById('search-field');
  const cityName = searchElement.value;

  if (e.key === 'Enter') {
    loadWeatherData(cityName);
    searchElement.value = '';
  }
});
