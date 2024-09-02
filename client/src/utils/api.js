import axios from "axios";

const API_KEY = "4fd35feb74566cb8a3b63ec19ca63953"; // Replace with your actual API key
const PRO_BASE_URL = "https://pro.openweathermap.org/data/2.5";
const FREE_BASE_URL = "https://api.openweathermap.org/data/2.5";

export const fetchWeather = async (city) => {
  try {
    const response = await axios.get(`${FREE_BASE_URL}/weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units: "metric",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};

export const fetchForecast = async ({ lat, lon }) => {
  try {
    const response = await axios.get(`${FREE_BASE_URL}/forecast`, {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: "metric",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching forecast data:", error);
    throw error;
  }
};
