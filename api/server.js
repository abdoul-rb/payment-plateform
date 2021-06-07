const express = require('express');
const app = express();
const path = require('path');

// Set environment variables
const PORT = process.env['WEB_PORT'] || 3000;

// Include routes
const routes = require("./routes/main");
app.use(routes);

app.listen(PORT, () => console.log("Server listening"));