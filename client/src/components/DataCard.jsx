import { Code } from "@nextui-org/react";
import { WeatherIcon } from "./WeatherIcon";

const DataCard = ({ data }) => {
  return (
    <div>
      {data.map((eachData) => {
        const { label, value, iconName, metric } = eachData;
        return (
          <div className="flex items-center pt-2" key={label}>
            {<WeatherIcon name={iconName} />}
            <p>
              <strong>{eachData.label}:</strong>{" "}
              <Code>
                {value} {metric}
              </Code>
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default DataCard;
