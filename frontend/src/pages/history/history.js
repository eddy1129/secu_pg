import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../../store/auth-context.js";

import axios from "axios";

export default function History() {
  const { username } = useContext(AuthContext);

  const [paymentRecord, setPaymentRecord] = useState([]);
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

  return (
    <div>
      {paymentRecord.map((record) => {
        return (
          <div key={record.id}>
            <div>Item: // ITEM</div>
            <div>Price: {record.price}</div>
            <div>Date: {record.date}</div>
            <br />
          </div>
        );
      })}
    </div>
  );
}
