// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb'); //No need to pull MongoClient as we're going to use destructuring

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    // db.collection('Todos').find({
    //     _id: new ObjectID('5a5f8600ddc7486b37b4036d')
    // }).toArray().then((docs) => { //toArray is a Promise
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('Unable to fetch todos', err);
    // });

    // db.collection('Todos').find().count().then((count) => { //toArray is a Promise
    //     console.log('Todos');
    //     console.log(`Todos count: ${count}`);
    // }, (err) => {
    //     console.log('Unable to fetch todos', err);
    // });

    db.collection('Users').find({name: 'Leanne'}).toArray().then((docs) => {
        console.log(`Users named Leanne: \n\n${JSON.stringify(docs, undefined, 2)}\n\nTotal: ${docs.length}`);
    }, (err) => {
       console.log('Unable to fetch users', err);
    });

    // db.close();
});
