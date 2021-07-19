const express = require('express');
const app = express();
let fileUpload = require('express-fileupload');

// Declare route files
const RoutesMain = require("./routes/main");
const AuthRoutes = require("./routes/auth");

// Set environment variables
const PORT = process.env['WEB_PORT'] || 3000;

// Parse body
app.use(express.json());
app.use(express.urlencoded());
app.use(fileUpload());

// Include route files
app.use("/", RoutesMain);
app.use("/auth", AuthRoutes);

app.listen(PORT, () => console.log("Server listening"));