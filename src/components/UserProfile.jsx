import { MdOutlineCancel } from "react-icons/md";

import { userProfileData } from "../data/userProfileData";
import { useStateContext } from "../contexts/ContextProvider";
import avatar from "../data/avatar.jpg";

const UserProfile = () => {
  const { currentColor, setIsClicked } = useStateContext();

  const handleCloseUserProfile = () => {
    setIsClicked({
      chat: false,
      cart: false,
      userProfile: false,
      notification: false,
    });
  };

  return (
    <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96 border-1 border-gray-200 dark:border-gray-600 shadow-lg">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200">User Profile</p>
        <button
          type="button"
          onClick={handleCloseUserProfile}
          className="text-xl p-2 cursor-pointer text-gray-400"
        >
          <MdOutlineCancel />
        </button>
      </div>
      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
        <img
          className="rounded-full h-24 w-24"
          src={avatar}
          alt="user-profile"
        />
        <div>
          <p className="font-semibold text-xl dark:text-gray-200">
            Riccardo Ferraris
          </p>
          <p className="text-gray-500 text-sm dark:text-gray-400">
            Administrator
          </p>
          <p className="text-gray-500 text-sm font-semibold dark:text-gray-400">
            github.com/riccardo-ferraris
          </p>
        </div>
      </div>
      <div>
        {userProfileData.map((item, index) => (
          <div
            key={index}
            className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]"
          >
            <button
              type="button"
              style={{ color: item.iconColor, backgroundColor: item.iconBg }}
              className=" text-xl rounded-lg p-3 hover:bg-light-gray"
            >
              {item.icon}
            </button>

            <div>
              <p className="font-semibold dark:text-gray-200 ">{item.title}</p>
              <p className="text-gray-500 text-sm dark:text-gray-400">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5">
        <button
          className="w-full text-white font-semibold p-2 rounded transition-colors cursor-pointer hover:opacity-90 mt-4"
          style={{ backgroundColor: currentColor }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
