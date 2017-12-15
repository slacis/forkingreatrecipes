const   express = require('express'),
    router = express.Router(),
    request = require('request'),
    Recipe = require('../models/recipe'),
    config = require('../config/database'),
    Ingredient = require('../models/classes/ingredient'),
    CookMethod = require('../models/classes/cookmethod'),
    passport = require('passport'),
    jwt = require('jsonwebtoken');

// GET ALL RECIPES ROUTE
router.get('/recipe',  passport.authenticate('jwt', {session: false}), (req, res) => {
    //get all recipes
    Recipe.find({'user': req.user._id}, (err, userRecipes) => {
        if(err){
            console.log(err);
        } else {
            res.send(userRecipes);
        }
    });
});

//  ADD RECIPE ROUTE
router.post('/recipe',  passport.authenticate('jwt', {session: false}),  (req, res, next) => {
    let recipe = new Recipe({
        name: req.body.name,
        description: req.body.description,
        imagePath: req.body.imagePath,
        user: req.user._id,
        ingredients: req.body.ingredients,
        cookmethod: req.body.cookmethod,
        cooktime: req.body.cooktime
    });

    Recipe.addRecipe(recipe,
        (err, user) => {
            if(err){
                res.json({success: false, msg:'failed to add recipe'})
            } else {
                res.json({success: true, msg:'successfully added recipe: ' + recipe.name})
            }
        })
});

//  UPDATE RECIPE ROUTE
router.put('/recipe',  passport.authenticate('jwt', {session: false}),  (req, res, next) => {
    console.log('entered')
    console.log(req.body._id)
    let update = {
        name: req.body.name,
        description: req.body.description,
        imagePath: req.body.imagePath,
        user: req.user._id,
        ingredients: req.body.ingredients,
        cookmethod: req.body.cookmethod,
        cooktime: req.body.cooktime
    };
    Recipe.findOneAndUpdate({_id: req.body._id}, update, { overwrite: true, returnNewDocument: true },
        (err, recipe) => {
            if(err){
                res.json({success: false, msg:'failed to update recipe'})
                console.log(err)
            } else {
                res.json({success: true, msg:'successfully updated recipe: ' + recipe.name})
                console.log("success")
            }
        })
});

//  DELETE RECIPE ROUTE
router.delete('/recipe',  passport.authenticate('jwt', {session: false}),  (req, res, next) => {
    console.log(req.body._id)
    Recipe.findOneAndRemove({_id: req.body._id},
        (err, recipe) => {
            if(err){
                res.json({success: false, msg:'failed to delete recipe'})
                console.log(err)
            } else {
                res.json({success: true, msg:'successfully deleted recipe: ' + req.body.name})
                console.log("success")
            }
        })
});

module.exports = router;
