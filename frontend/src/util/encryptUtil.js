import CryptoJS from "crypto-js";
import axios from "axios";
import JSEncrypt from "jsencrypt";

function generateKey() {
    const key = CryptoJS.lib.WordArray.random(256 / 8);
    const iv = CryptoJS.lib.WordArray.random(256 / 8);

    return {
        key: CryptoJS.enc.Base64.stringify(key),
        iv: CryptoJS.enc.Base64.stringify(iv),
    };
}

async function encryptByRsa(data) {
    const rsa = await axios.get("http://localhost:8800/api/getPublicKey");
    const encryptor = new JSEncrypt();
    encryptor.setPublicKey(rsa.data.publicKey);
    return encryptor.encrypt(data);
}

function encryptMessage(message, pair) {
    const { key, iv } = pair;
    const key_p = CryptoJS.enc.Utf8.parse(CryptoJS.enc.Base64.parse(key));
    const iv_p = CryptoJS.enc.Utf8.parse(CryptoJS.enc.Base64.parse(iv));
    const plaintext = CryptoJS.enc.Utf8.parse(JSON.stringify(message));
    const encrypted = CryptoJS.AES.encrypt(plaintext, key_p, {
        iv: iv_p,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    return encrypted.ciphertext.toString();
}

export default {
    generateKey,
    encryptByRsa,
    encryptMessage
};