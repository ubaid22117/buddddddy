document.getElementById('search-btn').addEventListener('click', getWeather);

function updateDateTime() {
    const date = new Date();
    document.getElementById('date').innerText = date.toLocaleDateString();
    document.getElementById('time').innerText = date.toLocaleTimeString();
}

// Update date and time every second
setInterval(updateDateTime, 1000);

async function getWeather() {
    const city = document.getElementById('city-input').value;
    const apiKey = 'd908ce321c594b00d237e5f4348b35fd'; // Your OpenWeatherMap API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('City not found');
        }

        const data = await response.json();
        document.getElementById('temperature-info').innerText = `${data.main.temp}°C`;
        document.getElementById('humidity-info').innerText = `${data.main.humidity}%`;
        document.getElementById('wind-info').innerText = `${data.wind.speed} m/s`;

        const temperature = data.main.temp;
        const weatherDescription = getWeatherDescription(data.weather[0].main);
        displayWeatherIcon(temperature);
        document.getElementById('weather-description').innerText = weatherDescription;
    } catch (error) {
        alert(error.message);
    }
}

function getWeatherDescription(weatherMain) {
    switch (weatherMain) {
        case 'Clear':
            return 'Sunny';
        case 'Clouds':
            return 'Cloudy';
        case 'Rain':
            return 'Rainy';
        default:
            return 'Weather condition not specified';
    }
}

function displayWeatherIcon(temperature) {
    const weatherIcon = document.getElementById('weather-icon');

    if (temperature > 35) {
        weatherIcon.src = 'https://tse1.mm.bing.net/th?id=OIP.s47RhdsQxr_8ZJLkgxCr3QHaHa&pid=Api&P=0&h=220';
        weatherIcon.alt = 'Sunny';
    } else if (temperature > 25) {
        weatherIcon.src = 'https://tse3.mm.bing.net/th?id=OIP.dJsyLmAhNqD9I2i3P_n25wHaGB&pid=Api&P=0&h=220';
        weatherIcon.alt = 'Partly Sunny';
    } else if (temperature > 15) {
        weatherIcon.src = 'https://tse1.mm.bing.net/th?id=OIP.dOAZsSAxaIQRh0B4-JA6awHaFa&pid=Api&P=0&h=220';
        weatherIcon.alt = 'Cloudy';
    } else {
        weatherIcon.src = 'https://tse1.mm.bing.net/th?id=OIP.xobXFIRXIrQPKB0lAVNd9AHaHm&pid=Api&P=0&h=220';
        weatherIcon.alt = 'Rainy';
    }
    
    
}

// Initialize date and time display
updateDateTime();
