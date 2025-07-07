const initialData = {
  columns: {
    todo: {
      name: "To Do",
      color: "#FFDEDE",
      items: [
        { id: "1", content: "Check inventory" },
        { id: "2", content: "Reorder out of stock products" },
      ],
    },
    doing: {
      name: "Doing",
      color: "#DDEEFF",
      items: [{ id: "3", content: "Shipping order #453" }],
    },
    done: {
      name: "Completed",
      color: "#DEFDE0",
      items: [{ id: "4", content: "Updated price list" }],
    },
  },
};

export default initialData;
