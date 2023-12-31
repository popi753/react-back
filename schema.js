const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    teams:{
      type:Array,
      required:false,
    },
    time:{
      type:Date,
      required:false,
    }
  });
  
  const mycolect = mongoose.model("mycolect", userSchema);


  module.exports = mycolect
