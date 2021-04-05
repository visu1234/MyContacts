const mongoose = require("mongoose");

/*
Models are fancy constructors compiled from Schema definitions. 
An instance of a model is called a document. 
Models are responsible for creating and reading documents from the underlying MongoDB database.
*/

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
// Here user (first argument) is the name of collection
module.exports = mongoose.model("user", UserSchema);
