import { renderWidget } from './main.js';

export async function fetchWeather(lat, lon) {
    try {
        const API_KEY = '5d7e7216f3524b6224bab80c4df2aaa6';
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=ua`;

        const response = await fetch(url);
        const data = await response.json();

        renderWidget(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        console.error('Error fetching weather data:', error);
    }
}