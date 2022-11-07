const api = {
    key: "93ca8f1a85012f4cb41673f439791b38",
    baseurl: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', cityInput); // Using keypress for 'enter' to decide when to run function on search box


function cityInput(event) {
    if (event.keyCode == 13) { // 13 is for enter
        pullWeather(searchbox.value);
    }
}

function pullWeather (city) {
    fetch(`${api.baseurl}weather?q=${city}&units=imperial&appid=${api.key}`)
    .then(weather => {
        return weather.json();
    }) .then(displayWeather);
}

function displayWeather (weather) {
    console.log(weather)
    let city = document.querySelector('.location .city');
    city.innerHTML = `${weather.name}`;
    let country = document.querySelector('.location .country');
    country.innerHTML = `${weather.sys.country}`
    let temp = document.querySelector('.weather .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°F</span>`
    let cloudCoverage = document.querySelector('.weather .cloud-coverage');
    cloudCoverage.innerHTML = `${weather.weather[0].main}`
    let highLow = document.querySelector('.weather .high-low');
    highLow.innerHTML = `H:${Math.round(weather.main.temp_max)}°&nbsp&nbsp&nbspL:${Math.round(weather.main.temp_min)}°`
    let humidity = document.querySelector('.extra-container .humid-perc');
    humidity.innerHTML = `${weather.main.humidity}%`;
    let feelsLike = document.querySelector('.extra-container .feels-like-temp');
    feelsLike.innerHTML = `${Math.round(weather.main.feels_like)}°F`;
    let windMPH = document.querySelector('.extra-container .wind-mph');
    windMPH.innerHTML = `${weather.wind.speed}mph`;
    let visibility = document.querySelector('.extra-container .visibility-mi');
    visibility.innerHTML = `${Math.round((weather.visibility)/1000)}mi`;
    let weatherIcon = weather.weather[0].icon;
    document.querySelector('.icon').src = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`
}

