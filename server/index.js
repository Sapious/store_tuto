require("dotenv").config();
const path = require("path");
//import section
const express = require("express");
const app = express();
const mongoose = require("mongoose");

// DB connection
mongoose.connect(process.env.MONGO_DB_URI);
mongoose.connection.on("connected", () => {
    console.log("DB connected");
});
mongoose.connection.on("error", err => {
    console.log("mongoose failed with", err);
});

//import routes
const productRouter = require("./routes/product.routes");
const categoryRouter = require("./routes/category.routes");
const authRouter = require("./routes/auth.routes");
const addressRouter = require("./routes/address.routes");
const orderRouter = require("./routes/order.routes");
const cartRouter = require("./routes/cart.routes");

//middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes middlewares
app.use("/api/products", productRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/auth", authRouter);
app.use("/api/addresses", addressRouter);
app.use("/api/orders", orderRouter);
app.use("/api/carts", cartRouter);

app.use(express.static("../client/build"));
app.use("*", (req, res) => {
    res.sendFile(path.resolve("build", "index.html"));
});
//server listening
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
});
