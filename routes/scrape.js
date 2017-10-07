const   express = require('express'),
    router = express.Router(),
    request = require('request'),
    cheerio = require('cheerio'),
    passport = require('passport'),
    Recipe = require('../models/recipe'),
    jwt = require('jsonwebtoken'),
    rp = require('request-promise');


json = {    name : "",
    description : "",
    imagePath : "",
    user: "",
    ingredients: [],
    cookmethod: [],
};

//  SCRAPE  ROUTE
router.post("/scrapeurl", passport.authenticate('jwt', {session: false}), (req, res) => {

    // Prepare for loading page into Cherio
    var options = {
        uri: req.body.url,
        transform: function (body) {
            return cheerio.load(body);
        }
    };
    runCherio(req, res, options)
});



// Function to load page into cherio
function runCherio(req, res, options) {
    // Request-promise cherio url, load data into DB
    rp(options)
        .then(function ($) {
            console.log('were here')
            // Supported websites
            cases = ["delicious", "taste"]
            var url = req.body.url

            // Find out site we're scraping from
            i = 0
            for (i; i < cases.length; i++) {
                if (String(url).includes(cases[i])) break;
            }

            var name, description, imagePath, ingredients, cookmethod;

            // Run scraper
            switch (i) {
                // Delicious
                case 0:
                    recipe =
                        scrapeDelicious($, name, description, imagePath, ingredients, cookmethod, req.user._id)
                    postRecipe(recipe, res)
                    break;
                //Taste
                case 1:
                    recipe =
                        scrapeTaste($, name, description, imagePath, ingredients, cookmethod, req.user._id)
                    postRecipe(recipe, res)
                    break;
            }

        })
        .catch(function (err) {
            // Crawling failed or Cheerio choked...
        });
}


// Scraper for Taste recipes

function scrapeTaste($, name, description, imagePath, ingredients, cookmethod, user){
    console.log('in scrape taste')
    ingredients = [];
    cookmethod = [];
    name = $('h1').text()
    console.log(name)
    description = $('.single-asset-description-block').children().first().text()
    imagePath = $('.lead-image-block').children().first().prop('src')
    // user = user
    console.log(user)
    data = $('.ingredient-description').each(function (ing) {
        ingredient = {name: ($(this).text())}
        ingredients.push(ingredient)
    })
    data = $('.recipe-method-step-content').each(function (index, method) {
        cookmethod.push({stepNo: index, explanation: ($(this).text()).trim()})
    })
    recipe = createRecipe(name, description, imagePath, ingredients, cookmethod, user)
    return recipe

}

// Scraper for Delicious recipes

function scrapeDelicious($, name, description, imagePath, ingredients, cookmethod, user){
    console.log('in scrape delicious')
    ingredients = [];
    cookmethod = [];
    name = $('.content-main-title').text()
    console.log(name)
    description = $('.single-asset-description-block').children().first().text()
    imagePath = $('.block-lead-image').children().first().prop('src')
    // user = user
    console.log(user)
    data = $('.ingredient').children().each(function () {
        ingredient = {name: ($(this).text())}
        ingredients.push(ingredient)
    })
    data = $('.step-description').each(function (index, method) {
        cookmethod.push({stepNo: index, explanation: ($(this).text()).trim()})
    })
    recipe = createRecipe(name, description, imagePath, ingredients, cookmethod, user)
    return recipe

}

// Scraper for Taste recipes

function scrapeTaste($, name, description, imagePath, ingredients, cookmethod, user){
    console.log('in scrape taste')
    ingredients = [];
    cookmethod = [];
    name = $('h1').text()
    console.log(name)
    description = $('.single-asset-description-block').children().first().text()
    imagePath = $('.lead-image-block').children().first().prop('src')
    // user = user
    console.log(user)
    data = $('.ingredient-description').each(function (ing) {
        ingredient = {name: ($(this).text())}
        ingredients.push(ingredient)
    })
    data = $('.recipe-method-step-content').each(function (index, method) {
        cookmethod.push({stepNo: index, explanation: ($(this).text()).trim()})
    })
    recipe = createRecipe(name, description, imagePath, ingredients, cookmethod, user)
    return recipe

}

// Function to create recipe from json

function createRecipe(name, description, imagePath, ingredients, cookmethod, user) {
    console.log('in create and post')
    json.name = name;
    json.description = description;
    json.imagePath = imagePath;
    json.user = user;
    json.ingredients = ingredients;
    json.cookmethod = cookmethod;

    let recipe = new Recipe(json);
    return recipe
}

// Function to post generated recipe

function postRecipe(recipe, res) {
    Recipe.addRecipe(recipe,
        (err, user) => {
            if (err) {
                res.json({success: false, msg: err})
                console.log(err)
            } else {
                res.json(200, [json])
            }
        })
}


module.exports = router;
