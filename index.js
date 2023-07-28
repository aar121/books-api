require("dotenv").config();
const express = require("express");
const methodOverride = require("method-override");
const app = express();

app.use("/books", express.urlencoded({ extended: true }));
app.use("/books", methodOverride("_method"));
app.use('/books', require('body-parser').json())
const mongoose = require("mongoose");


app.use("/books", require("./controllers/index"));
app.use(express.json());


app.listen(process.env.PORT);