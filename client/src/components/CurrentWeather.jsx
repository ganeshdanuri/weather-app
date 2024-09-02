import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { WeatherIcon } from "./WeatherIcon";

import DataSkeleton from "./DataSkeleton";
import DataCard from "./DataCard";

const CurrentWeather = ({ weather, searchCity, loading }) => {
  if (!weather) return null;

  const chartData = [
    { name: "Temperature", value: Math.round(weather.main.temp) },
    { name: "Feels Like", value: Math.round(weather.main.feels_like) },
    { name: "Min Temp", value: Math.round(weather.main.temp_min) },
    { name: "Max Temp", value: Math.round(weather.main.temp_max) },
  ];

  const humidityAndWindData = [
    {
      label: "Humidity",
      value: weather?.main?.humidity,
      iconName: "droplets",
      metric: "%",
    },
    {
      label: "Wind Speed",
      value: weather?.wind?.speed,
      iconName: "wind",
      metric: "m/s",
    },
  ];

  const visibilityAndCloudData = [
    {
      label: "Visibility",
      value: weather?.visibility / 1000,
      iconName: "eye",
      metric: "km",
    },
    {
      label: "Cloudiness",
      value: weather?.clouds.all,
      iconName: "wind",
      metric: "%",
    },
  ];

  return (
    <Card className=" border-gray-200 dark:border-gray-700">
      <CardHeader className="flex justify-center bg-gradient-to-r">
        <h1 className="text-2xl font-bold">Current Weather in {searchCity}</h1>
      </CardHeader>
      <Divider />
      <div className="flex flex-col lg:flex-row w-full justify-center gap-3 p-10">
        {loading ? (
          <DataSkeleton />
        ) : (
          <Card className="w-[100%] lg:w-[40%]">
            <CardHeader className="flex gap-3">
              <div className="my-2">
                {<WeatherIcon name={weather?.weather[0]?.main} />}
              </div>
              <div className="flex flex-col">
                <p className="text-lg">
                  {new Date(weather?.dt * 1000).toLocaleDateString()}
                </p>
                <p className="text-3xl font-bold">
                  {Math.round(weather?.main?.temp)}°C
                </p>
                <p className="text-xl">{weather?.weather[0]?.description}</p>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              <DataCard data={humidityAndWindData} />
            </CardBody>
            <Divider />
            <CardBody>
              <DataCard data={visibilityAndCloudData} />
            </CardBody>
          </Card>
        )}

        {!loading ? (
          <Card className="w-[100%] lg:w-[40%] flex justify-center items-center p-2">
            <ResponsiveContainer width="70%" height={300}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip labelStyle={{ color: "black" }} />
                <Bar dataKey="value" fill="#FFE0B5" name="Temperature (°C)" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        ) : (
          <DataSkeleton />
        )}
      </div>
    </Card>
  );
};

export default CurrentWeather;
