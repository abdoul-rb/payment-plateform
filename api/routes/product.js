const express = require('express');
const Product = require('../models/sequelize/Product')
let app = express.Router();
const { body, validationResult } = require('express-validator');


app.get('/', async (req, res) => {
    const products = await Product.findAll();
    // Return all Products
    res.status(200).json({
        data: products
    });
});

app.get('/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);
    // Return a Product by id
    res.status(200).json({
        data: product
    });
});

app.post("/", // Create a ressource
    body('name')
        .isString().withMessage('Need the client who put the Product name'),
    body('price')
        .isInt().withMessage('The product must have a valid price'),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Enregistrer un produit dans la base de données
        const bodyData = req.body;
        Product.create({ 
            name: bodyData.name,
            price: bodyData.price,
        })
        .then((data) => res.status(201).json(data))
        .catch((e) => {
            return res.status(400).json(e)
        });
    });

module.exports = app;