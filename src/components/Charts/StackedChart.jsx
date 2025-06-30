import React from "react";
import { LineChart } from "@mui/x-charts/LineChart";

const StackedChart = ({ chartData, chartLabels, xAxisLabel, yAxisLabel }) => {
  return (
    <LineChart
      width={500}
      height={300}
      xAxis={[
        {
          data: chartLabels,
          scaleType: "band",
          label: xAxisLabel,
        },
      ]}
      yAxis={[{ label: yAxisLabel }]}
      series={chartData}
    />
  );
};

export default StackedChart;
