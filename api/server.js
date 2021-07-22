const express = require('express');
const app = express();

// Declare route files
const AuthRouter = require('./routes/AuthRouter');
const RoutesMain = require("./routes/main");
const AuthRoutes = require("./routes/auth");

let fileUpload = require('express-fileupload');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Set environment variables
// const PORT = process.env['API_PORT'] || 300;

// Parse body
app.use(express.json());
app.use(express.urlencoded());
app.use(fileUpload());

// Include route files
app.use('api/auth/users', AuthRouter);
// app.use("/", RoutesMain);
// app.use("/auth", AuthRoutes);

app.listen(process.env.PORT || 3005, () => console.log(`Server listening ...`));