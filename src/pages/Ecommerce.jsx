import React from "react";
import { BsCurrencyDollar } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";
import { StackedChart, Button, SparkLine } from "../components";
import { earningData, SparklineAreaData } from "../data/dummy";
import { useStateContext } from "../contexts/ContextProvider";
import Colors from "../colors";

import chartJson from "../data/stackedChartData.json";

const Ecommerce = () => {
  const { currentColor, currentMode } = useStateContext();
  return (
    <div>
      <div className="flex flex-wrap lg:flex-nowrap justify-center">
        <div
          className="dark:text-gray-200 h-44 rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center"
          style={{
            backgroundColor:
              currentMode === "Dark" ? Colors.secondaryDarkBg : "white",
          }}
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold text-gray-400">Earnings</p>
              <p className="text-2xl">$63.448,78</p>
            </div>
          </div>
          <div className="mt-6">
            <Button
              color="white"
              bgColor={currentColor}
              text="Download"
              borderRadius="10px"
              size="md"
            />
          </div>
        </div>

        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
          {earningData.map((item) => (
            <div
              key={item.title}
              className="dark:text-gray-200 md:w-56 p-4 pt-9 rounded-2xl"
              style={{
                backgroundColor:
                  currentMode === "Dark" ? Colors.secondaryDarkBg : "white",
              }}
            >
              <button
                type="button"
                style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl"
              >
                {item.icon}
              </button>
              <p className="mt-3">
                <span className="text-lg font-semibold">{item.amount}</span>
                <span className={`text-sm ${item.pcColor} ml-2`}>
                  {item.percentage}
                </span>
              </p>
              <p className="text-sm text-gray-400 mt-1">{item.title}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-10 flex-wrap justify-center">
        <div
          className="dark:text-gray-200 m-3 rounded-2xl w-full p-8 lg:w-2/3 lg:min-w-4xl"
          style={{
            backgroundColor:
              currentMode === "Dark" ? Colors.secondaryDarkBg : "white",
          }}
        >
          <div className="flex justify-between">
            <p className="font-semibold text-xl">Revenue Updates</p>
          </div>

          <div className="flex flex-col xl:flex-row items-center gap-10 justify-center">
            <div className="mt-10 flex gap-2 flex-wrap w-1/3 justify-center xl:border-r-1 xl:border-b-0 border-b-1 border-gray-300 flex-col">
              <div className="m-4 pr-10">
                <div>
                  <p>
                    <span className="text-3xl font-semibold">$93.438</span>
                    <span className="p-1.5 hover:drop-shadow-xl cursor-pointer rounded-full text-white bg-green-400 ml-3 text-xs">
                      23%
                    </span>
                  </p>
                  <p className="text-gray-500 mt-1">Budget</p>
                </div>
              </div>

              <div className="m-4 pr-10">
                <div>
                  <p>
                    <span className="text-3xl font-semibold">$48.438</span>
                  </p>
                  <p className="text-gray-500 mt-1">Expense</p>
                </div>

                <div className="mt-5">
                  <SparkLine
                    currentColor={currentColor}
                    id="line-sparkline"
                    type="Line"
                    height="80"
                    width="300"
                    data={SparklineAreaData}
                  />
                </div>

                <div className="mt-10">
                  <Button
                    color="white"
                    bgColor={currentColor}
                    text="Download Report"
                    borderRadius="10px"
                    size="md"
                  />
                </div>
              </div>
            </div>

            <div>
              <StackedChart
                chartData={chartJson.series}
                chartLabels={chartJson.labels}
                xAxisLabel={chartJson.xAxisLabel}
                yAxisLabel={chartJson.yAxisLabel}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ecommerce;
