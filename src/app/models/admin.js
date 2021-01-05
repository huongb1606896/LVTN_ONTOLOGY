const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const admin = new Schema({
  
  name:{ type:String, maxLength:255 },
  passwd:{ type:String, maxLength: 255 }, 
  
});

module.exports = mongoose.model("admin", admin);