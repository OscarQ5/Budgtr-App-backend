const express = require("express");
const cors = require("cors");
const app = express();
const transactionController = require("./controllers/transactionsController.js");

app.use(cors());
app.use(express.json());

app.use("/transactions", transactionController);

app.use("*", (req, res) => {
    res.status(404).json({ error: "Page doesn't exist!" })
})

module.exports = app;