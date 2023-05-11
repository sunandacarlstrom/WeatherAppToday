import state from "./state.js";

const getWeatherData = async (endpoint, city) => {
    const API_KEY = state.api.key;
    const API_URL = state.api.weatherUrl;

    const coordinatesData = await getCityCoordinates(city);

    const response = await fetch(`${API_URL}${endpoint}?lat=${coordinatesData.latitude}&lon=${coordinatesData.longitude}&units=metric&appid=${API_KEY}&lang=sv, se`);

    const data = await response.json();
    return data;
};

const getCityCoordinates = async (city) => {
    const API_KEY = state.api.key;
    const API_URL = state.api.geoCodingUrl;

    const countryCode = "SE";
    const limit = 1;

    const coordinates = {
        latitude: 0,
        longitude: 0,
    };

    const response = await fetch(`${API_URL}${city},${countryCode}&limit=${limit}&appid=${API_KEY}`);

    const data = await response.json();

    coordinates.latitude = data[0].lat;
    coordinates.longitude = data[0].lon;

    return coordinates;
};

export { getWeatherData };
