const initialData = {
  columns: {
    todo: {
      name: "To Do",
      color: "#FFDEDE",
      items: [
        { id: "1", content: "Controllare inventario" },
        { id: "2", content: "Riordinare prodotti esauriti" },
      ],
    },
    doing: {
      name: "Doing",
      color: "#DDEEFF",
      items: [{ id: "3", content: "Spedizione ordine #453" }],
    },
    done: {
      name: "Completed",
      color: "#DEFDE0",
      items: [{ id: "4", content: "Aggiornato listino prezzi" }],
    },
  },
};

export default initialData;
