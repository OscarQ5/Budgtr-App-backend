const express = require("express");
const transactionRouter = express.Router();
const transactionArr = require("../models/data.js");

transactionRouter.use(express.json());

transactionRouter.get("/", (req, res, next) => {
    try {
        if (transactionArr && transactionArr.length > 0) {
            res.status(200).send(transactionArr)
        } else {
            res.status(404).send({ message: "Transactions not found" })
        }

    }
    catch (err) {
        next(err)
    }
});

module.exports = transactionRouter;