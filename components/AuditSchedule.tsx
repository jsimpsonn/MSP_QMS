"use client";

import React from 'react';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

const AuditSchedule = () => {
  React.useEffect(() => {
    let calendarEl = document.getElementById('calendar');
    if (calendarEl) {
      let calendar = new Calendar(calendarEl, {
        height: 'auto',
        plugins: [ dayGridPlugin, timeGridPlugin, listPlugin ],
        initialView: 'dayGridMonth',
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,listWeek'}
      });
      calendar.render();
    } else {
      console.error('Failed to initialize calendar: HTMLElement with ID "calendar" not found.');
    }
  }, []);

  return <div id="calendar"></div>;
};

export default AuditSchedule;