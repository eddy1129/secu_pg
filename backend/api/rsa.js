const fs = require('fs');
const path = require('path');

exports.getPublicKey = async (req, res) => {
    try {
        const publicKey = fs.readFileSync(path.resolve(__dirname, "../pub.key"), "utf8");
        res.send({ publicKey });
    } catch (err) {
        res.status(500).send({
        message: err.message || "Error",
        });
    }
}