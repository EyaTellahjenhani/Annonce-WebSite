const express = require("express");
const authRouter = require("./Route/authRouter");
const listingsRouter = require("./Route/listingsRouter");
const categoriesRouter = require("./Route/categoriesRouter");
const usersRouter = require("./Route/usersRouter");
const app = express();
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');

dotenv.config();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/listings", listingsRouter);
app.use("/api/categories", categoriesRouter);

const port = 1000;
app.listen(port, () => {
  console.log(`Serveur is running ${port}`);
});
