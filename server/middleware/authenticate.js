var {User} = require('./../models/user');

var authenticate = (req, res, next) => {
    var token = req.header('x-auth');
    User.findByToken(token).then((user) => {
        if (!user) {
            // res.status(401).send();
            return Promise.reject(); //Instead of repeating code this will send the request into the catch method below
        }

        req.user = user;
        req.token = token;
        next(); //This must be here to ensure the code in app.get('/users/me') is called

    }).catch((err) => {
        res.status(401).send();
    });
};

module.exports = {authenticate};