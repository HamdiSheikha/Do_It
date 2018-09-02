const mongoose = require('mongoose');
var autoIncrement = require("mongodb-autoincrement");
autoIncrement.setDefaults({
    collection: 'sequence',     // collection name for counters, default: counters
    field: 'itemId',               // auto increment field name, default: _id
    step: 1             // auto increment step
});

const ToDoListSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: ''
  },
  itemId: {
    type: Number ,
    autoIncremant : true,
    // default:1,
    primaryKey : true,
  },
  item: {
    type: String,
    default: ''
  },
  listId: {
    type: String,
    default: ''
  },
  time: {
    type: String,
    default: ''
  },
  phoneNumber: {
    type: String,
    default: ''
  },
  timestamp: {
    type: Date,
    
  },
});
ToDoListSchema.plugin(autoIncrement.mongoosePlugin);
module.exports = mongoose.model('ToDoList', ToDoListSchema);
