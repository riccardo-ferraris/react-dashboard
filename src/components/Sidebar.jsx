import { Link, NavLink } from "react-router-dom";
import { SiTrustedshops } from "react-icons/si";
import { MdOutlineCancel } from "react-icons/md";
import { Tooltip } from "@mui/material";
import { links } from "../data/links";
import { useStateContext } from "../contexts/ContextProvider";
import Colors from "../colors";

const Sidebar = () => {
  const { activeMenu, setActiveMenu, screenSize, setIsClicked, currentColor } =
    useStateContext();

  const handleCloseSidebar = () => {
    if (activeMenu && screenSize <= 900) {
      setActiveMenu(false);
    }
    setIsClicked({
      chat: false,
      cart: false,
      userProfile: false,
      notification: false,
    });
  };

  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white text-md m-2";
  const normalLink = `flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-gray-100 dark:hover:bg-gray-300 m-2`;

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link
              to="/"
              onClick={handleCloseSidebar}
              className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
            >
              <SiTrustedshops /> <span>KevDev Dashboard</span>
            </Link>
            <Tooltip title="Menu">
              <button
                type="button"
                onClick={() => setActiveMenu((prev) => !prev)}
                className="text-xl rounded-full p-3 mt-4 block md:hidden cursor-pointer"
                style={{ hover: { backgroundColor: Colors.lightGray } }}
              >
                <MdOutlineCancel />
              </button>
            </Tooltip>
          </div>
          <div className="mt-10">
            {links.map((item) => (
              <div key={item.title}>
                <p className="text-gray-400 m-3 mt-4 uppercase">{item.title}</p>
                {item.links.map((link) => (
                  <NavLink
                    to={`/${link.name}`}
                    key={link.name}
                    onClick={handleCloseSidebar}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? currentColor : "",
                    })}
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                  >
                    {link.icon}
                    <span className="capitalize">{link.name}</span>
                  </NavLink>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
