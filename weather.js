const API_KEY = "31421bc662cc4cb89586ab94210d3de3";
const COORDS = "coords";
const weatherBanner = document.querySelector(".weather__banner");
const weatherDescription = weatherBanner.querySelector("span");
const weatherTemperature = document.querySelector(".weather__temperature")
const weatherError = document.querySelector(".weather__error");


function getWeather(lat, lon){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    ).then(function(response){
        return response.json()
    }).then(function(json){
        const weatherMain = json.weather[0].main;
        const weatherIcon = json.weather[0].icon;
        const temperature = json.main.temp;
        const place = json.name;
        weatherDescription.innerText = weatherMain;
        const weatherImg = document.createElement("img");
        weatherImg.width = weatherImg.height = 40;
        weatherImg.src = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
        weatherBanner.prepend(weatherImg);
        weatherTemperature.innerText = `${temperature}°C ${place}`;
        weatherBanner.classList.add("showing");
        weatherTemperature.classList.add("showing");
        weatherError.classList.remove("showing");
    }
    )


}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError(){
    weatherBanner.classList.remove("showing");
    weatherTemperature.classList.remove("showing");
    weatherError.classList.add("showing");
    // #현 위치정보를 얻을 수 없음
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null){
        askForCoords();
    } else{
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init(){
    loadCoords();
}

init();