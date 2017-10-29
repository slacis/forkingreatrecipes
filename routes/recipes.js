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
router.get('/recipes',  passport.authenticate('jwt', {session: false}), (req, res) => {
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
router.post('/addrecipe',  passport.authenticate('jwt', {session: false}),  (req, res, next) => {
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
router.post('/updaterecipe',  passport.authenticate('jwt', {session: false}),  (req, res, next) => {
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

//  SEARCH ROUTE
router.post('/ingredientsearch', (req, res, next) => {
    let ingredients = [];
    ingredients = req.body.ingredients
    // ingredients.forEach((ingredient) => {
    //     ingredient.name = new RegExp(ingredient.name)
    // })
    // ingredients.push(req.body.ingredients[1]);
    console.log(ingredients);
    Recipe.matchIngredientsToRecipe(ingredients,
        (err, recipe) => {
            if(err){
                res.json({success: false, msg:'failed: ' + err.message})
            } else {
                res.json({success: true, msg: recipe})
            }
        })
});

module.exports = router;
