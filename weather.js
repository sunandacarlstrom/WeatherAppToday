import { displayWeatherOverview, displayWeatherForecast } from "./dom.js";
import { getWeatherData } from "./http.js";
import state from "./state.js";

// Skapar en klass för att omvandla datat från API till en egen objektmodell med några egenskaper
class Weather {
    constructor(name, temp, feels, humidity, wind, date) {
        this.name = name;
        this.temp = temp;
        this.feels = feels;
        this.humidity = humidity;
        this.wind = wind;

        // Beroende på vilket api man använder weather eller forecast.
        // Om date parametern finns skapas ett Date objekt med det datumet och tiden.
        // Annars skapas ett Date objekt med det nuvarande datumet och tiden,
        // altså ett Date objekt med tom parameter, till höger om ":"
        this.date = date != undefined && date != null ? new Date(date) : new Date();
    }
}

const createWeather = (data) => {
    return new Weather(data.name, data.main.temp, data.main.feels_like, data.main.humidity, data.wind.speed, data.dt_txt);
};

const displaySearchResultWeather = async (city) => {
    // Uppdaterar stad efter sökning, används senare i forecast nedanför
    state.currentCity = city;
    const data = await getWeatherData("weather", city);
    const currentWeather = createWeather(data);
    displayWeatherOverview(currentWeather);
};

const displaySearchResultForecast = async () => {
    // Hämtar stad efter sökning, uppdaterades när man sökte efter vädret i en stad
    // datat som retuneras är en array
    const data = await getWeatherData("forecast", state.currentCity);
    // Skapar en tom array...
    var forecast = [];
    // ...för att nu översätta datat (den array från api) till en array med weather objekt
    // vill få ut prognosen under ett dygn och hämtar därför endast 9st objekt från arrayen
    for (let i = 0; i < 9; i++) {
        forecast[i] = createWeather(data.list[i]);
    }
    displayWeatherForecast(forecast);
};

export { displaySearchResultWeather, displaySearchResultForecast };
