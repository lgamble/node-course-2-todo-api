// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb'); //No need to pull MongoClient as we're going to use destructuring

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    //deleteMany
    // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
    //     console.log(result);
    // });

    //deleteOne
    // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
    //     console.log(result);
    // });

    //findOneAndDelete - gets object back
    // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
    //     console.log(result);
    // });

    //delete all duplicates of a user
    // db.collection('Users').deleteMany({name: 'Leanne'}).then((result) => {
    //    console.log(result);
    // });

    //delete one user with ID
    db.collection('Users').findOneAndDelete({_id: new ObjectID('5a5f82b73b5bfb3e54c0a511')}).then((results) => {
        console.log(JSON.stringify(results, undefined, 2));
    });


    // db.close();
});
