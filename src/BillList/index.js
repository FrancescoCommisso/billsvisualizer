// src/BillList.js
import React from "react";
import "./BillList.css";

const BillList = ({ bills }) => (
  <div className="bill-list">
    <h2>Upcoming Bills</h2>
    <ul>
      {bills.map((bill, index) => (
        <li key={index} className="bill-item">
          <strong>{bill.title}</strong> - ${bill.amount} on {bill.nextBillDate}
          <p>{bill.description}</p>
        </li>
      ))}
    </ul>
  </div>
);

export default BillList;
