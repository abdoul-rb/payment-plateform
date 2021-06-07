const express = require('express');

const app = express();

app.get('/codes', (request, response) => {
   console.log('Codes HTTP');
});


app.listen(process.env.PORT || 3000, () => console.log("Server listening"));