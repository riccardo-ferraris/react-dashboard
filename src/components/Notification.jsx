import { MdOutlineCancel } from "react-icons/md";
import { chatData } from "../data/chatData";
import { useStateContext } from "../contexts/ContextProvider";

const Notification = () => {
  const { currentColor, setIsClicked } = useStateContext();

  const handleCloseNotification = () => {
    setIsClicked({
      chat: false,
      cart: false,
      userProfile: false,
      notification: false,
    });
  };

  return (
    <div className="nav-item absolute right-5 md:right-40 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96 border-1 border-gray-200 dark:border-gray-600 shadow-lg">
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <p className="font-semibold text-lg dark:text-gray-200">
            Notifications
          </p>
          <button
            type="button"
            className="dark:text-white text-xs rounded p-1 px-2 bg-orange-theme "
          >
            5 New
          </button>
        </div>
        <button
          type="button"
          onClick={handleCloseNotification}
          className="text-xl p-2 cursor-pointer text-gray-400"
        >
          <MdOutlineCancel />
        </button>
      </div>
      <div className="mt-5 ">
        {chatData?.map((item, index) => (
          <div
            key={index}
            className="flex items-center leading-8 gap-5 border-b-1 border-color p-3"
          >
            <img
              className="rounded-full h-10 w-10"
              src={item.image}
              alt={item.message}
            />
            <div>
              <p className="font-semibold dark:text-gray-200">{item.message}</p>
              <p className="text-gray-500 text-sm dark:text-gray-400">
                {" "}
                {item.desc}{" "}
              </p>
            </div>
          </div>
        ))}
        <div className="mt-5">
          <button
            className="text-white font-semibold p-2 rounded transition-colors cursor-pointer hover:opacity-90 w-full"
            style={{ backgroundColor: currentColor }}
          >
            See all notifications
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notification;
