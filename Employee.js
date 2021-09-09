// require the library
const mongoose = require('mongoose');
const uri = process.env.App_Url;

mongoose.connect(`${uri}`,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(() => console.log("database Connnected"));


// creating Schema for Tasks
const todoSchema = new mongoose.Schema({
    title:String,
    description:String
});


const Todo = mongoose.model('ToDo', todoSchema);

// exporting the Schema
module.exports = Todo;