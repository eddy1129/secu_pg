const fs = require("fs");
const NodeRSA = require("node-rsa");
const path = require("path");

function rsaDecrypt(password) {
    try{
        const privateKey = fs.readFileSync(path.resolve(__dirname, "../pri.key"), "utf8");
        const key = new NodeRSA(privateKey);
        key.setOptions({ encryptionScheme: "pkcs1" });
        return key.decrypt(password, "utf8");
    }catch(err){
        console.log("data has been tampered with");
    }
}


function rsaEncryptForPri(data) {
    const privateKey = fs.readFileSync(path.resolve(__dirname, "../pri.key"), "utf8");
    const key = new NodeRSA(privateKey);
    key.setOptions({ encryptionScheme: "pkcs1" });
    return key.encryptPrivate(data, "base64");
}

module.exports = { rsaDecrypt, rsaEncryptForPri }
