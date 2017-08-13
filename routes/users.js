const   express = require('express'),
        router = express.Router(),
        passport = require('passport'),
        jwt = require('jsonwebtoken'),
        User = require('../models/user'),
        config = require('../config/database');

//  REGISTER ROUTE
router.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
    });

    User.addUser(newUser,
        (err, user) => {
        if(err){
            res.json({success: false, msg:'failed to register user'})
        } else {
            res.json({success: true, msg:'successfuly registered user: ' + user.username})
        }
    })
});

//  AUTHENTICATE ROUTE
router.post('/authenticate', (req, res) => {
    const   username = req.body.username,
            password = req.body.password;
    User.getUserByUsername(username, (err,user) => {
        if(err) throw err;
        if(!user) {
            return res.json({success:false, msg: 'User not found'})
        }

        user.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch) {
                const token = jwt.sign(user, config.secret, {
                    // 1 week
                    expiresIn: 604800
                });
                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                });
            } else {
                return res.json({
                    success: false,
                    msg: 'wrong password'
                });
            }
        })
    })
});

// PROFILE ROUTER

router.get('/profile', passport.authenticate('jwt', {session: false}), (req,res) => {
    res.json({user: req.user})
});

module.exports = router;
