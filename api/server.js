const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
var cors = require('cors');

// Declare route files
const RoutesMain = require("./routes/main");
const AuthRoutes = require("./routes/auth");
const TransactionRoutes = require("./routes/transaction");

// Set environment variables
const PORT = process.env['API_PORT'] || 3000;

// Parse body
app.use(express.json());
app.use(express.urlencoded());
app.use(fileUpload());
// app.use(cors());

// Include route files
app.use("/", RoutesMain);
app.use("/auth", AuthRoutes);
app.use("/transactions", TransactionRoutes);

app.listen(PORT, () => console.log(`Server listening ...`));