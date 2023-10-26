//Drake -> Have not tested these yet! 

//5_ Find the product with the highest price and project the result to display only the Name and Price fields:
db.products.aggregate([
  { $sort: { Price: -1 } },
  { $limit: 1 },
  { $project: { _id: 0, Name: 1, Price: 1 } }
]);


//6_ Find the product with the earliest StartingDateAvailable and project the result to display only the Name and StartingDateAvailable fields:
db.products.aggregate([
  { $sort: { StartingDateAvailable: 1 } },
  { $limit: 1 },
  { $project: { _id: 0, Name: 1, StartingDateAvailable: 1 } }
]);

//7_ Find the most common product color in your data set:
db.products.aggregate([
{"$group": {"_id":{Colour: "$Colour"},count: {$sum: 1}}},
{"$sort": {count: -1}},
{"$limit":1}]);

//8_ Write a MongoDB query to update the inserted records so that all records in your collection will have a field Premium_Brand. If the cost of the product is greater than or equal to $100 set this to True; otherwise, False.
db.products.aggregate([
{$addFields:
{Premium_Brand: { $cond: {if : {$gte:["$Price",100]}, then: true, else: false} }}}])

//9_ 
/*
Write a MongoDB query to update the inserted records so that all records in your
collection will have the field Sale_Price. Set sale price to be 20% discounted on the
original price. For example, if original price is $100, sale price would be $80.
*/


//10_ Find all records with descriptions that include the word "large" and project the result to display only the Name and Description fields:
db.products.aggregate([
  {
    $match: {
      Description: { $regex: /large/i }
    }
  },
  {
    $project: {
      _id: 0,
      Name: 1,
      Description: 1
    }
  }
]);

//11_ Update all existing records and change the field name "Manufacturer" to "Produced_By":
db.products.updateMany(
  {},
  {
    $rename: { "Manufacturer": "Produced_By" }
  }
);

//12_ Find the product that was available for the longest period of time:
db.products.aggregate([
  {
    $addFields: {
      AvailablePeriod: { $subtract: ["$EndingDateAvailable", "$StartingDateAvailable"] }
    }
  },
  {
    $sort: { AvailablePeriod: -1 }
  },
  {
    $limit: 1
  },
  {
    $project: { _id: 0, Name: 1, AvailablePeriod: 1 }
  }
]);

//13_ Find all products that have been discontinued (EndingDate is earlier than today's current date):
const currentDate = new Date();
db.products.find({
  EndingDateAvailable: { $lt: currentDate }
});


//14_ Find Products Manufactured by "True Steel Pans": 
//This query will find all products that are manufactured by "True Steel Pans" and list their names and prices.
db.products.find(
  { Produced_By: "True Steel Pans" },
  { _id: 0, Name: 1, Price: 1 }
);


//15_ Find Products by Color and Type: 
//This query will find all products that are both "Blue" in color and of type "Non-Stick." It will display their names and descriptions.
db.products.find(
  { Colour: "Blue", Type: "Non-Stick" },
  { _id: 0, Name: 1, Description: 1 }
);










