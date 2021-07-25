const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

// Declare route files
const RoutesMain = require("./routes/main");
const AuthRoutes = require("./routes/auth");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Parse body
app.use(express.json());
app.use(express.urlencoded());
app.use(fileUpload());

// Include route files
app.use("/", RoutesMain);
app.use("/auth", AuthRoutes);

app.listen(process.env.PORT || 3000, () => console.log(`Server listening ...`));