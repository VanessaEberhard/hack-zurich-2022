import { RadialBarChart, PolarAngleAxis, RadialBar } from "recharts";

const CustomResponsiveRadialBar = ({ baseData, centerData }) => {
  return (
    <RadialBarChart width={250} height={250} data={baseData}
    innerRadius={50}
    outerRadius={100}
    barSize={15}
    startAngle={90}
    endAngle={-180}>
      <PolarAngleAxis
        type="number"
        domain={[0, 3000]}
        angleAxisId={0}
        tick={false}
      />
      <RadialBar
        background
        dataKey="value"
        cornerRadius={30 / 2}
        fill="#0BEFF2"
      />
      <text
        x={250 / 2}
        y={250 / 2}
        textAnchor="middle"
        dominantBaseline="middle"
        className="progress-label"
      >
        {centerData}
      </text>
    </RadialBarChart>
  );
};

export default CustomResponsiveRadialBar;
