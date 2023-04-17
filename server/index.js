const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const CryptoJS = require("crypto-js");
const NodeRSA = require("node-rsa");
const fs = require("fs");
const path = require("path");

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {

    // decrypt key
    const key = decryptByRsa(data.key);
    // const key = JSON.parse(decrypt_key);
    // decrypt iv
    const iv = decryptByRsa(data.sign);

    // decrypt message
    const decrypted_message = decryptByAes(data.content, key, iv);
    const message = JSON.parse(decrypted_message);

    socket.to(message.room).emit("receive_message", message);
    console.log("some one sd msg", message);
  });

    socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(3001, () => {
  console.log("SERVER RUNNING");
});


function decryptByAes(ciphertext, key, iv) {
  const key_p = CryptoJS.enc.Utf8.parse(CryptoJS.enc.Base64.parse(key));
  const iv_p = CryptoJS.enc.Utf8.parse(CryptoJS.enc.Base64.parse(iv));
  const encryptedHexStr = CryptoJS.enc.Hex.parse(ciphertext);
  const src = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  const decrypt = CryptoJS.AES.decrypt(src, key_p,
      { iv: iv_p,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });
  const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
}

function decryptByRsa(data) {
  try{
    const privateKey = fs.readFileSync(path.resolve(__dirname, "../backend/pri.key"), "utf8");
    const key = new NodeRSA(privateKey);
    key.setOptions({ encryptionScheme: "pkcs1" });
    return key.decrypt(data, "utf8");
  }catch(err){
    console.log("decryptByRsa : data has been tampered with");
  }
}
