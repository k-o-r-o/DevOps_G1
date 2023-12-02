
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
      SalePrice: Number,
      Colour: String,
      Manufacturer: String,
      StartingDateAvailable: Date,
      EndingDateAvailable: Date,
      Type: String,
      PanWidth: Number,
      HandleLength: Number,
      Image: String,
      Description: String
}, { _id: false });

// assign schema to a variable
let Product = mongoose.model("Product", productSchema);

// return all products as a JSON response
products.get('/', (req, res) => {
      
      Product.find(function (err, response) {
            res.json(response);
      });
});

// return id of all products as a JSON response
products.get('/identifiers', (req, res) => {
      
      Product.find("id", function (err, response) {
            res.json(response);
      });
});

// return products with specified id as a JSON response
products.get('/:id', (req, res) => {
      
      Product.findById(req.params.id, function (err, response) {
            res.json(response);
      });
});

// return specified fields of products with specified id as a JSON response
products.get('/:id/:field', (req, res) => {
      
      Product.findById(req.params.id, req.params.field, function (err, response) {
            res.json(response);
      });
});

// return images specified by filename
products.get('/images/:filename', (req, res) => {
      
      Product.find(req.params.filename, function (err, response) {
            res.json(response);
      });
});

// Based on the provided identifier, REPLACE the corresponding object in the MongoDB collection.
products.put('/:id', (req, res) => {
      
      if (Product.find({ _id: req.params.id }).count() > 0) {
            Product.findOneAndReplace({ _id: req.params.id }, { Name: req.body.Name, Price: req.body.Price, SalePrice: req.body.SalePrice, Colour: req.body.Colour, Manufacturer: req.body.Manufacturer, StartingDateAvailable: req.body.StartingDateAvailable, EndingDateAvailable: req.body.EndingDateAvailable, Type: req.body.Type, PanWidth: req.body.PanWidth, HandleLength: req.body.HandleLength, Image: req.body.Image, Description: req.body.Description });
      }
      else {
            Product.create({ _id: req.params.id, Name: req.body.Name, Price: req.body.Price, SalePrice: req.body.SalePrice, Colour: req.body.Colour, Manufacturer: req.body.Manufacturer, StartingDateAvailable: req.body.StartingDateAvailable, EndingDateAvailable: req.body.EndingDateAvailable, Type: req.body.Type, PanWidth: req.body.PanWidth, HandleLength: req.body.HandleLength, Image: req.body.Image, Description: req.body.Description });
      }
});

// Based on the provided identifier, DELETE the corresponding object in the MongoDB collection.
products.delete('/:id', (req, res) => {
      
      if (Product.find({ _id: req.params.id }).count() > 0) {
            Product.findOneAndDelete({ _id: req.params.id });
      }
      else {
            res.send("ID does not exist!");
      }
});

// Based on the provided identifier, UPDATE the corresponding object's FIELD in the MongoDB collection.
products.patch('/:id/:field', (req, res) => {

      // get the field the user wants to update
      var userField = req.params.field;

      if (Product.find({ _id: req.params.id }).count() > 0) {
            Product.findOneAndUpdate({ _id: req.params.id }, { userField: req.body.userField });
      }
      else {
            res.send("ID does not exist!");
      }
});

// Return a specified number of products after skipping the first skip items
products.get('/Page/:skip/:limit', (req, res) => {
      
      Product.find().sort({ EndingDateAvailable: 1 }).limit(req.params.limit).skip(req.params.skip);
});

// export route
export default products;