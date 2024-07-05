// src/BillList.js
import React from "react";
import "./BillList.css";

const BillList = ({ bills }) => (
  <div className="bill-list">
    <h2>Upcoming Bills</h2>
    {bills.length > 0 ? (
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Next Bill Date</th>
          </tr>
        </thead>
        <tbody>
          {bills.map((bill, index) => (
            <tr key={index}>
              <td>{bill.title}</td>
              <td>${bill.amount}</td>
              <td>{bill.description}</td>
              <td>{bill.nextBillDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <p>No upcoming bills.</p>
    )}
  </div>
);

export default BillList;
