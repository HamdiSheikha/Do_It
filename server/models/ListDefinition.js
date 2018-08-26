const mongoose = require('mongoose');
var autoIncrement = require("mongodb-autoincrement");

autoIncrement.setDefaults({
    collection: 'sequence',     // collection name for counters, default: counters
    field: 'listId',               // auto increment field name, default: _id
    step: 1             // auto increment step
});
const ListDefinitionSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: ''
  },
  listId: {
    type: Number ,
    autoIncremant : true,
    primaryKey : true,


  },
  listName: {
    type: String,
    default: ''
  }
});
ListDefinitionSchema.plugin(autoIncrement.mongoosePlugin);
module.exports = mongoose.model('ListDefinition', ListDefinitionSchema);
