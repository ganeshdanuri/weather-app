/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { WeatherIcon } from "./WeatherIcon";

import CustomAreaChart from "./CustomAreaChart";
import DataCard from "./DataCard";
import DataSkeleton from "./DataSkeleton";

const classifyWeather = (tempCelsius) => {
  if (tempCelsius >= 20) {
    return "Clear";
  } else if (tempCelsius >= 15) {
    return "Clouds";
  } else {
    return "Rain";
  }
};

const Forecast = ({ forecast, loading }) => {
  const [chartData, setChartData] = useState([]);

  const dailyForecast = forecast?.list || [];

  console.log(chartData);

  useEffect(() => {
    const dayDataMap = {};

    dailyForecast.forEach((day) => {
      const date = new Date(day.dt * 1000).toLocaleDateString("en-US", {
        weekday: "short",
      });

      if (!dayDataMap[date]) {
        dayDataMap[date] = {
          temps: [],
          rains: [],
          humidities: [],
          pops: [],
          speeds: [],
          dt: day.dt,
        };
      }

      dayDataMap[date].temps.push(day.main.temp);
      dayDataMap[date].rains.push(day.pop * 100);
      dayDataMap[date].humidities.push(day.main.humidity);
      dayDataMap[date].pops.push(day.pop);
      dayDataMap[date].speeds.push(day.wind.speed);
    });

    const data = Object.keys(dayDataMap).map((date) => {
      const day = dayDataMap[date];
      return {
        date,
        temp: Math.round(
          day.temps.reduce((a, b) => a + b, 0) / day.temps.length
        ),
        rain: Math.round(
          day.rains.reduce((a, b) => a + b, 0) / day.rains.length
        ),
        humidity: Math.round(
          day.humidities.reduce((a, b) => a + b, 0) / day.humidities.length
        ),
        pop: Math.round(day.pops.reduce((a, b) => a + b, 0) / day.pops.length),
        dt: day.dt,
        speed: Math.round(
          day.speeds.reduce((a, b) => a + b, 0) / day.speeds.length
        ),
      };
    });

    setChartData(data);
  }, [dailyForecast]);

  if (!forecast) return null;

  let worstDataData = [];
  let bestDayData = [];

  if (chartData[0]) {
    bestDayData = [
      {
        label: "Best Day for Outdoor",
        value: new Date(
          chartData.reduce(
            (best, day) => (day.pop < best.pop ? day : best),
            chartData[0]
          ).dt * 1000
        ).toLocaleDateString("en-US", { weekday: "long" }),
        iconName: "calander-green",
        metric: "",
      },
    ];

    worstDataData = [
      {
        label: "Worst Day for Outdoor",
        value: new Date(
          chartData.reduce(
            (worst, day) => (day.pop > worst.pop ? day : worst),
            chartData[0]
          ).dt * 1000
        ).toLocaleDateString("en-US", { weekday: "long" }),
        iconName: "calander-red",
        metric: "",
      },
    ];
  }

  const humidityAndWindData = [
    {
      label: "Average Humidity",
      value: Math.round(
        chartData.reduce((acc, day) => acc + day.humidity, 0) / chartData.length
      ),
      iconName: "droplets",
      metric: "%",
    },
    {
      label: "Wind Speed Range",
      value: `${Math.min(...chartData.map((day) => day.speed))} - ${Math.max(
        ...chartData.map((day) => day.speed)
      )}`,
      iconName: "wind",
      metric: "m/s",
    },
  ];

  return (
    <Card>
      <CardHeader className="flex justify-center bg-gradient-to-r">
        <h1 className="text-2xl font-bold text-white">5-Day Forecast</h1>
      </CardHeader>
      <Divider />
      {loading ? (
        <DataSkeleton />
      ) : (
        <CardBody className="p-10 d-flex justify-center items-center">
          <div className="w-[70%] flex justify-around">
            {chartData.map((day, index) => {
              const temperature = Math.round(day.temp);
              const iconName = classifyWeather(temperature);
              return (
                <Card key={index} variant="flat" className="w-[15%]">
                  <CardBody className="flex justify-center items-center">
                    <p className="font-semibold">
                      {new Date(day.dt * 1000).toLocaleDateString("en-US", {
                        weekday: "short",
                      })}
                    </p>
                    {<WeatherIcon name={iconName} />}
                    <p className="text-lg font-bold">{temperature}°C</p>
                  </CardBody>
                </Card>
              );
            })}
          </div>

          <CustomAreaChart chartData={chartData} />

          <Divider className="my-4" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card>
              <CardBody>
                <DataCard data={humidityAndWindData} />
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <DataCard data={bestDayData} />
                <DataCard data={worstDataData} />
              </CardBody>
            </Card>
          </div>
        </CardBody>
      )}
    </Card>
  );
};

export default Forecast;
