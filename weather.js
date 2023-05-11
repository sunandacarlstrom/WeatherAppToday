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

        // Beroende på vilket api man använder weather eller forecast
        this.date = date != undefined && date != null ? new Date(date) : new Date();
    }
}

const createWeather = (data) => {
    return new Weather(data.name, data.main.temp, data.main.feels_like, data.main.humidity, data.wind.speed, data.dt_txt);
};

const displaySearchResultWeather = async (city) => {
    // Ändrar stad efter sökning, används senare i details nedanför
    state.currentCity = city;
    const data = await getWeatherData("weather", city);
    const currentWeather = createWeather(data);
    displayWeatherOverview(currentWeather);
};

const displaySearchResultForecast = async () => {
    // Hämtar stad efter sökning, sattes när man sökte efter stad
    const data = await getWeatherData("forecast", state.currentCity);
    var forecast = [];

    for (let i = 0; i < 9; i++) {
        forecast[i] = createWeather(data.list[i]);
    }
    displayWeatherForecast(forecast);
};

export { displaySearchResultWeather, displaySearchResultForecast };
