import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

export default function JobCalendar({ jobs }) {
  const events = jobs.map(j => ({
    title: `${j.crane} - ${j.task}`,
    date: j.date
  }));

  return (
    <div className="my-4">
      <h4>📆 Calendar View</h4>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        height="auto"
      />
    </div>
  );
}
