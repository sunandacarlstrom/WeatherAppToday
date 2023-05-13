import state from "./state.js";

const getWeatherData = async (endpoint, city) => {
    const API_KEY = state.api.key;
    const API_URL = state.api.weatherUrl;

    const coordinatesData = await getCityCoordinates(city);

    // Sparar svaret i en variabel
    // Endpoint = Weather eller Forecast
    // Nuvarande väder eller progonos hämtas utifrån vad som skrivs i endpointen
    const response = await fetch(`${API_URL}${endpoint}?lat=${coordinatesData.latitude}&lon=${coordinatesData.longitude}&units=metric&appid=${API_KEY}&lang=sv, se`);

    const data = await response.json();
    return data;
};

const getCityCoordinates = async (city) => {
    const API_KEY = state.api.key;
    const API_URL = state.api.geoCodingUrl;

    const countryCode = "SE";
    const limit = 1;

    const response = await fetch(`${API_URL}${city},${countryCode}&limit=${limit}&appid=${API_KEY}`);

    const data = await response.json();

    // skapar ett objekt med latitude och longitude koordinater,
    // samtidigt som jag initierar varaiablerna i objektet
    const coordinates = {
        latitude: data[0].lat,
        longitude: data[0].lon,
    };

    return coordinates;
};

export { getWeatherData };
