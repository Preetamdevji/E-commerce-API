const moogoose = require('mongoose');

const usersSehema = new moogoose.Schema({
    userName : String,
    email : String,
    password : String
});

module.exports = moogoose.model('users', usersSehema);