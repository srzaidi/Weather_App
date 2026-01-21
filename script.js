let timer; // Variable for the debounce timer

async function handleTyping() {
    const city = document.getElementById('cityInput').value;
    const list = document.getElementById('suggestions');

   
    clearTimeout(timer);

    if (city.length < 2) {
        list.style.display = 'none'; 
        return;
    }

    // Set a new timer: Wait 300ms before calling the API
    timer = setTimeout(async () => {
        const url = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=5&language=en&format=json`;
        
        try {
            const response = await fetch(url);
            const data = await response.json();

            list.innerHTML = '';

            if (data.results) {
                list.style.display = 'block'; 
                
                data.results.forEach(place => {
                    const li = document.createElement('li');
                    
                    li.textContent = `${place.name}, ${place.country}`;
                    
                    
                    li.onclick = () => {
                        document.getElementById('cityInput').value = place.name;
                        list.style.display = 'none'; 
                        getWeather();
                    };
                    
                    list.appendChild(li);
                });
            }
        } catch (error) {
            console.error("Error fetching suggestions:", error);
        }
    }, 300); // 300 milliseconds delay
}

async function getWeather() {
    const city = document.getElementById('cityInput').value;
    const resultDiv = document.getElementById('result');
    document.getElementById('suggestions').style.display = 'none'; 

    if (!city) {
        resultDiv.innerHTML = "Please enter a city name!";
        return;
    }

    resultDiv.innerHTML = "Loading...";

    try {
        const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`;
        const geoResponse = await fetch(geoUrl);
        const geoData = await geoResponse.json();

        if (!geoData.results) {
            resultDiv.innerHTML = "City not found!";
            return;
        }

        const lat = geoData.results[0].latitude;
        const lon = geoData.results[0].longitude;
        const cityName = geoData.results[0].name;
        const country = geoData.results[0].country;

        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();

        const temperature = weatherData.current_weather.temperature;
        const windSpeed = weatherData.current_weather.windspeed;

        resultDiv.innerHTML = `
            <h3>${cityName}, ${country}</h3>
            <div class="temp">${temperature}°C</div>
            <p>Wind Speed: ${windSpeed} km/h</p>
        `;

    } catch (error) {
        console.error(error);
        resultDiv.innerHTML = "Error fetching data.";
    }
}