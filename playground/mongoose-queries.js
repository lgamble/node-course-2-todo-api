const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '5a60bb33d44125225458ef5c';

// if (!ObjectID.isValid(id)) {
//     console.log('ID not valid');
// }
//
// Todo.find({
//    _id: id
// }).then((todos) => {
//     console.log('Todos:', todos);
// });
//
// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo:', todo);
// });
//
// Todo.findById(id).then((todo) => {
//     if (!todo) {
//         return console.log('Id not found');
//     }
//     console.log('Todo by id:', todo);
// }).catch((e) => {
//     console.log(e);
// });

// User.findById


if (!ObjectID.isValid(id)) {
    console.log('ID not valid');
}

User.findById(id).then((user) => {
    if (!user) {
        return console.log('User not found');
    }
    console.log('User: ', user);
}).catch((e) => {
    console.log(e);
});