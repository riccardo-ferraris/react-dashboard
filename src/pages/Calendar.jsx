import React from "react";
import { Header } from "../components";
import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import calendarData from "../data/calendarData";
import { Modal } from "../components";
import { TextField } from "@mui/material";

const Calendar = () => {
  const [events, setEvents] = useState(calendarData);
  const [open, setOpen] = useState(false);
  const [event, setEvent] = useState({
    id: null,
    title: "",
    date: "",
    isEditing: false,
  });
  const [error, setError] = useState("");

  const handleDateClick = (info) => {
    // const title = prompt("Event title:");
    // if (title) {
    //   const newEvent = {
    //     id: events.length + 1,
    //     title,
    //     date: info.dateStr,
    //   };
    //   setEvents([...events, newEvent]);
    // }

    setEvent({
      id: null,
      title: "",
      date: info.dateStr,
      isEditing: false,
    });
    setOpen(true);
  };

  const handleEventClick = (info) => {
    console.log("Event clicked:", info.event.id);
    setEvent({
      id: info.event.id,
      title: info.event.title,
      date: info.event.startStr,
      isEditing: true,
    });
    setOpen(true);
  };

  const handleEventDrop = (info) => {
    // Backend logic to update the event's date in the database can be added here
    console.log("Event moved:", info.event.title, info.event.startStr);
  };

  const handleSaveEvent = () => {
    if (!event.title) {
      setError("Event title is required.");
      return;
    }

    setError("");
    if (event.isEditing) {
      // Update existing event
      setEvents((prevEvents) =>
        prevEvents.map((e) =>
          String(e.id) === String(event.id)
            ? { ...e, title: event.title, date: event.date }
            : e
        )
      );
    } else {
      // Add new event
      const newEvent = {
        id: new Date().getTime(),
        title: event.title,
        date: event.date,
      };
      setEvents([...events, newEvent]);
    }
    setOpen(false);
  };

  const handleDeleteEvent = () => {
    if (event.id) {
      setEvents((prevEvents) =>
        prevEvents.filter((e) => String(e.id) !== String(event.id))
      );
    }
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="mx-2 md:mx-10 md:p-10 p-5 bg-white rounded-3xl">
      <Header category="App" title="Calendar" />
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          start: "prev,next today",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        editable={true}
        selectable={true}
        events={events}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        eventDrop={handleEventDrop}
        height="auto"
      />

      {/* Modal for adding/editing events */}
      <Modal
        isOpen={open}
        onClose={handleClose}
        title={event.isEditing ? "Edit event" : "Add event"}
      >
        <div className="flex flex-col gap-4">
          <TextField
            label="Event Title"
            variant="outlined"
            fullWidth
            value={event.title}
            onChange={(e) => setEvent({ ...event, title: e.target.value })}
            className="mb-4"
            error={!!error}
            helperText={error}
          />
          <div className="mt-5 flex gap-2.5 justify-end">
            <button
              onClick={handleClose}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            {event.isEditing && (
              <button
                onClick={handleDeleteEvent}
                className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 text-white"
              >
                Delete
              </button>
            )}
            <button
              onClick={handleSaveEvent}
              className="px-4 py-2 text-white rounded bg-blue-600 hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Calendar;
