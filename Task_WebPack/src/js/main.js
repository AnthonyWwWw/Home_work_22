import "../scss/main.scss";
import {fetchWeather} from './fetchModule.js';
import {fetchExchangeRate} from './fetchExchangeRate.js';

document.addEventListener('DOMContentLoaded', () => {
    const cities = [
        { name: 'Kiev', lat: 50.43, lon: 30.52 },
        { name: 'Odesa', lat: 46.45, lon: 30.72 },
        { name: 'Kharkiv', lat: 49.98, lon: 36.25 },
    ];

    let savedLat = 50.43;
    let savedLon = 30.52;
    fetchWeather(savedLat, savedLon);
    const regionList = document.getElementById('regionList');
    cities.forEach(city => {
        const li = document.createElement('li');
        li.className = 'item-list';
        li.dataset.lat = city.lat;
        li.dataset.lon = city.lon;
        li.textContent = city.name;
        regionList.appendChild(li);
    });

    const selectionCity = document.querySelectorAll('.item-list');

    document.querySelector('#buttonLoading').addEventListener('click', () => {
        let { lat, lon } = saveSelection();
        fetchWeather(lat, lon);
    });

    document.querySelector('#buttonCoin').addEventListener('click', () => {
        fetchExchangeRate();
    });

    selectionCity.forEach(element => {
        element.addEventListener('click', event => {
            const elementTarget = event.target;
            const lat = elementTarget.getAttribute('data-lat');
            const lon = elementTarget.getAttribute('data-lon');

            document.body.classList.remove('kiev', 'odesa', 'kharkiv');
    
            switch (elementTarget.innerHTML) {
                case 'Kiev':
                    selectionKiev();
                    fetchWeather(lat, lon);
                    saveSelection(lat, lon);
                    break;
                case 'Odesa':
                    selectionOdesa();
                    fetchWeather(lat, lon);
                    saveSelection(lat, lon);
                    break;
                case 'Kharkiv':
                    selectionKharkiv();
                    fetchWeather(lat, lon);
                    saveSelection(lat, lon);
                    break;
                default:
                    selectionKiev();
                    fetchWeather(lat, lon);
                    saveSelection(lat, lon);
            }
        });
    });

    function selectionKiev() {
        document.body.classList.remove('odesa', 'kharkiv');
        document.body.classList.add('kiev');
    }
    
    function selectionOdesa() {
        document.body.classList.remove('kiev', 'kharkiv');
        document.body.classList.add('odesa');
    }
    
    function selectionKharkiv() {
        document.body.classList.remove('odesa', 'kiev');
        document.body.classList.add('kharkiv');
    }
    
    

    function saveSelection(lat, lon) {
        if (lat && lon) {
            savedLat = lat;
            savedLon = lon;
        }
        return { lat: savedLat, lon: savedLon };
    }
});

export function renderPageUSD(data) {
    const contentBlock = document.querySelector("#content");

    if (Array.isArray(data)) {
        const usdRate = data.find(item => item.cc === 'USD');
        if (usdRate) {
            contentBlock.innerHTML = `<p>USD: ${usdRate.rate}</p>`;
        } else {
            contentBlock.innerHTML = 'USD rate not found';
        }
    } else {
        contentBlock.innerHTML = 'No data available';
    }
}

export function renderWidget(data) {
    const { wind, main } = data;
    const contentBlock = document.querySelector("#content");
    const mainWeather = data.weather.map(element => element.main).join(', ');
    contentBlock.innerHTML = 
        `<h1 class="country-block" id="countryBlock">Country</h1>
         <p class="weather-block" id="weatherBlock">Wind: ${wind.speed} km/h</p>
         <p class="temperature-block" id="temperatureBlock">Weather: ${mainWeather.toLowerCase()}</p>
         <p class="wind-block" id="windBlock">Temperature: ${Math.floor(main.feels_like)}°C</p>`;
}
