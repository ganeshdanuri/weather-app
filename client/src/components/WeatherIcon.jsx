import {
  Calendar,
  Cloud,
  CloudRain,
  Droplets,
  Eye,
  Sun,
  Wind,
} from "lucide-react";

export const WeatherIcon = ({ name }) => {
  switch (name) {
    case "Clear":
      return <Sun className="text-yellow-400" size={24} />;
    case "Clouds":
      return <Cloud className="text-gray-400" size={24} />;
    case "Rain":
      return <CloudRain className="text-green-400" size={24} />;
    case "calander-green":
      return <Calendar className="text-green-500 mr-2" />;
    case "calander-red":
      return <Calendar className="text-red-500 mr-2" />;
    case "wind":
      return <Wind className="text-gray-500 mr-2" />;
    case "droplets":
      return <Droplets className="text-blue-500 mr-2" />;
    case "eye":
      return <Eye className="text-green-500 mr-2" />;
    default:
      return <Sun className="text-yellow-400" size={32} />;
  }
};
