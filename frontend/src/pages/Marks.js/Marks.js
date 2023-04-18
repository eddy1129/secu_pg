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
    <div>
      {messageList.map((messageContent) => (
        <div key={messageContent.id}>
          <div>
            <div>
              <p>Score: {messageContent.stuScore}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
