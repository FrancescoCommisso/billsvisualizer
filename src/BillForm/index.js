// src/BillForm.js
import React, { useState } from "react";
import "./BillForm.css";

const BillForm = ({ addBill }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [nextBillDate, setNextBillDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addBill({ title, amount, nextBillDate });
    setTitle("");
    setAmount("");
    setNextBillDate("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add a Bill</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
      />
      <input
        type="date"
        value={nextBillDate}
        onChange={(e) => setNextBillDate(e.target.value)}
        placeholder="Next Bill Date"
      />
      <button type="submit">Add Bill</button>
    </form>
  );
};

export default BillForm;
