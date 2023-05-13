import createHTMLElement from "./element-helper.js";
import state from "./state.js";
import { displaySearchResultWeather, displaySearchResultForecast } from "./weather.js";

// Skapar layout på sidan
const displayCard = async () => {
    const search = createHTMLElement("div", "search");

    const searchBar = createHTMLElement("input", "search-bar");
    searchBar.type = "text";
    searchBar.placeholder = "Sök på ort";
    searchBar.addEventListener("keyup", async (e) => {
        if (e.key === "Enter") {
            await displaySearchResult(searchBar.value);
        }
    });

    const searchButton = createHTMLElement("button", "search-button");
    searchButton.addEventListener("click", async () => {
        await displaySearchResult(searchBar.value);
    });

    const searchIcon = createHTMLElement("svg");
    searchIcon.innerHTML = `
    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.5rem" width="1.5rem" xmlns="http://www.w3.org/2000/svg"><path d="M19.023,16.977c-0.513-0.488-1.004-0.997-1.367-1.384c-0.372-0.378-0.596-0.653-0.596-0.653l-2.8-1.337 C15.34,12.37,16,10.763,16,9c0-3.859-3.14-7-7-7S2,5.141,2,9s3.14,7,7,7c1.763,0,3.37-0.66,4.603-1.739l1.337,2.8 c0,0,0.275,0.224,0.653,0.596c0.387,0.363,0.896,0.854,1.384,1.367c0.494,0.506,0.988,1.012,1.358,1.392 c0.362,0.388,0.604,0.646,0.604,0.646l2.121-2.121c0,0-0.258-0.242-0.646-0.604C20.035,17.965,19.529,17.471,19.023,16.977z M9,14 c-2.757,0-5-2.243-5-5s2.243-5,5-5s5,2.243,5,5S11.757,14,9,14z"></path></svg>
    `;

    searchButton.appendChild(searchIcon);
    search.appendChild(searchBar);
    search.appendChild(searchButton);

    document.querySelector("#card").appendChild(search);

    // Ett standard-sökord visas på startsidan
    await displaySearchResult(state.currentCity);
};

const handleClickOnDetails = () => {
    displaySearchResultForecast();
};

const displayWeatherOverview = (weather) => {
    const overview = createHTMLElement("div", "weather");

    const overviewContainer = createHTMLElement("div", "overview hover");
    overviewContainer.addEventListener("click", handleClickOnDetails);

    const day = createHTMLElement("h2", "day", `Idag kl ${weather.date.getHours()}:${weather.date.getMinutes()}`);
    const city = createHTMLElement("h2", "", weather.name);
    const temp = createHTMLElement("h2", "", `${weather.temp.toFixed(1)}°C`);
    const humidity = createHTMLElement("h2", "", `Luftfuktighet: ${weather.humidity}%`);
    const wind = createHTMLElement("h2", "", `Vindhastighet: ${weather.wind} m/s`);

    overviewContainer.appendChild(day);
    overviewContainer.appendChild(city);
    overviewContainer.appendChild(temp);
    overviewContainer.appendChild(humidity);
    overviewContainer.appendChild(wind);
    overview.appendChild(overviewContainer);

    document.querySelector("#card").appendChild(overview);
};

const displayWeatherForecast = (forecast) => {
    const overviewContainer = document.querySelector(".overview");
    overviewContainer.removeEventListener("click", handleClickOnDetails);
    overviewContainer.classList.remove("hover");
    overviewContainer.classList.add("filled-primary-color");

    // för att slippa utföra querySelector 9ggr så sparar vi weatherContainer som en variabel
    // för att sedan använda den variabeln i forEach-loopen
    const weatherContainer = document.querySelector(".weather");
    const detailsContainer = createHTMLElement("div", "detailsContainer");

    forecast.forEach((weather) => {
        const container = createHTMLElement("div", "details");

        const hour = createHTMLElement("span", "forecast", `kl ${weather.date.getHours()}:00`);
        const temp = createHTMLElement("span", "forecast", `${weather.temp.toFixed(1)}°C`);
        const humidity = createHTMLElement("span", "forecast", `${weather.humidity}%`);
        const wind = createHTMLElement("span", "forecast", `${weather.wind} m/s`);

        container.appendChild(hour);
        container.appendChild(temp);
        container.appendChild(humidity);
        container.appendChild(wind);

        detailsContainer.appendChild(container);
    });
    weatherContainer.appendChild(detailsContainer);
};

const displaySearchResult = async (city) => {
    if (city != null && city != undefined && city != "") {
        removeCard();
        await displaySearchResultWeather(city);
    }
};

const removeCard = () => {
    const overview = document.querySelector(".weather");
    if (overview != null) {
        overview.remove();
    }
};

export { displayCard, displayWeatherOverview, displayWeatherForecast };
