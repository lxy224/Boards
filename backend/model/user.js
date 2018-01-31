const mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    username : String,
    password : String,
    token : String
});
const model = mongoose.model('users', UserSchema);

module.exports = model