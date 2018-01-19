var express = require('express');
var bodyParser = require('body-parser'); //takes a JSON and returns an object

var {mongoose} = require('./db/mongoose.js');

var {Todo} = require('./models/todo.js');
var {User} = require('./models/user.js');

var app = express();

app.use(bodyParser.json()); //This makes the express application use the body parser when returning data

app.post('/todos', (req, res) => {
    console.log(req.body);
    var todo = new Todo({
        text: req.body.text,
        completedAt: req.body.completedAt,
        completed: req.body.completed
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.listen(3000, () => {
    console.log('Started on port 3000');
});
















// var newTodo = new Todo({
//    text: 'Cook dinner'
// });
//
// newTodo.save().then((doc) => {
// console.log(`Saved todo: ${doc}`);
// }, (e) => {
//     console.log('Unable to save todo');
// });

// var otherTodo = new Todo({
//     text: 'Feed the cat',
//     completed: true,
//     completedAt: 1234567
// });
//
// otherTodo.save().then((doc) => {
// console.log(`Saved todo: ${JSON.stringify(doc)}`);
// }, (e) => {
//     console.log('Unable to save todo', e);
// });

// var otherTodo = new Todo({
//     text: '     Make a cake    '
// });
//
// otherTodo.save().then((doc) => {
//     console.log(`Saved todo: ${JSON.stringify(doc)}`);
// }, (e) => {
//     console.log('Unable to save todo', e);
// });


//Make a new user model
//email - require it - trim it - setType String - minlength 1
//create a new user with and without email property


//
// var newUser = new User({
//     email: "  l@m.com   "
// });
//
// newUser.save().then((user) => {
//     console.log("User saved.", JSON.stringify(user));
// }, (error) => {
//     console.log('Unable to add user', error);
// });