import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../../store/auth-context.js";
import classes from "./history.module.css";

import axios from "axios";

export default function History() {
  const { username } = useContext(AuthContext);

  const [paymentRecord, setPaymentRecord] = useState([]);
  const [msgRecord, setMsgRecord] = useState([]);

  useEffect(() => {
    const fetchPaymentRecord = async () => {
      const response = await axios.get("http://localhost:8800/paymentRecord");
      const data = await response.data;
      if (data) {
        const filteredData = data.filter((record) => record.name === username);
        setPaymentRecord(filteredData);
      }
    };
    fetchPaymentRecord();
  }, [username]);

  useEffect(() => {
    const fetchPaymentRecord = async () => {
      const response = await axios.get("http://localhost:8800/messages");

      const data = await response.data;
      if (data) {
        const filteredData = data.filter(
          (record) => record.username === username
        );
        console.log("response,filteredData", filteredData);
        setMsgRecord(filteredData);
      }
    };
    fetchPaymentRecord();
  }, [username]);

  return (
    <div className={classes.align}>
      {paymentRecord.map((record) => {
        return (
          <div key={record.id}>
            <h1>Course Payment Record</h1>
            <h2>Price: {record.price}</h2>
            <h2>Date: {record.date}</h2>
            <br />
          </div>
        );
      })}
      <hr />
      {msgRecord.map((record) => {
        return (
          <div key={record.id}>
            <h1>Chat Room Record</h1>
            <h2>room: {record.room}</h2>
            <h2>usermsg: {record.usermsg}</h2>
            <h2>time: {record.time}</h2>
            <br />
          </div>
        );
      })}
    </div>
  );
}
