
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

// GET product requests

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

// OTHER requests

// Based on the provided identifier, REPLACE the corresponding object in the MongoDB collection.
products.put('/:id', (req, res) => {
	//STUFF HERE
});

// Based on the provided identifier, DELETE the corresponding object in the MongoDB collection.
products.delete('/:id', (req, res) => {
	//STUFF HERE
});

// Based on the provided identifier, UPDATE the corresponding object’s FIELD in the MongoDB collection.
products.patch('/:id/:field', (req, res) => {
	//STUFF HERE
});

// Return a specified number of products after skipping the first skip items
products.get('/Page/:skip/:limit', (req, res) => {
	//STUFF HERE
});

// export route
export default products;