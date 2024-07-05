// src/BillList.js
import React from "react";

const BillList = ({ bills }) => (
  <div>
    <h2>Upcoming Bills</h2>
    <ul>
      {bills.map((bill, index) => (
        <li key={index}>
          <strong>{bill.title}</strong> - ${bill.amount} on {bill.nextBillDate}
          <p>{bill.description}</p>
        </li>
      ))}
    </ul>
  </div>
);

export default BillList;
