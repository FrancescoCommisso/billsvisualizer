import React, { useState, useEffect } from "react";
import BillForm from "./BillForm";
import BillList from "./BillList";
import Calendar from "./Calendar";
import Cookies from "js-cookie";
import "./App.css";

const App = () => {
  const initializeBills = () => {
    const savedBills = Cookies.get("bills");
    return savedBills ? JSON.parse(savedBills) : [];
  };

  const initializeNextPayday = () => {
    const savedNextPayday = Cookies.get("nextPayday");
    return savedNextPayday || "";
  };

  const initializePayAmount = () => {
    const savedPayAmount = Cookies.get("payAmount");
    return savedPayAmount || "";
  };

  const initializeCashOnHand = () => {
    const savedCashOnHand = Cookies.get("cashOnHand");
    return savedCashOnHand || "";
  };

  const [bills, setBills] = useState(initializeBills);
  const [nextPayday, setNextPayday] = useState(initializeNextPayday);
  const [payAmount, setPayAmount] = useState(initializePayAmount);
  const [cashOnHand, setCashOnHand] = useState(initializeCashOnHand);

  const saveToCookies = () => {
    Cookies.set("bills", JSON.stringify(bills), { expires: 365 });
    Cookies.set("nextPayday", nextPayday, { expires: 365 });
    Cookies.set("payAmount", payAmount, { expires: 365 });
    Cookies.set("cashOnHand", cashOnHand, { expires: 365 });
  };

  useEffect(() => {
    saveToCookies();
  }, [bills, nextPayday, payAmount, cashOnHand]);

  const addBill = (bill) => {
    setBills([...bills, bill]);
  };

  const deleteBill = (index) => {
    const newBills = bills.filter((_, i) => i !== index);
    setBills(newBills);
  };

  const generateMonthlyOccurrences = (bill) => {
    const occurrences = [];
    const billDate = new Date(bill.nextBillDate);
    const end = new Date(nextPayday);

    while (billDate <= end) {
      occurrences.push(new Date(billDate).toISOString().split("T")[0]);
      billDate.setMonth(billDate.getMonth() + 1);
    }

    return occurrences;
  };

  const totalBillsDueBeforeNextPaycheck = () => {
    const payday = new Date(nextPayday);
    const allOccurrences = bills.flatMap(generateMonthlyOccurrences);

    return bills.reduce((total, bill) => {
      const billOccurrences = generateMonthlyOccurrences(bill);
      const billDueBeforePayday = billOccurrences.filter(
        (date) => new Date(date) <= payday
      );

      return total + billDueBeforePayday.length * parseFloat(bill.amount);
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
      <div className="form-container">
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
      <BillList bills={bills} deleteBill={deleteBill} />
      <Calendar bills={bills} nextPayday={nextPayday} />
      <div className="footer">
        <h2>
          Total Bills Due Before Next Paycheck: $
          {totalBillsDueBeforeNextPaycheck().toFixed(2)}
        </h2>
        <button onClick={exportData}>Export Data</button>
        <input type="file" accept="application/json" onChange={importData} />
        <button onClick={saveToCookies}>Save Data</button>
      </div>
    </div>
  );
};

export default App;
