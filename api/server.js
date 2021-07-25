const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
var cors = require('cors');

// Declare route files
const RoutesMain = require("./routes/main");
const AuthRoutes = require("./routes/auth");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors());

// Set environment variables
const PORT = process.env['API_PORT'] || 3000;

// Parse body
app.use(express.json());
app.use(express.urlencoded());
app.use(fileUpload());

// Include route files
app.use("/", RoutesMain);
app.use("/auth", AuthRoutes);

app.listen(process.env.PORT || 3000, () => console.log(`Server listening ...`));