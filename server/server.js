require('./config/config.js');

const _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser'); //takes a JSON and returns an object

var {mongoose} = require('./db/mongoose.js');
const {ObjectID} = require('mongodb');

var {Todo} = require('./models/todo.js');
var {User} = require('./models/user.js');
var {authenticate} = require('./middleware/authenticate.js');

var app = express();
const port = process.env.PORT;// || 3000; < no longer need this because we check the process.env.NODE_ENV to determine where to run

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

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;

    //validate ID using isValid
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    //Find by ID
    Todo.findById(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    });
});

app.delete('/todos/:id', (req, res) => {
    //get the ID
    var id = req.params.id;
    //Validate the ID - not valid? return 404
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findByIdAndRemove(id).then((todo) => {

        if (!todo) {
            return res.status(404).send();
        }
        res.send({todo: todo});

    }).catch((e) => {
        res.status(400).send();
    });

});

app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    //Validate the ID - not valid? return 404
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }

        res.send({todo});

    }).catch((e) => {
        res.status(400).send();
    });

});

//POST /users

app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);

    var user = new User(body); // { email: body.email, password: body.password } // you can also send the full object

    user.save().then((userRes) => {
        return user.generateAuthToken();
    }).then((token) => { //token comes from the then on the generateAuthToken method in user.js
        res.header('x-auth', token).send(user);
    }).catch((err) => {
        res.status(400).send(err);
    });
});


//middleware to use in app.get /users/me
// var authenticate = (req, res, next) => {
//     var token = req.header('x-auth');
//     User.findByToken(token).then((user) => {
//         if (!user) {
//             // res.status(401).send();
//             return Promise.reject(); //Instead of repeating code this will send the request into the catch method below
//         }
//
//         req.user = user;
//         req.token = token;
//         next(); //This must be here to ensure the code in app.get('/users/me') is called
//
//     }).catch((err) => {
//         res.status(401).send();
//     });
// };
//ABOVE CODE IS NOW IN server/middleware folder

app.get('/users/me', authenticate, (req, res) => { //authenticate then uses the route above with the middleware
    // var token = req.header('x-auth');
    // User.findByToken(token).then((user) => {
    //     if (!user) {
    //         // res.status(401).send();
    //         return Promise.reject(); //Instead of repeating code this will send the request into the catch method below
    //     }
    //
    //     res.send(user);
    // }).catch((err) => {
    //     res.status(401).send();
    // });

    //Instead of all code above, we can use the authenticate middleware with the following line
    res.send(req.user);
});

// POST /users/login {email, password}
app.post('/users/login', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);

    User.findByCredentials(body.email, body.password).then((user) => {
        // res.send(user);
        return user.generateAuthToken().then((token) => { //return here so 400 will be called if there's an error
            res.header('x-auth', token).send(user);
        });
    }).catch((e) => {
        res.status(400).send();
    });

});

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {
    app
};






// if (!ObjectID.isValid(id)) {
//     console.log('ID not valid');
// }
//
// User.findById(id).then((user) => {
//     if (!user) {
//         return console.log('User not found');
//     }
//     console.log('User: ', user);
// }).catch((e) => {
//     console.log(e);
// });









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