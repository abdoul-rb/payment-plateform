const express = require('express');
const app = express();
var cors = require('cors');

// Declare route files
const RoutesMain = require("./routes/main");
const AuthRoutes = require("./routes/auth");
const TransactionRoutes = require("./routes/transaction");

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

// Include route files
app.use("/", RoutesMain);
app.use("/auth", AuthRoutes);
app.use("/transactions", TransactionRoutes);

app.listen(process.env.PORT || 3000, () => console.log(`Server listening ...`));
