import { MdDelete, MdEdit } from "react-icons/md";

const ProductCard = ({ product, onEdit, onDelete }) => {
  return (
    <div className="w-72 bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {product.name}
          </h3>
          <p className="text-sm text-gray-600 mt-2">{product.description}</p>
        </div>

        <div>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-lg font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>

            <p
              className={`text-sm mt-2 ${
                product.quantity > 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {product.quantity > 0 ? "In Stock" : "Out of Stock"}
            </p>
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => onEdit(product)}
              className="rounded-full bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 text-sm transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <MdEdit />
            </button>
            <button
              type="button"
              onClick={() => onDelete(product.id)}
              className="rounded-full bg-red-500 text-white hover:bg-red-600 px-4 py-2 text-sm transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <MdDelete />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
