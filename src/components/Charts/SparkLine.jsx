import React from "react";
import { SparkLineChart } from "@mui/x-charts/SparkLineChart";

const SparkLine = ({ currentColor, data, height, width }) => {
  return (
    <SparkLineChart
      data={data}
      height={height}
      width={width}
      showHighlight={true}
      showTooltip={true}
      area={true}
      curve="natural"
      color={currentColor}
    />
  );
};

export default SparkLine;
