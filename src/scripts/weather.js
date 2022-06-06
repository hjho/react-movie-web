const API_KEY = "";

function onGeoOk(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&lang=kr&units=metric`
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const city = document.querySelector("#weather span:last-child");
            const weather = document.querySelector("#weather span:first-child");
            
            city.innerText = data.name;
            weather.innerText = `${data.weather[0].description}(${data.weather[0].main}) / ${data.main.temp}도`;
        });

}

function onGeoError() {
    alert("Can't find you. No weather for you.");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);