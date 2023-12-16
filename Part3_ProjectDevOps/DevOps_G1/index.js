// variable declaration
import express from "express";
import bodyParser from "body-parser";
import multer from "multer";
const app = express();

// import product routes
import products from "./productroutes.js";

// make the public folder static
app.use(express.static('public'));
app.use(express.static('public/images'));

// use the products route
app.use('/Products', products);

// listen
app.listen(8080);