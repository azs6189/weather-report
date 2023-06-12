'use strict';

// const { default: axios } = require('axios');

// Selects the HTML Elements the events will occur on
const increaseTempButton = document.querySelector('#increaseTempControl');
const decreaseTempButton = document.querySelector('#decreaseTempControl');
const tempValue = document.querySelector('#tempValue');
const landscape = document.querySelector('#landscape');
const textInput = document.querySelector('#cityNameInput');
const cityName = document.querySelector('#headerCityName');
const currentTempButton = document.querySelector('#currentTempButton');
const BASE_URL = 'http://127.0.0.1:5000';

// Location
const locationState = {
	city: 'South Lake Tahoe',
	lat: 38.9332411,
	lon: -119.9843482,
	temp: 60,
};

const getLatAndLong = () => {
	axios
		.get(`${BASE_URL}/location`, {
			params: {
				// key: process.env['LOCATION_KEY'],
				// q: 'Seattle, Washington, USA',
				q: 'South Lake Tahoe, CA',
			},
		})
		.then((response) => {
			console.log('success!', response.data);
			locationState.lat = response.data[0].lat;
			locationState.lon = response.data[0].lon;
		})
		.catch((error) => {
			console.log('error!', error.response.data);
		});
};

// Makes functions to run when events occur
const state = {
	temp: 0,
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

const updateCityName = () => {
	cityName.textContent = textInput.value;
};

// Registers functions as 'event listeners'
increaseTempButton.addEventListener('click', increaseTemp);
decreaseTempButton.addEventListener('click', decreaseTemp);
textInput.addEventListener('input', updateCityName);
currentTempButton.addEventListener('click', getLatAndLong);
