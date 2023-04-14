const models = require("../models");
const Code = models.code;

exports.create = async (req, res) => {
    if (!req.body.email || !req.body.code) {
        res.status(400).send({
            message: "The request is empty.",
        });
        return;
    }

    const code = {
        email: req.body.email,
        code: req.body.code,
    };

    try {
        const data = await Code.create(code);
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error",
        });
    }
}

exports.delete = async (req, res) => {
    const email = req.params.email;

    try {
        const num = await Code.destroy({
            where: { email: email },
        });

        if (num == 1) {
            res.send({
                message: "Code was deleted successfully!",
            });
        } else {
            res.send({
                message: `Cannot delete Code with email=${email}. Maybe Code was not found!`,
            });
        }
    } catch (err) {
        res.status(500).send({
            message: "Could not delete Code with email=" + email,
        });
    }
}

exports.update = async (req, res) => {
    const email = req.params.email;

    try {
        const num = await Code.update(req.body, {
            where: { email: email },
        });

        if (num == 1) {
            res.send({
                message: "Order was updated successfully.",
            });
        } else {
            res.send({
                message: `Cannot update Order with email=${email}. Maybe Order was not found or req.body is empty!`,
            });
        }

    } catch (err) {
        res.status(500).send({
            message: "Error updating Order with email=" + email,
        });
    }
}

exports.findAll = async (req, res) => {
    try {
        const data = await Code.findAll();
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error",
        });
    }
}

exports.findOne = async (req, res) => {
    const email = req.params.email;

    try {
        const data = await Code.findByPk(email);
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: "Error retrieving User with email=" + email,
        });
    }
}