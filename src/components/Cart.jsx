import { useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { useStateContext } from "../contexts/ContextProvider";
import { Button } from "@mui/material"; // Puoi usare MUI o qualsiasi altro componente di UI
import Colors from "../colors";

const Cart = () => {
  const {
    isClicked,
    setIsClicked,
    handleClick,
    screenSize,
    currentMode,
    currentColor,
  } = useStateContext();
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Product 1",
      price: 20,
      quantity: 1,
      image: "https://dummyimage.com/600x600/000/fff&text=Product+1",
    },
    {
      id: 2,
      name: "Product 2",
      price: 15,
      quantity: 2,
      image: "https://dummyimage.com/600x600/000/fff&text=Product+2",
    },
  ]);

  const handleCloseCart = () => {
    setIsClicked({
      chat: false,
      cart: false,
      userProfile: false,
      notification: false,
    });
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const updateQuantity = (id, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(item.quantity + delta, 0) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <div className="bg-black/50 fixed inset-0 z-50">
      <div
        className={`fixed top-0 right-0 z-50 w-80 h-full shadow-lg p-5 dark:text-white transition-transform transform ${
          isClicked.cart ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          transition: "transform 0.3s ease-in-out",
          backgroundColor:
            currentMode === "Dark" ? Colors.secondaryDarkBg : "white",
        }}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Shopping Cart</h2>
          <button
            type="button"
            onClick={handleCloseCart}
            className="text-xl p-2 cursor-pointer text-gray-400"
          >
            <MdOutlineCancel />
          </button>
        </div>

        <div className="border-b border-gray-600 dark:border-gray-400 mt-4" />

        <div className="mt-4">
          {cartItems.length === 0 ? (
            <p>Your cart is empty!</p>
          ) : (
            <div>
              {cartItems.map((item, index) => (
                <div key={item.id}>
                  <div className="flex justify-between items-center my-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded object-cover"
                      />
                      <div>
                        <p className="text-md font-semibold">{item.name}</p>
                        <p className="text-sm text-gray-500">
                          Price: ${item.price}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="px-2 py-1 text-lg font-semibold text-gray-600 hover:text-black dark:text-gray-300 cursor-pointer"
                          >
                            −
                          </button>
                          <span className="text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="px-2 py-1 text-lg font-semibold text-gray-600 hover:text-black dark:text-gray-300 cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-md font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {index !== cartItems.length - 1 && (
                    <div className="border-b border-gray-200 dark:border-gray-500" />
                  )}
                </div>
              ))}

              <div className="border-b border-gray-600 dark:border-gray-400 mt-4" />

              <div className="mt-4 flex justify-between items-center">
                <p className="text-lg font-semibold">Total</p>
                <p className="text-lg font-semibold">
                  ${calculateTotal().toFixed(2)}
                </p>
              </div>
              <div className="mt-4">
                <button
                  type="button"
                  className="w-full text-white font-semibold py-2 rounded transition-colors cursor-pointer hover:opacity-90"
                  style={{
                    backgroundColor: currentColor,
                  }}
                >
                  Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
