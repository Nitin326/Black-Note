const express = require('express');
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;

// importing the DataBase
const Todo = require('./Employee');
const todoData = Todo.find({});

// to use encrypted data
app.use(express.urlencoded());

//assets path
app.set('/assets',express.static('assets'));

// set up the view engine
app.set('view engine', 'ejs');

app.get('/',(req,res) =>{
    res.render('Home');
})

app.post('/add',(req,res) =>{
    const userNotes = new Todo({
        title:req.body.Title,
        description:req.body.Description
    })
    userNotes.save();
    res.redirect("/");
})

app.get('/add',(req,res) =>{
    res.render('Add');
})

app.get('/all',(req,res) =>{
    Todo.find({}, function(err, data){
        if(err){
            console.log('Error in fetching tasks from db');
            return;
        }

        return res.render('All', {
            tittle: "Home",
            list: data
        });
    })
})


app.get('/delete/:id',(req,res) =>{
    var id = req.params.id;
    var del = Todo.findByIdAndDelete(id);

    del.exec(function(err){
        if(err){
            console.log(err);
            return;
        }

        return res.redirect('/all')
    })
}) 

app.get('/edit/:id',(req,res) =>{
    var id = req.params.id;
    var edit = Todo.findById(id);
    edit.exec(function(err,data){
        if(err){
            console.log(err);
        }
        else{
            res.render('Edit',{list:data})
        }
    })
}) 

app.post('/update',(req,res) =>{

    var update = Todo.findByIdAndUpdate(req.body.id,{
        title:req.body.Title,
        description:req.body.Description
    });

    update.exec(function(err,data){
        if(err){
            console.log(err);
            return;
        }

        return res.redirect('/all')
    })
})

app.listen(`${port}`, () => console.log(`App running at ${port}`));