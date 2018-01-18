// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb'); //No need to pull MongoClient as we're going to use destructuring

// var obj = new ObjectID();
// console.log(obj);

//This is destructuring - make new variables from an objects property
// var user = {name: 'Leanne', age: 27};
// var {name} = user;
// console.log(name);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    // db.collection('Todos').insertOne({
    //     test: 'Something to do',
    //     completed: false
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert todo', err);
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    //Insert new doc into Users collection (name, age, location)
    // db.collection('Users').insertOne({
    //     name: 'Leanne',
    //     age: 27,
    //     location: 'Cardiff'
    // }, (err, result) => {
    //    if (err) {
    //        return console.log('Unable to insert user', err);
    //    }
    //    console.log(result.ops[0]._id.getTimestamp());
    // });


    db.close();
});

