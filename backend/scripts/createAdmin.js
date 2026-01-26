require("dotenv").config({ path: "../.env" });
const mongoose = require("mongoose");
const Admin = require("../models/Admin");

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    const admin = new Admin({
      email: "admin@gmail.com",
      password: "123456"
    });

    await admin.save();
    console.log("Admin created");
    process.exit();
  })
  .catch(err => console.error(err));
