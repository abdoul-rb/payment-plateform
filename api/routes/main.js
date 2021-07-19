const express = require('express');
var app = express.Router()

app.get('/codes', (req, res) => {
    console.log('Codes HTTP');
 });
 
module.exports = app;