// variable declaration
import express from "express";
import mongoose from "mongoose";
const products = express.Router();

// connects to mongodb
mongoose.connect('mongodb://localhost/ProductCatalog');

// create schema
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

// assign schema to a variable
let Product = mongoose.model("Product", productSchema);

// return all products as a JSON response
products.get('/', (req, res) => {
	Product.find(function(err, response) {
      res.json(response);
	  });
});

// return id of all products as a JSON response
products.get('/identifiers', (req, res) => {
	Product.find("id", function(err, response) {
      res.json(response);
	  });
});

// return products with specified id as a JSON response
products.get('/:id', (req, res) => {
	Product.findById(req.params.id, function(err, response) {
      res.json(response);
	  });
});

// return specified fields of products with specified id as a JSON response
products.get('/:id/:field', (req, res) => {
	Product.findById(req.params.id, req.params.field, function(err, response) {
      res.json(response);
	  });
});

// return images specified by filename
products.get('/images/:filename', (req, res) => {
	Product.find(req.params.filename, function(err, response) {
      res.json(response);
	  });
});

// export route
export default products;