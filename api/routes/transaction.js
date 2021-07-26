const express = require('express');
const Transaction = require('../models/sequelize/Transaction')
let app = express.Router();
const { body, validationResult } = require('express-validator');


app.get('/', async (req, res) => {
    const transactions = await Transaction.findAll();
    // Return all transactions
    res.status(200).json({
        data: transactions
    });
});

app.get('/:id', async (req, res) => {
    const transaction = await Transaction.findById(req.params.id);
    // Return a transaction by id
    res.status(200).json({
        data: transaction
    });
});

app.post("/", // Create a ressource
    body('client_id')
        .isInt().withMessage('Need the client id who did the transaction'),
    body('products')
        .isJSON().withMessage('The product list must be a valid JSON'),
    body('transaction_date')
        .isDate().withMessage('The transaction date need to be a valid date m/d/y'),
    body('status')
        .isString().withMessage('The status need to be a string'),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Enregistrer l'utilisateur en base de données
        const bodyData = req.body;
        Transaction.create({ 
            client_id: bodyData.client_id,
            products: bodyData.products,
            transaction_date: bodyData.transaction_date,
            status: bodyData.status
        })
        .then((data) => res.status(201).json(data))
        .catch((e) => {
            return res.status(400).json(e)
        });
    });

module.exports = app;