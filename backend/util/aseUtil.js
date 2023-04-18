const CryptoJS = require("crypto-js");

function aseDecrypt(ciphertext, key, iv) {
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

function aseEncrypt(plaintext, key, iv) {
    let temp_key = CryptoJS.enc.Utf8.parse(key);
    let temp_iv = CryptoJS.enc.Utf8.parse(iv);
    const src = CryptoJS.enc.Utf8.parse(plaintext);
    const encrypted = CryptoJS.AES.encrypt(src, temp_key, {
        iv: temp_iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.ciphertext.toString();
}

module.exports = { aseDecrypt, aseEncrypt }

