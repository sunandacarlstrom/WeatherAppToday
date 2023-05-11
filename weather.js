import { displayWeatherOverview } from "./dom.js";
import {getCurrentWeatherData, getForecastData} from './http.js';

// Skapar en klass för att omvandla datat från API till en egen objektmodell med några egenskaper
class Weather {
    constructor(name, temp, feels, humidity, wind) {
        this.name = name;
        this.temp = temp;
        this.feels = feels;
        this.humidity = humidity;
        this.wind = wind;
    }
}

const createWeather = (data) => {
    return new Weather(data.name, data.main.temp, data.main.feels_like, data.main.humidity, data.wind.speed);
};

const displaySearchResultWeather = async (city) => {
    const data = await getCurrentWeatherData(city);
    const currentWeather = createWeather(data);
    displayWeatherOverview(currentWeather);
};

export { displaySearchResultWeather };
