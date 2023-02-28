
const express = require("express");
const mongoose = require("mongoose");
const morgan = require('morgan');
require("dotenv").config();

const products=require("./routes/products")
const register=require("./routes/register")
const login=require("./routes/login")
const UserManagement=require("./routes/UserManagement")
const cart=require("./routes/cart")
const MessagesFromUsers=require("./routes/MessagesFromUsers")

const app = express();
const PORT = process.env.PORT || 8000;
const cors = require("cors");

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use("/api/products",products)
app.use("/api/register",register)
app.use("/api/login",login)
app.use("/api/UserManagement",UserManagement)
app.use("/api/cart",cart)
app.use("/api/MessagesFromUsers",MessagesFromUsers)



morgan('tiny')

mongoose
  .connect(process.env.dbString, { useNewUrlParser: true })
  .then(() => console.log("connected to MongoDB"))
  .catch((err) => console.log(err.message));


app.listen(PORT, () => console.log("server run on port " + PORT));