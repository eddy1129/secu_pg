const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = 8800;

const models = require("./models");
models.sequelize.sync();

app.use(express.json());
app.use(cors());

const productsRoutes = require("./routes/product.routes");
const usersRoutes = require("./routes/user.routes");
const cartsRoutes = require("./routes/cart.routes");
const ordersRoutes = require("./routes/order.routes");
const authRoutes = require("./routes/auth.routes");
const paymentRoutes = require("./routes/payment.routes");
const codeRoutes = require("./routes/code.routes");
const apiRoutes = require("./routes/api.routes");
const msgRoutes = require("./routes/msgRoutes.routes");
const paymentRecordRoutes = require("./routes/paymentRecord.routes");

app.use("/products", productsRoutes);
app.use("/users", usersRoutes);
app.use("/carts", cartsRoutes);
app.use("/orders", ordersRoutes);
app.use("/auth", authRoutes);
app.use("/payment", paymentRoutes);
app.use("/code", codeRoutes);
app.use("/api", apiRoutes);
app.use("/messages", msgRoutes);
app.use("/paymentRecord", paymentRecordRoutes);

app.listen(port);
