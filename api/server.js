const express = require('express');
const app = express();

// Declare route files
const RoutesMain = require("./routes/main");

// Set environment variables
const PORT = process.env['WEB_PORT'] || 3000;

// Include route files
app.use("/", RoutesMain);

app.listen(PORT, () => console.log("Server listening"));