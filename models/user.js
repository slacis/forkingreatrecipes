const   mongoose = require('mongoose'),
        bcrypt = require('bcryptjs'),
        config = require('../config/database');

// USER SCHEME

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

module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback) {
    const query = {username: username};
    User.findOne(query, callback);
}

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

module.exports.comparePassword = function(candidatePass, hash, callback) {
    bcrypt.compare(candidatePass, hash,
        (err, isMatch) => {
        if(err) throw err;
    callback(null, isMatch);
})



}