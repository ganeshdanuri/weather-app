import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const CustomAreaChart = ({ chartData }) => {
  return (
    <ResponsiveContainer width="80%" height={300}>
      <AreaChart
        width={800}
        height={400}
        data={chartData}
        margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
        <Tooltip labelStyle={{ color: "black" }} />
        <Legend />
        <Area
          type="monotone"
          dataKey="temp"
          stroke="#8884d8"
          fillOpacity={0.3}
          fill="#8884d8"
          yAxisId="left"
        />
        <Area
          type="monotone"
          dataKey="rain"
          stroke="#82ca9d"
          fillOpacity={0.3}
          fill="#82ca9d"
          yAxisId="right"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default CustomAreaChart;
