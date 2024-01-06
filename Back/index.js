const express = require("express");
const authRouter = require("./Route/authRouter");
const listingsRouter = require("./Route/listingsRouter");
const categoriesRouter = require("./Route/categoriesRouter");
const usersRouter = require("./Route/usersRouter");
const app = express();
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');
const cloudinary = require('cloudinary').v2;    


dotenv.config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({limit: '50mb'}));
app.use(express.json());
app.use(cookieParser());

cloudinary.config({
  cloud_name: process.env.Cloudinary_Name,
  api_key: process.env.Cloudinary_Key,
  api_secret: process.env.Cloudinary_Secret,
});



app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/listings", listingsRouter);
app.use("/api/categories", categoriesRouter);

const port = 1000;
app.listen(port, () => {
  console.log(`Serveur is running ${port}`);
});
