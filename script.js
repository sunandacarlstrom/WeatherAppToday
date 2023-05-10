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
    searchIcon.setAttribute("stroke", "currentColor");
    searchIcon.setAttribute("fill", "currentColor");
    searchIcon.setAttribute("stroke-width", "0");
    searchIcon.setAttribute("version", "1.1");
    searchIcon.setAttribute("viewBox", "0 0 16 16");
    searchIcon.setAttribute("height", "1.5rem");
    searchIcon.setAttribute("width", "1.5rem");
    searchIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    const searchPath = createHTMLElement("path", "", "\n ");
    searchPath.setAttribute(
        "d",
        "M15.504 13.616l-3.79-3.223c-0.392-0.353-0.811-0.514-1.149-0.499 0.895-1.048 1.435-2.407 1.435-3.893 0-3.314-2.686-6-6-6s-6 2.686-6 6 2.686 6 6 6c1.486 0 2.845-0.54 3.893-1.435-0.016 0.338 0.146 0.757 0.499 1.149l3.223 3.79c0.552 0.613 1.453 0.665 2.003 0.115s0.498-1.452-0.115-2.003zM6 10c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4z"
    );

    //TODO: fixa så att sök-ikonen syns!
    searchIcon.appendChild(searchPath);
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
