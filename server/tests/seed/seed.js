const {ObjectID} = require('mongodb');
const {Todo} = require('./../../models/todo.js');
const {User} = require('./../../models/user.js');
const jwt = require('jsonwebtoken');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [{
    _id: userOneId,
    email: 'leanne@example.com',
    password: 'userOnePass',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userOneId, access: 'auth'}, 'abc123').toString()
    }]

}, {
    _id: userTwoId,
    email: 'bob@example.com',
    password: 'userTwoPass'
}];

const todos = [{
    _id: new ObjectID(),
    text: 'First test todo'
},{
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 333
}];

const populateTodos = (done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => {
        done();
    });
};

const populateUsers = (done) => {
  User.remove({}).then(() => {
      //These are both promises so we can tack on then, but we want the code to only continue if BOTH are finished
      var userOne = new User(users[0]).save(); //Calling save uses the middleware
      var userTwo = new User(users[1]).save();

      //The then won't be called until both promises are resolved
      return Promise.all([userOne, userTwo]) //.then() - added return at beginning and the then below so both Promises will have completed
  }).then(() => done());
};

module.exports = {
    todos,
    populateTodos,
    users,
    populateUsers
};