import React from "react";
import { Header } from "../components";
import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const Calendar = () => {
  const [events, setEvents] = useState([
    { id: 1, title: 'Check inventory', date: '2025-07-04' },
    { id: 2, title: 'Update database', date: '2025-07-08' }
  ]);

  const handleDateClick = (info) => {
    const title = prompt('Event title:');
    if (title) {
      const newEvent = {
        id: events.length + 1,
        title,
        date: info.dateStr,
      };
      setEvents([...events, newEvent]);
    }
  };

  const handleEventClick = (info) => {
    // Confirm before deleting the event
    if (window.confirm(`Delete event "${info.event.title}"?`)) {
      info.event.remove();
    }
  };

  const handleEventDrop = (info) => {
    // Backend logic to update the event's date in the database can be added here
    console.log('Evento spostato:', info.event.title, info.event.startStr);
  };

  return <div className="mx-2 md:mx-10 md:p-10 p-5 bg-white rounded-3xl">
    <Header category="App" title="Calendar" />
    <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          start: 'prev,next today',
          center: 'title',
          end: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        editable={true}
        selectable={true}
        events={events}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        eventDrop={handleEventDrop}
        height="auto"
      />
  </div>;
};

export default Calendar;
