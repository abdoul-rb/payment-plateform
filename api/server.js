const express = require('express');

const app = express();

// Set environment variables
const PORT = process.env['WEB_PORT'] || 8080;

app.get('/codes', (request, response) => {
   console.log('Codes HTTP');
});


app.listen(process.env.PORT || 3000, () => console.log("Server listening"));