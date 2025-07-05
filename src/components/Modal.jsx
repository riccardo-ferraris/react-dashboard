import ReactDOM from "react-dom";

const Modal = ({ isOpen, title, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-10000 bg-black/60 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black cursor-pointer"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};
export default Modal;
