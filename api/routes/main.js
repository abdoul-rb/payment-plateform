const express = require('express');
var router = express.Router()

router.get('/codes', (request, response) => {
    console.log('Codes HTTP');
 });
 
module.exports = router;