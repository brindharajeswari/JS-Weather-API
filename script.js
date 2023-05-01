const API_KEY = '8fd3a056705c5a7f08538daa4121ac2e'; //OpenWeather API key

// DOM Elements

const searchInput = document.querySelector('#search-input');
const searchButton = document.querySelector('#search-button');
const weatherLocation = document.querySelector('#location');
const mainTemperature = document.querySelector('#main-temperature');
const weatherDescription = document.querySelector('#weather-description');
const minTemperature = document.querySelector('#min-temperature');
const maxTemperature = document.querySelector('#max-temperature');
const humidity = document.querySelector('#humidity');
const windSpeed = document.querySelector('#wind-speed');
const weatherIcon = document.querySelector('#weather-icon');
const weatherInfoSection = document.querySelector('#weather-info');
const errorMessage = document.querySelector('#error-message');


// Functions

const checkWeather = async (city) => {
	try {
		const apiURL = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${API_KEY}`;

		const response = await fetch(apiURL);
		return response.json();
	} catch (error) {
		console.log(error);
	}
};

const showWeather = async (city) => {
	const data = await checkWeather(city);
	console.log(data);

	if (data.cod === '404') {
		return errorMessage.classList.remove('hide');
	}
    weatherLocation.innerHTML = `${data.name}, ${data.sys.country}`;
	mainTemperature.innerHTML = data.main.temp.toFixed(1);
	weatherDescription.innerHTML = data.weather[0].description;
	minTemperature.innerHTML = data.main.temp_min.toFixed(1);
	maxTemperature.innerHTML = data.main.temp_max.toFixed(1);
	humidity.innerHTML = data.main.humidity;
	windSpeed.innerHTML = data.wind.speed;

	const imagePath = getWeatherIcon(data.weather[0].main);

	weatherIcon.src = imagePath;

	weatherInfoSection.classList.remove('hide');
};

const getWeatherIcon = (weatherCondition) => {
	let imagePath;

	switch (weatherCondition) {
		case 'Clear':
			imagePath = '/images/clear.png';
			break;
		case 'Clouds':
			imagePath = '/images/clouds.png';
			break;
		case 'Drizzle':
		case 'Rain':
			imagePath = '/images/drizzle.png';
			break;
		case 'Mist':
		case 'Fog':
			imagePath = '/images/mist.png';
			break;
		case 'Rain':
			imagePath = '/images/rain.png';
			break;
		case 'Snow':
			imagePath = '/images/snow.png';
			break;
		case 'Thunderstorms':
			imagePath = '/images/thunderstorm.png';
			break;
		default:
			imagePath = '/images/partly-cloudy.png';
			break;
	}

	return imagePath;
};

// Events

searchButton.addEventListener('click', () => {
	const inputValue = searchInput.value;
	showWeather(inputValue);
});

document.addEventListener('keydown', (e) => {
	if (e.key === 'Enter') {
		const inputValue = searchInput.value;
		showWeather(inputValue);
	}
});

searchInput.addEventListener('input', () => {
	errorMessage.classList.add('hide');
	weatherInfoSection.classList.add('hide');
});
