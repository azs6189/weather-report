'use strict';

// Selects the HTML Elements the events will occur on
const increaseTempButton = document.querySelector('#increaseTempControl');
const decreaseTempButton = document.querySelector('#decreaseTempControl');
const tempValue = document.querySelector('#tempValue');
const landscape = document.querySelector('#landscape');
const cityNameInput = document.querySelector('#cityNameInput');
const headerCityName = document.querySelector('#headerCityName');
const currentTempButton = document.querySelector('#currentTempButton');
const BASE_URL = 'http://127.0.0.1:5000';

// Makes functions to run when events occur
const state = {
	city: 'South Lake Tahoe',
	lat: 38.9332411,
	lon: -119.9843482,
	temp: 60,
};

const convertKtoF = (temp) => {
	return (temp - 273.15) * (9 / 5) + 32;
};

const getLatAndLong = () => {
	axios
		.get(`${BASE_URL}/location`, {
			params: {
				// key: process.env['LOCATION_KEY'],
				// q: 'Seattle, Washington, USA',
				q: 'South Lake Tahoe',
			},
		})
		.then((response) => {
			// console.log('success!', response.data);
			state.lat = response.data[0].lat;
			state.lon = response.data[0].lon;
			getWeather();
		})
		.catch((error) => {
			console.log('error!', error.response.data);
		});
};

const getWeather = () => {
	axios
		.get(`${BASE_URL}/weather`, {
			params: {
				lat: state.lat,
				lon: state.lon,
			},
		})
		.then((response) => {
			// console.log(response.data.main.temp);
			state.temp = Math.round(convertKtoF(response.data.main.temp));
			updateTemp();
			updateTempColor();
			updateLandscape();
		})
		.catch((error) => {
			console.log('error!', error.response.data);
		});
};

// Sets the temperate value to state
const updateTemp = () => {
	tempValue.textContent = `${state.temp}`;
};

const updateTempColor = () => {
	tempValue.classList.remove('red', 'orange', 'yellow', 'green', 'blue');
	if (state.temp >= 80) {
		tempValue.classList.add('red');
	} else if (state.temp >= 70 && state.temp <= 79) {
		tempValue.classList.add('orange');
	} else if (state.temp >= 60 && state.temp <= 69) {
		tempValue.classList.add('yellow');
	} else if (state.temp >= 50 && state.temp <= 59) {
		tempValue.classList.add('green');
	} else if (state.temp < 50) {
		tempValue.classList.add('blue');
	}
};

const updateLandscape = () => {
	if (state.temp >= 80) {
		landscape.textContent = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
	} else if (state.temp >= 70 && state.temp <= 79) {
		landscape.textContent = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
	} else if (state.temp >= 60 && state.temp <= 69) {
		landscape.textContent = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
	} else if (state.temp < 59) {
		landscape.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
	}
};

const increaseTemp = () => {
	state.temp += 1;
	updateTemp();
	updateTempColor();
	updateLandscape();
};

const decreaseTemp = () => {
	state.temp -= 1;
	updateTemp();
	updateTempColor();
	updateLandscape();
};

const updateHeaderCityName = () => {
	headerCityName.textContent = cityNameInput.value;
};

// Registers functions as 'event listeners'
increaseTempButton.addEventListener('click', increaseTemp);
decreaseTempButton.addEventListener('click', decreaseTemp);
cityNameInput.addEventListener('input', updateHeaderCityName);
currentTempButton.addEventListener('click', getLatAndLong);
