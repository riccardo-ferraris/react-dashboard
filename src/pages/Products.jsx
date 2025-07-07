import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { Header, Modal, ProductCard } from "../components";
import { productsData } from "../data/productsData";
import { useStateContext } from "../contexts/ContextProvider";

const Products = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState({
    modalOpen: false,
    productId: null,
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState(productsData);
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    image: "",
    quantity: "",
    price: "",
  });
  const { currentColor } = useStateContext();

  // Open modal for adding a new product
  const handleAddProduct = () => {
    setSelectedProduct({
      id: null,
      name: "",
      description: "",
      image: "",
      quantity: 0,
      price: 0,
    });
    setOpenModal(true);
    setErrors({});
  };

  // Open modal for editing an existing product
  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setOpenModal(true);
    setErrors({});
  };

  const validateProduct = () => {
    const newErrors = {};
    if (!selectedProduct?.name) {
      newErrors.name = "Product name is required.";
    }
    if (!selectedProduct?.description) {
      newErrors.description = "Description is required.";
    }
    if (!selectedProduct?.image) {
      newErrors.image = "Image URL is required.";
    }
    if (selectedProduct?.quantity < 0) {
      newErrors.quantity = "Quantity cannot be negative.";
    }
    if (selectedProduct?.price < 0) {
      newErrors.price = "Price cannot be negative.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Saving product (either adding or updating)
  const handleSaveProduct = () => {
    if (validateProduct()) {
      if (selectedProduct.id === null) {
        setProducts([
          ...products,
          {
            ...selectedProduct,
            id: products.length + 1,
          },
        ]);
      } else {
        setProducts(
          products.map((product) =>
            product.id === selectedProduct.id ? selectedProduct : product
          )
        );
      }
      setOpenModal(false);
    }
  };

  // Deleting a product
  const handleDeleteProduct = (id) => {
    setProducts(
      products.filter((product) => product.id !== openConfirmModal.productId)
    );
    setOpenConfirmModal({ modalOpen: false, productId: null });
  };

  // Open modal for confirming deletion
  const handleRequestDeleteProduct = (productId) => {
    setOpenConfirmModal({
      modalOpen: true,
      productId: productId,
    });
  };

  // Closing modal
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // Closing confirm deletion modal
  const handleCloseConfirmModal = () => {
    setOpenConfirmModal({ modalOpen: false, productId: null });
  };

  return (
    <div className="mx-2 md:mx-10 md:p-10 p-5 bg-white rounded-3xl">
      <div className="flex justify-between items-center">
        <Header category="Pages" title="Products" />
        <button
          type="button"
          className="px-4 py-2 text-white rounded hover:shadow-lg transition-shadow duration-300 cursor-pointer"
          style={{ backgroundColor: currentColor }}
          onClick={handleAddProduct}
        >
          Add Product
        </button>
      </div>

      <div className="flex flex-wrap gap-5 mt-5">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={handleEditProduct}
            onDelete={handleRequestDeleteProduct}
          />
        ))}
      </div>

      {/* Modal for adding/editing product */}
      <Modal
        isOpen={openModal}
        onClose={handleCloseModal}
        title={selectedProduct?.id ? "Edit Product" : "Add Product"}
      >
        <TextField
          label="Product Name"
          variant="outlined"
          fullWidth
          value={selectedProduct?.name}
          onChange={(e) =>
            setSelectedProduct({
              ...selectedProduct,
              name: e.target.value,
            })
          }
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          value={selectedProduct?.description}
          onChange={(e) =>
            setSelectedProduct({
              ...selectedProduct,
              description: e.target.value,
            })
          }
          style={{ marginTop: "10px" }}
          error={!!errors.description}
          helperText={errors.description}
        />
        <TextField
          label="Image URL"
          variant="outlined"
          fullWidth
          value={selectedProduct?.image}
          onChange={(e) =>
            setSelectedProduct({
              ...selectedProduct,
              image: e.target.value,
            })
          }
          style={{ marginTop: "10px" }}
          error={!!errors.image}
          helperText={errors.image}
        />
        <TextField
          label="Quantity"
          variant="outlined"
          type="number"
          fullWidth
          value={selectedProduct?.quantity}
          onChange={(e) =>
            setSelectedProduct({
              ...selectedProduct,
              quantity: parseInt(e.target.value),
            })
          }
          style={{ marginTop: "10px" }}
          error={!!errors.quantity}
          helperText={errors.quantity}
        />
        <TextField
          label="Price"
          variant="outlined"
          type="number"
          fullWidth
          value={selectedProduct?.price}
          onChange={(e) =>
            setSelectedProduct({
              ...selectedProduct,
              price: parseFloat(e.target.value),
            })
          }
          style={{ marginTop: "10px" }}
          error={!!errors.price}
          helperText={errors.price}
        />
        <div className="mt-5 flex gap-2.5 justify-end">
          <button
            onClick={handleCloseModal}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveProduct}
            className="px-4 py-2 text-white rounded bg-blue-600 hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </Modal>

      {/* Confirm Deletion Modal */}
      <Modal
        isOpen={openConfirmModal.modalOpen}
        title="Confirm Deletion"
        onClose={handleCloseConfirmModal}
      >
        <div className="space-y-4">
          <p className="text-gray-800">
            Are you sure you want to delete this product?
          </p>
          <div className="flex justify-end space-x-2">
            <button
              onClick={() =>
                setOpenConfirmModal({ modalOpen: false, productId: null })
              }
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteProduct}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Products;
