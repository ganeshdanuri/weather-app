import { useEffect, useState } from "react";
import { Spacer } from "@nextui-org/react";

import CurrentWeather from "./CurrentWeather";
import Forecast from "./Forecast";
import SearchCard from "./SearchCard";
import { fetchForecast, fetchWeather } from "../utils/api";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [searchCity, setSearchCity] = useState("London");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    weather: null,
    forecast: null,
    error: false,
  });

  useEffect(() => {
    if (!searchCity) {
      toast.error("Enter valid city name");
      return;
    }
    setLoading(true);
    setData((prev) => {
      return { ...prev, error: false };
    });
    const fetchData = async () => {
      try {
        const weatherData = await fetchWeather(searchCity);
        if (weatherData?.coord?.lat) {
          const forecastData = await fetchForecast(weatherData?.coord);
          if (forecastData) {
            setData({ weather: weatherData, forecast: forecastData });
            setLoading(false);
          }
        }
      } catch (error) {
        console.log(error);
        toast.error("city not found");
        setLoading(false);
        setData((prev) => {
          return { ...prev, error: true };
        });
      }
    };

    fetchData();
  }, [searchCity]);

  return (
    <div className="p-5 min-h-screen">
      <SearchCard setSearchCity={setSearchCity} loading={loading} />
      <Spacer y={2} />
      {!data.error && (
        <>
          <CurrentWeather
            weather={data.weather}
            searchCity={searchCity}
            loading={loading}
          />
          <Spacer y={2} />
          <Forecast forecast={data.forecast} loading={loading} />
        </>
      )}
    </div>
  );
};

export default Dashboard;
