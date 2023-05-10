import createHTMLElement from "./element-helper.js";

// Skapar ett objekt som kan lagra information från API
const getWeather = async (city) => {
    const apiKey = "0c25f21f6f5eb3a3460e633abf9691de";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    const response = await fetch(`${url}`);
    const data = await response.json();
    console.log(data);

    const weather = new Weather(data.name, data.main.temp, data.main.feels_like, data.main.humidity, data.wind.speed);
    return weather;
};

// Skapar layout på startsidan
const displayCard = async () => {
    const search = createHTMLElement("div", "search");

    const searchBar = createHTMLElement("input", "search-bar");
    searchBar.type = "text";
    searchBar.placeholder = "Sök på ort";

    const searchButton = createHTMLElement("button");
    const searchIcon = createHTMLElement("svg");

    searchIcon.innerHTML = `
    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.5rem" width="1.5rem" xmlns="http://www.w3.org/2000/svg"><path d="M19.023,16.977c-0.513-0.488-1.004-0.997-1.367-1.384c-0.372-0.378-0.596-0.653-0.596-0.653l-2.8-1.337 C15.34,12.37,16,10.763,16,9c0-3.859-3.14-7-7-7S2,5.141,2,9s3.14,7,7,7c1.763,0,3.37-0.66,4.603-1.739l1.337,2.8 c0,0,0.275,0.224,0.653,0.596c0.387,0.363,0.896,0.854,1.384,1.367c0.494,0.506,0.988,1.012,1.358,1.392 c0.362,0.388,0.604,0.646,0.604,0.646l2.121-2.121c0,0-0.258-0.242-0.646-0.604C20.035,17.965,19.529,17.471,19.023,16.977z M9,14 c-2.757,0-5-2.243-5-5s2.243-5,5-5s5,2.243,5,5S11.757,14,9,14z"></path></svg>
    `;

    searchButton.appendChild(searchIcon);

    search.appendChild(searchBar);
    search.appendChild(searchButton);

    document.querySelector("#card").appendChild(search);

    // Ett standard-sökord visas på startsidan
    const weatherKeyword = await getWeather("jonkoping");
    displayWeatherOverview(weatherKeyword);
};

const displayWeatherOverview = (weather) => {
    const overview = createHTMLElement("div", "weather loading");

    const overviewContainer = createHTMLElement("div", "overview");
    const day = createHTMLElement("h2", "day", "Idag");
    const city = createHTMLElement("h2", "city", weather.name);
    const temp = createHTMLElement("h2", "temp", `${weather.temp}°C`);
    const humidity = createHTMLElement("h2", "humidity", `Luftfuktighet: ${weather.humidity}%`);
    const wind = createHTMLElement("h2", "wind", `Vindhastighet: ${weather.wind} m/s`);

    overviewContainer.appendChild(day);
    overviewContainer.appendChild(city);
    overviewContainer.appendChild(temp);
    overviewContainer.appendChild(humidity);
    overviewContainer.appendChild(wind);
    overview.appendChild(overviewContainer);

    document.querySelector("#card").appendChild(overview);
};

class Weather {
    constructor(name, temp, feels, humidity, wind) {
        this.name = name;
        this.temp = temp;
        this.feels = feels;
        this.humidity = humidity;
        this.wind = wind;
    }
}

displayCard();
