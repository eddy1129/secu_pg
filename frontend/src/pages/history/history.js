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
    <div
      className={classes.align}
      style={{
        backgroundColor: "black",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {paymentRecord.map((record) => {
        return (
          <div key={record.id}>
            <h1>Course Payment Record</h1>
            <h4>Price: {record.price}</h4>
            <h4>Date: {record.date}</h4>
            <br />
          </div>
        );
      })}
      <hr />
      {msgRecord.map((record) => {
        return (
          <div key={record.id}>
            <h1>Chat Room Record</h1>
            <h4>room: {record.room}</h4>
            <h4>usermsg: {record.usermsg}</h4>
            <h4>time: {record.time}</h4>
            <br />
          </div>
        );
      })}
    </div>
  );
}
