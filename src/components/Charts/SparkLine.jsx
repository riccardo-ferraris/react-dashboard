import React from "react";
import { SparkLineChart } from "@mui/x-charts/SparkLineChart";
import { SparklineAreaData } from "../../data/dummy";

const SparkLine = () => {
  return (
    <SparkLineChart
      data={SparklineAreaData}
      height={80}
      width={200}
      showHighlight={true}
      showTooltip={true}
      area={true}
      sx={{
        ".MuiSparkLine-root": {
          stroke: "#1976d2",
          strokeWidth: 2,
        },
        ".MuiSparkLine-area": {
          fill: "#1976d233",
        },
      }}
    />
  );
};

export default SparkLine;
