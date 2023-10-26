// variable declaration
const express = require('express');
import mongoose from "mongoose";
const bodyParser = require('body-parser');
const app = express();

mongoose.connect('mongodb://localhost/my_db');

let productSchema = mongoose.Schema({
   Name: String,
   Price: Number,
   Colour: String,
   Manufacturer: String,
   StartingDateAvailable: Date,
   StartingDateAvailable: Date,
   Type: String,
   PanWidth: Number,
   HandleLength: Number,
   Image: String,
   Description: String
});

let Product = mongoose.model("Product", productSchema);

import products from "./productroutes.js";

app.use(express.static('public'));

app.use('/Products', products);

app.listen(8080);