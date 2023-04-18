import React, { useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import ScrollToBottom from "react-scroll-to-bottom";
import "./chat.css";
import axios from "axios";
import JSEncrypt from "jsencrypt";
import encrypt from "../../util/encryptUtil.js";

function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const currentDate = new Date();
  const hours = currentDate.getHours().toString().padStart(2, "0");
  const minutes = currentDate.getMinutes().toString().padStart(2, "0");
  const timeString = `${hours}:${minutes}`;
  useEffect(() => {
    const fetchMsg = async () => {
      try {
        const response = await axios.get("http://localhost:8800/messages");
        const data = response.data;
        const filteredData = data.filter((message) => message.room === room);
        setMessageList(filteredData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMsg();
  }, [room]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        username: username,
        usermsg: currentMessage,
        time: timeString,
      };

      const pair = encrypt.generateKey();
      const key = await encrypt.encryptByRsa(pair.key);
      const vi = await encrypt.encryptByRsa(pair.iv);
      const encryptedMessage = encrypt.encryptMessage(messageData, pair);
      const message = {
        key: key,
        sign: vi,
        content: encryptedMessage,
      };

      await socket.emit("send_message", message);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");

      /* backend save data */

      try {
        console.log("===========message try", message);
        axios
          .post(`http://localhost:8800/messages`, {
            message: message,
          })
          .then(function (response) {
            console.log(response);
          });
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, [socket]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent) => {
            return (
              <div
                className="message"
                id={username === messageContent.username ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.usermsg}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.username}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chat;
