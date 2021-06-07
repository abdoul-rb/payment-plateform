const express = require('express');
const app = express();

// Declare route files
const routeFiles = [
    require("./routes/main"),
];

// Set environment variables
const PORT = process.env['WEB_PORT'] || 3000;

// Include route files
routeFiles.forEach(routes => {
    app.use(routes);
});

app.listen(PORT, () => console.log("Server listening"));