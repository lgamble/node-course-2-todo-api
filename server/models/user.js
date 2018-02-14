const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        minlength: 1,
        trim: true,
        required: true,
        unique: true,
        validate: {
            validator: //validator.isEmail(value), //This is the same as the below code but says 'value' not set
                (value) => {
                    return validator.isEmail(value);
                },
            message:'{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});


//Override a method
UserSchema.methods.toJSON = function() {
    var user = this;
    var userObject = user.toObject();

    return _.pick(userObject, ['_id', 'email']);
};

//Create a method
UserSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

    user.tokens.push({access, token});

    return user.save().then(() => {
        return token;
    });
};

UserSchema.statics.findByToken = function (token) {
    var User = this;
    var decoded;

    try {
        decoded = jwt.verify(token, 'abc123');
    } catch (e) {
        // return new Promise((resolve, reject) => {
        //     reject();
        // });
        return Promise.reject(); //This is the same as above but simplified and you can pass an error in the parenthesies
    }

    return User.findOne({
       '_id': decoded._id,
       'tokens.token': token, //if a dot is used then the key should be in quotes, normal keys can also be in quotes
       'tokens.access': 'auth'
    });

};

UserSchema.pre('save', function(next) { // using a normal function so we have access to 'this'
    var user = this;
    if (user.isModified('password')) {
        var savedPassword = user.password;

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
               user.password = hash;
               next();
            });
        });

    } else {
        next();
    }


});

var User = mongoose.model('User', UserSchema);

module.exports = {
    User
};
