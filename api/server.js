const express = require('express');

const app = express();

// Set environment variables
const PORT = process.env['WEB_PORT'] || 3000;

app.get('/codes', (request, response) => {
   console.log('Codes HTTP');
});


app.listen(PORT, () => console.log("Server listening"));