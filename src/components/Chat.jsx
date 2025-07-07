import React from "react";
import { MdOutlineCancel } from "react-icons/md";
import { chatData } from "../data/chatData";
import { useStateContext } from "../contexts/ContextProvider";

const Chat = () => {
  const { currentColor, setIsClicked } = useStateContext();

  const handleCloseChat = () => {
    setIsClicked({
      chat: false,
      cart: false,
      userProfile: false,
      notification: false,
    });
  };

  return (
    <div className="nav-item absolute right-5 md:right-52 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96 border-1 border-gray-200 dark:border-gray-600 shadow-lg">
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <p className="font-semibold text-lg dark:text-gray-200">Messages</p>
          <p className="dark:text-white text-xs rounded p-1 px-2 bg-orange">
            5 New
          </p>
        </div>
        <button
          type="button"
          onClick={handleCloseChat}
          className="text-xl p-2 cursor-pointer text-gray-400"
        >
          <MdOutlineCancel />
        </button>
      </div>
      <div className="mt-5 ">
        {chatData?.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-5 border-b-1 border-color p-3 leading-8 cursor-pointer"
          >
            <div className="relative">
              <img
                className="rounded-full h-10 w-10"
                src={item.image}
                alt={item.message}
              />
              <span
                style={{ background: item.dotColor }}
                className="absolute inline-flex rounded-full h-2 w-2 right-0 -top-1"
              />
            </div>
            <div>
              <p className="font-semibold dark:text-gray-200 ">
                {item.message}
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {item.desc}
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-xs">
                {item.time}
              </p>
            </div>
          </div>
        ))}
        <div className="mt-5">
          <button
            type="button"
            className="text-white font-semibold p-2 rounded transition-colors cursor-pointer hover:opacity-90 w-full"
            style={{ backgroundColor: currentColor }}
          >
            See all messages
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
