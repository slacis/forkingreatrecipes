const   mongoose = require('mongoose'),
    bcrypt = require('bcryptjs'),
    config = require('../config/database');

// USER SCHEMA

const UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = module.exports = mongoose.model('User', UserSchema);

// Get user by id
module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
}
// Get user by username
module.exports.getUserByUsername = function(username, callback) {
    const query = {username: username};
    User.findOne(query, callback);
}
// Add user
module.exports.addUser = function(newUser, callback){
    bcrypt.genSalt(10, (err,salt) => {
        bcrypt.hash(newUser.password, salt, (err,hash) => {
            if(err) {
                console.log(err.message)
            }
            newUser.password = hash;
            newUser.save(callback)
        })
    })
}

// Compare password in database to salted hash
module.exports.comparePassword = function(candidatePass, hash, callback) {
    bcrypt.compare(candidatePass, hash,
        (err, isMatch) => {
            if(err) throw err;
            callback(null, isMatch);
        })



}