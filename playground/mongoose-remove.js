const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');


// Todo.remove({}).then((result) => {
//     console.log(result);
// });


Todo.findOneAndRemove({_id: '5a65ed397315bd9a150c16f4'}).then((todo) => {
    console.log(todo);
});

Todo.findByIdAndRemove('5a65ed397315bd9a150c16f4').then((todo) => {
    console.log(todo);
});