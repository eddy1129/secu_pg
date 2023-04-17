const key = process.env.AES_KEY;
const iv = process.env.AES_IV;
const AES = require("../util/aseUtil");
const RSA = require("../util/rsaUtil");

exports.getAESPair = async (req, res) => {
    try {
        let pair = {
            key: key,
            iv: iv,
        }
        let pairJson = JSON.stringify(pair);
        const aseKey = RSA.rsaEncryptForPri(pairJson);
        res.send({ aseKey });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error",
        });
    }
}