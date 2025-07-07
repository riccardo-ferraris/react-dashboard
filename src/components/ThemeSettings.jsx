import React from "react";
import { MdOutlineCancel } from "react-icons/md";
import { Tooltip } from "@mui/material";
import { BsCheck } from "react-icons/bs";
import { themeColors } from "../data/dummy";
import { useStateContext } from "../contexts/ContextProvider";

const ThemeSettings = () => {
  const { setColor, setMode, currentMode, currentColor, setThemeSettings } =
    useStateContext();

  return (
    <div className="bg-black/50 fixed inset-0 z-50">
      <div
        className={`w-96 h-full float-right dark:text-gray-200 bg-white dark:bg-[#33373E] p-4`}
      >
        <div className="flex justify-between items-center p-4">
          <p className="font-semibold text-xl">Settings</p>
          <button
            type="button"
            onClick={() => setThemeSettings(false)}
            style={{ color: "rgb(153, 171, 180)", borderRadius: "50%" }}
            className="text-2xl p-3 cursor-pointer"
          >
            <MdOutlineCancel />
          </button>
        </div>

        <div className="flex-col border-t-1 border-gray-300 p-4">
          <p className="font-semibold text-lg">Theme Options</p>
          <div className="mt-4">
            <input
              type="radio"
              id="light"
              name="theme"
              value="Light"
              className="cursor-pointer"
              onChange={setMode}
              checked={currentMode === "Light"}
            />
            <label htmlFor="light" className="ml-2 text-md cursor-pointer">
              Light
            </label>
          </div>

          <div className="mt-4">
            <input
              type="radio"
              id="dark"
              name="theme"
              value="Dark"
              className="cursor-pointer"
              onChange={setMode}
              checked={currentMode === "Dark"}
            />
            <label htmlFor="dark" className="ml-2 text-md cursor-pointer">
              Dark
            </label>
          </div>
        </div>

        <div className="flex-col border-t-1 border-gray-300 p-4">
          <p className="font-semibold text-lg">Theme Colors</p>
          <div className="flex gap-3">
            {themeColors.map((item, index) => (
              <Tooltip key={index} title={item.name} placement="top">
                <button
                  type="button"
                  className="relative rounded-full w-10 h-10 mt-2 cursor-pointer"
                  style={{ backgroundColor: item.color }}
                  onClick={() => setColor(item.color)}
                >
                  <span
                    className={`absolute inset-0 flex items-center justify-center ${
                      item.color === currentColor ? "block" : "hidden"
                    }`}
                  >
                    <BsCheck className="text-white" />
                  </span>
                </button>
              </Tooltip>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeSettings;
