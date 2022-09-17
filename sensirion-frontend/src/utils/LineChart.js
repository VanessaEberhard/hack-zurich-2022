import {
  ResponsiveContainer,
  LineChart,
  XAxis,
//   YAxis,
  Tooltip,
  CartesianGrid,
  Line,
  Legend,
} from "recharts";

const CustomLineChart = ({ data, lines }) => {
  if (!data) return;
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart
        data={data}
        margin={{ top: 30, right: 20, left: 20, bottom: 5 }}
      >
        <XAxis
          dataKey="name"
          height={100}
          angle={-90}
          textAnchor="end"
          interval={0}
        />

        {/* {(lines || []).map(
          (line, index) =>
            line.selected && (
              <YAxis
                dataKey={line.value}
                width={5}
                interval={0}
                yAxisId={index}
              />
            )
        )} */}
        <Tooltip />
        <CartesianGrid stroke="#f5f5f5" />
        {(lines || []).map(
          (line, index) =>
            line.selected && (
              <Line
                type="monotone"
                dataKey={line.value}
                stroke={line.color}
                name={line.name}
                yAxisId={index}
                key={line.value}
              />
            )
        )}

        <Legend />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CustomLineChart;
