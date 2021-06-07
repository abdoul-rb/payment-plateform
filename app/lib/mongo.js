const mongoose = require('mongoose');

mongoose
   .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      authSource: "admin"
   })
   .then((_) => console.log("Mongo connected"));

module.exports = mongoose.connection;