import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Header } from "../components";
import { FiTrash, FiPlus } from "react-icons/fi";
import Modal from "../components/Modal";
import initialData from "../data/kanbanData";

const Kanban = () => {
  const [columns, setColumns] = useState(initialData.columns);

  const [isAddColumnModalOpen, setAddColumnModalOpen] = useState(false);
  const [isAddTaskModalOpen, setAddTaskModalOpen] = useState(false);
  const [newColumnData, setNewColumnData] = useState({
    name: "",
    color: "#F0F0F0",
  });
  const [newTaskContent, setNewTaskContent] = useState("");
  const [activeColumnId, setActiveColumnId] = useState(null);
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    type: null, // 'column' | 'task'
    columnId: null,
    taskId: null,
  });

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

  // const handleAddTask = (columnId) => {
  //   const content = prompt("Insert task:");
  //   if (!content) return;

  //   const newTask = {
  //     id: Date.now().toString(),
  //     content,
  //   };

  //   setColumns({
  //     ...columns,
  //     [columnId]: {
  //       ...columns[columnId],
  //       items: [...columns[columnId].items, newTask],
  //     },
  //   });
  // };

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

  // ------------------------ Modal Handlers ------------------------

  const openAddTaskModal = (columnId) => {
    setActiveColumnId(columnId);
    setNewTaskContent("");
    setAddTaskModalOpen(true);
  };

  const openAddColumnModal = () => {
    setNewColumnData({ name: "", color: "#F0F0F0" });
    setAddColumnModalOpen(true);
  };

  const handleConfirmAddColumn = () => {
    if (!newColumnData.name || !newColumnData.color) return;

    const newId = `col-${Date.now()}`;
    setColumns({
      ...columns,
      [newId]: {
        name: newColumnData.name,
        color: newColumnData.color,
        items: [],
      },
    });
    setAddColumnModalOpen(false);
  };

  const handleConfirmAddTask = () => {
    if (!newTaskContent || !activeColumnId) return;

    const newTask = {
      id: Date.now().toString(),
      content: newTaskContent,
    };

    setColumns({
      ...columns,
      [activeColumnId]: {
        ...columns[activeColumnId],
        items: [...columns[activeColumnId].items, newTask],
      },
    });
    setAddTaskModalOpen(false);
  };

  const openDeleteColumnModal = (columnId) => {
    setConfirmModal({
      isOpen: true,
      type: "column",
      columnId,
    });
  };

  const openDeleteTaskModal = (columnId, taskId) => {
    setConfirmModal({
      isOpen: true,
      type: "task",
      columnId,
      taskId,
    });
  };

  const handleConfirmDelete = () => {
    const { type, columnId, taskId } = confirmModal;

    if (type === "column") {
      const updated = { ...columns };
      delete updated[columnId];
      setColumns(updated);
    } else if (type === "task") {
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
    }

    setConfirmModal({
      isOpen: false,
      type: null,
      columnId: null,
      taskId: null,
    });
  };

  // ------------------------ End Modal Handlers ------------------------

  return (
    <div className="mx-2 md:mx-10 md:p-10 p-5 bg-white rounded-3xl">
      <div className="flex items-center justify-between mb-4">
        <Header category="App" title="Kanban" />
        <div className="flex justify-end mb-4">
          <button
            onClick={openAddColumnModal}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 cursor-pointer"
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
                    onClick={() => openDeleteColumnModal(columnId)}
                    className="text-red-600 text-lg font-bold ml-2 hover:text-red-800 cursor-pointer"
                  >
                    <FiTrash size={18} />
                  </button>
                  <button
                    onClick={() => openAddTaskModal(columnId)}
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
                                openDeleteTaskModal(columnId, item.id)
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

      {/* New Section Modal */}
      <Modal
        isOpen={isAddColumnModalOpen}
        title="Add New Section"
        onClose={() => setAddColumnModalOpen(false)}
      >
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Section name"
            value={newColumnData.name}
            onChange={(e) =>
              setNewColumnData((prev) => ({ ...prev, name: e.target.value }))
            }
            className="w-full p-2 border rounded"
          />
          <div className="flex items-center space-x-2">
            <label>Color:</label>
            <input
              type="color"
              value={newColumnData.color}
              onChange={(e) => {
                setNewColumnData((prev) => ({
                  ...prev,
                  color: e.target.value,
                }));
              }}
              className="w-10 h-10 p-0 border-2 border-gray-300 rounded cursor-pointer"
            />
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleConfirmAddColumn}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Add Section
            </button>
          </div>
        </div>
      </Modal>

      {/* New Task Modal */}
      <Modal
        isOpen={isAddTaskModalOpen}
        title="Add New Task"
        onClose={() => setAddTaskModalOpen(false)}
      >
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Task content"
            value={newTaskContent}
            onChange={(e) => setNewTaskContent(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <div className="flex justify-end">
            <button
              onClick={handleConfirmAddTask}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add Task
            </button>
          </div>
        </div>
      </Modal>

      {/* Confirm Deletion Modal */}
      <Modal
        isOpen={confirmModal.isOpen}
        title="Confirm Deletion"
        onClose={() =>
          setConfirmModal({
            isOpen: false,
            type: null,
            columnId: null,
            taskId: null,
          })
        }
      >
        <div className="space-y-4">
          <p className="text-gray-800">
            {confirmModal.type === "column"
              ? "Are you sure you want to delete this section? All tasks will be lost."
              : "Are you sure you want to delete this task?"}
          </p>
          <div className="flex justify-end space-x-2">
            <button
              onClick={() =>
                setConfirmModal({
                  isOpen: false,
                  type: null,
                  columnId: null,
                  taskId: null,
                })
              }
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmDelete}
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

export default Kanban;
