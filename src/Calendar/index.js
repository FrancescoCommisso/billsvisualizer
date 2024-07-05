// src/Calendar/index.js
import React from "react";
import "./Calendar.css";

const Calendar = ({ bills, nextPayday }) => {
  const start = new Date();
  const end = new Date(nextPayday);
  const days = [];

  for (let day = start; day <= end; day.setDate(day.getDate() + 1)) {
    days.push(new Date(day)); // Store date objects
  }

  const generateMonthlyOccurrences = (bill) => {
    const occurrences = [];
    const billDate = new Date(bill.nextBillDate);

    while (billDate <= end) {
      occurrences.push(new Date(billDate).toISOString().split("T")[0]);
      billDate.setMonth(billDate.getMonth() + 1);
    }

    return occurrences;
  };

  const formatDate = (date) => {
    const options = { weekday: "short", month: "short", day: "2-digit" };
    return date.toLocaleDateString("en-US", options).toUpperCase();
  };

  return (
    <div>
      <h2>Calendar</h2>
      <div className="calendar">
        {days.map((day) => (
          <div key={day.toISOString()} className="day">
            <strong>{formatDate(day)}</strong>
            <ul>
              {bills
                .filter((bill) =>
                  generateMonthlyOccurrences(bill).includes(
                    day.toISOString().split("T")[0]
                  )
                )
                .map((bill, index) => (
                  <li key={index} className="bill-card">
                    <div className="bill-title">{bill.title}</div>
                    <div className="bill-amount">${bill.amount}</div>
                    <div className="bill-description">{bill.description}</div>
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
