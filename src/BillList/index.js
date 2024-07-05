// src/BillList.js
import React from "react";
import "./BillList.css";

const BillList = ({ bills, deleteBill }) => (
  <div className="bill-list">
    <h2>Upcoming Bills</h2>
    {bills.length > 0 ? (
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Amount</th>
            <th>Next Bill Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bills.map((bill, index) => (
            <tr key={index}>
              <td>{bill.title}</td>
              <td>${bill.amount}</td>
              <td>{bill.nextBillDate}</td>
              <td className="actions">
                <button onClick={() => deleteBill(index)}>Delete</button>
              </td>
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
