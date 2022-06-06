import { useEffect, useState } from "react";

export default function Weather() {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState("");

    function onGeoOk(position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const API_KEY = "";

        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&lang=kr&units=metric`
        
        if(API_KEY !== "") {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if(data.cod === 200) {
                        const weatherStr = `${data.weather[0].description}(${data.weather[0].main}) / ${data.main.temp}도`;
                        setCity(data.name);
                        setWeather(weatherStr);
                    } else {
                        console.log("Not Success: Can't find you. No weather for you.");
                    }
                });
        }
    }

    function onGeoError() {
        console.log("Error: Can't find you. No weather for you.");
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
    }, []);
    
    return (
        <div id="weather">
            <span>{city}</span>
            <span>{weather}</span>
        </div>
    );
}
