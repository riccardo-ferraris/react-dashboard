import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { Fab, Tooltip } from "@mui/material";
import { Navbar, Footer, Sidebar, ThemeSettings } from "./components";
import {
  Ecommerce,
  Orders,
  Calendar,
  Employees,
  Products,
  Customers,
  Kanban,
} from "./pages";

import "./App.css";
import Colors from "./colors";
import { useStateContext } from "./contexts/ContextProvider";

const App = () => {
  const {
    activeMenu,
    themeSettings,
    setThemeSettings,
    currentColor,
    currentMode,
  } = useStateContext();

  const bgColor = currentMode === "Dark" ? Colors.mainDarkBg : Colors.mainBg;

  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <BrowserRouter>
        <div className={"flex relative"} style={{ backgroundColor: bgColor }}>
          <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
            <Tooltip title="Settings">
              <Fab
                sx={{
                  backgroundColor: currentColor,
                  color: "white",
                  fontSize: "20px",
                  "&:hover": {
                    backgroundColor: `${currentColor}99`,
                  },
                }}
                onClick={() => setThemeSettings(true)}
              >
                <FiSettings />
              </Fab>
            </Tooltip>
          </div>
          {activeMenu ? (
            <div
              className="w-72 fixed sidebar"
              style={{
                backgroundColor:
                  currentMode === "Dark" ? Colors.secondaryDarkBg : "white",
              }}
            >
              <Sidebar />
            </div>
          ) : (
            <div
              className="w-0"
              style={{
                backgroundColor:
                  currentMode === "Dark" ? Colors.secondaryDarkBg : "",
              }}
            >
              <Sidebar />
            </div>
          )}
          <div
            className={`min-h-screen w-full ${
              activeMenu ? "md:ml-72" : "flex-2"
            }`}
            style={{ backgroundColor: bgColor }}
          >
            <div
              className="fixed md:static navbar w-full"
              style={{ backgroundColor: bgColor }}
            >
              <Navbar />
            </div>

            <div
              className="pt-12"
              style={{
                backgroundColor:
                  currentMode === "Dark" ? Colors.mainDarkBg : Colors.lightGray,
              }}
            >
              {themeSettings && <ThemeSettings />}

              <Routes>
                {/* Dashboard */}
                <Route path="/" element={<Ecommerce />} />
                <Route path="/ecommerce" element={<Ecommerce />} />

                {/* Pages */}
                <Route path="/orders" element={<Orders />} />
                <Route path="/employees" element={<Employees />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/products" element={<Products />} />

                {/* Apps */}
                <Route path="/kanban" element={<Kanban />} />
                <Route path="/calendar" element={<Calendar />} />
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
