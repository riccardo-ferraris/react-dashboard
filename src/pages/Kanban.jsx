import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Header } from "../components";
import { FiTrash, FiPlus } from "react-icons/fi";

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

const Kanban = () => {
  const [columns, setColumns] = useState(initialData.columns);

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceCol = columns[source.droppableId];
    const destCol = columns[destination.droppableId];
    const sourceItems = [...sourceCol.items];
    const destItems = [...destCol.items];

    const [movedItem] = sourceItems.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      sourceItems.splice(destination.index, 0, movedItem);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceCol,
          items: sourceItems,
        },
      });
    } else {
      destItems.splice(destination.index, 0, movedItem);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceCol,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destCol,
          items: destItems,
        },
      });
    }
  };

  const handleAddTask = (columnId) => {
    const content = prompt("Insert task:");
    if (!content) return;

    const newTask = {
      id: Date.now().toString(),
      content,
    };

    setColumns({
      ...columns,
      [columnId]: {
        ...columns[columnId],
        items: [...columns[columnId].items, newTask],
      },
    });
  };

  const handleDeleteTask = (columnId, taskId) => {
    const updatedItems = columns[columnId].items.filter(
      (item) => item.id !== taskId
    );
    setColumns({
      ...columns,
      [columnId]: {
        ...columns[columnId],
        items: updatedItems,
      },
    });
  };

  const handleAddColumn = () => {
    const name = prompt("New section name:");
    const color = prompt("Background color (es. #A3D2CA):", "#F0F0F0");
    if (!name || !color) return;

    const newId = `col-${Date.now()}`;
    setColumns({
      ...columns,
      [newId]: {
        name,
        color,
        items: [],
      },
    });
  };

  const handleDeleteColumn = (columnId) => {
    const confirmed = window.confirm("Are you sure?");
    if (!confirmed) return;

    const updatedColumns = { ...columns };
    delete updatedColumns[columnId];

    setColumns(updatedColumns);
  };

  return (
    <div className="mx-2 md:mx-10 md:p-10 p-5 bg-white rounded-3xl">
      <div className="flex items-center justify-between mb-4">
        <Header category="App" title="Kanban" />
        <div className="flex justify-end mb-4">
          <button
            onClick={handleAddColumn}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            + Add Section
          </button>
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto">
        <DragDropContext onDragEnd={onDragEnd}>
          {Object.entries(columns).map(([columnId, column]) => (
            <div key={columnId}>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-lg">{column.name}</h4>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDeleteColumn(columnId)}
                    className="text-red-600 text-lg font-bold ml-2 hover:text-red-800 cursor-pointer"
                  >
                    <FiTrash size={18}/>
                  </button>
                  <button
                    onClick={() => handleAddTask(columnId)}
                    className="text-blue-500 text-lg font-bold ml-2 hover:text-blue-700 cursor-pointer"
                  >
                    <FiPlus size={18} />
                  </button>
                </div>
              </div>

              <Droppable droppableId={columnId}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{
                      background: column.color || "#e2e2e2",
                      padding: 16,
                      width: 250,
                      minHeight: 500,
                      borderRadius: 8,
                      transition: "background 0.3s ease",
                    }}
                  >
                    {column.items.map((item, index) => (
                      <Draggable
                        draggableId={item.id}
                        index={index}
                        key={item.id}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              padding: 12,
                              marginBottom: 8,
                              backgroundColor: snapshot.isDragging
                                ? "#d0e7ff"
                                : "#fff",
                              borderRadius: 4,
                              boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              ...provided.draggableProps.style,
                            }}
                          >
                            <span>{item.content}</span>
                            <button
                              onClick={() =>
                                handleDeleteTask(columnId, item.id)
                              }
                              style={{
                                marginLeft: 8,
                                color: "red",
                                fontWeight: "bold",
                                background: "transparent",
                                border: "none",
                                cursor: "pointer",
                              }}
                              title="Delete task"
                            >
                              ✕
                            </button>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </DragDropContext>
      </div>
    </div>
  );
};

export default Kanban;
