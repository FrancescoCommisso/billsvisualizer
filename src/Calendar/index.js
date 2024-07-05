// src/Calendar.js
import React from "react";

const Calendar = ({ bills, nextPayday }) => {
  const start = new Date();
  const end = new Date(nextPayday);
  const days = [];

  for (let day = start; day <= end; day.setDate(day.getDate() + 1)) {
    const dateString = day.toISOString().split("T")[0];
    days.push(dateString);
  }

  return (
    <div>
      <h2>Calendar</h2>
      <div className="calendar">
        {days.map((day) => (
          <div key={day} className="day">
            <strong>{day}</strong>
            <ul>
              {bills
                .filter((bill) => bill.nextBillDate === day)
                .map((bill, index) => (
                  <li key={index}>
                    {bill.title} - ${bill.amount}
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
