const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

var password = '123abc!';

bcryptjs.genSalt(10, (err, salt) => {
   bcryptjs.hash(password, salt, (err, hash) => {
       console.log(hash);
   });
});

var hashedPassword = '$2a$10$2oDBHwOCvf0sbbmPa1H4b.OYMFPJZPLA1R5pXbygM.FueMJabq39y';

bcryptjs.compare(password, hashedPassword, (err, res) => {
   console.log(res);
});


// var data = {
//     id: 10
// };
//
// var token = jwt.sign(data, '123abc');
// // jwt.verify()
//
// console.log(token);
//
// var decoded = jwt.verify(token, '123abc');
// console.log('decoded', decoded);



// var message = "I am user number 4";
//
// var hash = SHA256(message).toString();
//
// console.log(`Message: ${message} \n\nHash: ${hash}`);



// var data = {
//     id: 4
// };
//
// var token = {
//     data: data,
//     hash: SHA256(JSON.stringify(data) + "somesecret").toString()
// };
//
// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
//
// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();
//
// if (resultHash === token.hash) {
//     console.log('Data was not changed');
// } else {
//     console.log('Data was changed, don\'t trust');
// }