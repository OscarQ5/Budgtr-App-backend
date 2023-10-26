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

transactionRouter.get("/:id", (req,res,next) => {
    try {
        const id = parseInt(req.params.id);
        const transaction = transactionArr.find(transaction => transaction.id === id);
        if (transaction) {
            res.status(200).send(transaction);
        } else {
            res.status(404).send({ message: "Could not find transaction" });
        }

    }
    catch (err) {
        next(err)
    }
});

transactionRouter.post("/", (req,res,next) => {
    try {
        const transactionBody = req.body;
        if (transactionBody) {
            transactionArr.push(transactionBody);
            res.status(201).send(transactionBody)
        } else {
            res.status(404).send({ message: "Transaction not created" });
        }

    }
    catch (err) {
        next(err)
    }
});

transactionRouter.put("/:id", (req,res,next) => {
    try {
        const transactionId = parseInt(req.params.id);
        const transactionToUpdate = req.body;
        const transactionIndex = transactionArr.findIndex(item => item.id === transactionId);
        if (transactionIndex === -1) {
            res.status(404).send({ message: "Transaction not found" });
        }

        const currentTransaction = transactionArr[transactionIndex];

        for (let key in transactionToUpdate){
            if(currentTransaction.hasOwnProperty([key])){
                currentTransaction[key] = transactionToUpdate[key];
            }
        }
        transactionArr[transactionIndex] = currentTransaction
        res.status(200).send(currentTransaction)

    }
    catch (err) {
        next(err)
    }
});

transactionRouter.delete("/:id", (req,res,next) => {
    try {
        const id = parseInt(req.params.id);
        const itemIndex = transactionArr.findIndex(item => item.id === id);

        if (itemIndex === -1) {
            return res.status(404).send({ message: 'Item not found' });
        }

        const deletedItem = transactionArr.splice(itemIndex, 1); 

        res.status(200).send(deletedItem[0]);

    } catch (err) {
        next(err)
    }
});

module.exports = transactionRouter;