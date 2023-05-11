import state from "./state.js";

// Skapar objekt som kan lagra information från API
const getCurrentWeatherData = async (city) => {
    const API_KEY = state.api.key;
    const API_URL = state.api.baseUrl;

    const response = await fetch(`${API_URL}weather?q=${city}&units=metric&appid=${API_KEY}&lang=sv, se`);

    const data = await response.json();
    return data;
};

const getForecastData = async (lat, lon) => {
    const API_KEY = state.api.key;
    const API_URL = state.api.baseUrl;

    const response = await fetch(`${API_URL}forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}&lang=sv, se`);

    const data = await response.json();
    return data;
};

export { getCurrentWeatherData, getForecastData };
