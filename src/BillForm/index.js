// src/BillForm.js
import React, { useState } from "react";
import "./BillForm.css";

const BillForm = ({ addBill }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [nextBillDate, setNextBillDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addBill({ title, amount, description, nextBillDate });
    setTitle("");
    setAmount("");
    setDescription("");
    setNextBillDate("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add a Bill</h2>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label>
        Amount:
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </label>
      <label>
        Description:
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <label>
        Next Bill Date:
        <input
          type="date"
          value={nextBillDate}
          onChange={(e) => setNextBillDate(e.target.value)}
        />
      </label>
      <button type="submit">Add Bill</button>
    </form>
  );
};

export default BillForm;
