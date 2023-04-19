import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import CartContext from "../../store/cart-context";

import React from "react";

export default function Marks() {
  const [messageList, setMessageList] = useState([]);
  const { email } = useContext(CartContext);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchMsg = async () => {
      try {
        const response = await axios.get("http://localhost:8800/studentScore");
        const data = response.data;
        const [id, domain] = email.split("@"); // Split email into ID and domain parts
        const filteredData = data.filter((message) => message.stuId === id);
        setMessageList(filteredData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMsg();
  }, []);

  return (
    <div
      style={{
        backgroundColor: "black",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "30%",
        height: "100px",
      }}
    >
      {messageList.map((messageContent) => (
        <div key={messageContent.id}>
          <div>
            <div>
              <h4 style={{ textAlign: "center" }}>
                Score: {messageContent.stuScore}
              </h4>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
