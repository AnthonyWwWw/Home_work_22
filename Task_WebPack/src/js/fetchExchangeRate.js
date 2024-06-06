import { renderPageUSD } from './main.js';

export function fetchExchangeRate() {
    const URLRespouns = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';

    function fetchResponse(URL) {
        return new Promise((resolve, reject) => {
            fetch(URL)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error');
                    }
                    return response.json();
                })
                .then(data => resolve(data))
                .catch(error => reject(error));
        });
    }

    fetchResponse(URLRespouns)
        .then(data => {
            renderPageUSD(data);
        })
        .catch(error => console.error(error));
}
