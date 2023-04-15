const fs = require("fs");
const NodeRSA = require("node-rsa");
const path = require("path");

function doDecrypt(password) {

    const privateKey = fs.readFileSync(path.resolve(__dirname, "../pri.key"), "utf8");
    const key = new NodeRSA(privateKey);
    key.setOptions({ encryptionScheme: "pkcs1" });
    return key.decrypt(password, "utf8");
}

module.exports = { doDecrypt }