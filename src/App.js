// src/App.js
import React, { useState, useEffect } from "react";
import BillForm from "./BillForm/index";
import BillList from "./BillList/index";
import Calendar from "./Calendar/index";
import Cookies from "js-cookie";
import "./App.css";

const App = () => {
  const [bills, setBills] = useState([]);
  const [nextPayday, setNextPayday] = useState("");
  const [payAmount, setPayAmount] = useState("");
  const [cashOnHand, setCashOnHand] = useState("");

  useEffect(() => {
    const savedBills = Cookies.get("bills");
    const savedNextPayday = Cookies.get("nextPayday");
    const savedPayAmount = Cookies.get("payAmount");
    const savedCashOnHand = Cookies.get("cashOnHand");

    if (savedBills) setBills(JSON.parse(savedBills));
    if (savedNextPayday) setNextPayday(savedNextPayday);
    if (savedPayAmount) setPayAmount(savedPayAmount);
    if (savedCashOnHand) setCashOnHand(savedCashOnHand);
  }, []);

  useEffect(() => {
    Cookies.set("bills", JSON.stringify(bills));
    Cookies.set("nextPayday", nextPayday);
    Cookies.set("payAmount", payAmount);
    Cookies.set("cashOnHand", cashOnHand);
  }, [bills, nextPayday, payAmount, cashOnHand]);

  const addBill = (bill) => {
    setBills([...bills, bill]);
  };

  const totalBillsDueBeforeNextPaycheck = () => {
    const payday = new Date(nextPayday);
    return bills.reduce((total, bill) => {
      const billDate = new Date(bill.nextBillDate);
      if (billDate <= payday) {
        return total + parseFloat(bill.amount);
      }
      return total;
    }, 0);
  };

  const exportData = () => {
    const data = {
      bills,
      nextPayday,
      payAmount,
      cashOnHand,
    };
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(data));
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "data.json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const importData = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const importedData = JSON.parse(e.target.result);
      setBills(importedData.bills || []);
      setNextPayday(importedData.nextPayday || "");
      setPayAmount(importedData.payAmount || "");
      setCashOnHand(importedData.cashOnHand || "");
    };
    reader.readAsText(file);
  };

  return (
    <div className="App">
      <h1>Bill Visualizer</h1>
      <div>
        <label>
          Next Payday:
          <input
            type="date"
            value={nextPayday}
            onChange={(e) => setNextPayday(e.target.value)}
          />
        </label>
        <label>
          Pay Amount:
          <input
            type="number"
            value={payAmount}
            onChange={(e) => setPayAmount(e.target.value)}
          />
        </label>
        <label>
          Cash on Hand:
          <input
            type="number"
            value={cashOnHand}
            onChange={(e) => setCashOnHand(e.target.value)}
          />
        </label>
      </div>
      <BillForm addBill={addBill} />
      <BillList bills={bills} />
      <Calendar bills={bills} nextPayday={nextPayday} />
      <div>
        <h2>
          Total Bills Due Before Next Paycheck: $
          {totalBillsDueBeforeNextPaycheck().toFixed(2)}
        </h2>
      </div>
      <div>
        <button onClick={exportData}>Export Data</button>
        <input type="file" accept="application/json" onChange={importData} />
      </div>
    </div>
  );
};

export default App;
