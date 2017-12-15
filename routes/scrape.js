const   express = require('express'),
    router = express.Router(),
    request = require('request'),
    cheerio = require('cheerio'),
    passport = require('passport'),
    jwt = require('jsonwebtoken'),
    rp = require('request-promise'),
    delicious = require('./scrapers/delicious'),
    taste = require('./scrapers/taste'),
    scrapeHelper = require('./scrapers/scrapeHelper'),
    validUrl = require('valid-url');


json = {    name : "",
    description : "",
    imagePath : "",
    user: "",
    ingredients: [],
    cookmethod: [],
};

//  SCRAPE  ROUTE
router.post("/scrapeurl", passport.authenticate('jwt', {session: false}), (req, res, next) => {
    // Prepare for loading page into Cherio
    let uri = req.body.url
    if (validUrl.isUri(uri)){
        var options = {
            uri: req.body.url,
            transform: function (body) {
                return cheerio.load(body);
            }
        };
        runCherio(req, res, options, next)
    } else {
        console.log('here')
        return next(new Error('not a valid uri'))
    }

});



// Function to load page into cherio
function runCherio(req, res, options, next) {
    // Request-promise cherio url, load data into DB
    rp(options)
        .then(function ($) {
            console.log('were here');
            // Supported websites
            console.log(req.body.url);
            cases = ["delicious.com.au", "taste.com.au"];
            var url = req.body.url;

            // Find out site we're scraping from
            i = 0;
            for (i; i < cases.length; i++) {
                if (String(url).includes(cases[i])) {
                    break;
                } else if (i==cases.length-1) {
                    i = cases.length;
                    break;
                }

            }
            if (i==cases.length){
                return next(new Error('not a supported recipe site'))
            }

            var name, description, imagePath, ingredients, cookmethod, cooktime;

            // Run scraper
            switch (i) {
                // Delicious
                case 0:
                    recipe =
                        delicious.scrapeDelicious($, name, description, imagePath, ingredients, cookmethod, req.user._id, cooktime, next);
                    console.log(recipe)
                    scrapeHelper.postRecipe(recipe, res);
                    break;
                //Taste
                case 1:
                    console.log('case1');
                    recipe =
                        taste.scrapeTaste($, name, description, imagePath, ingredients, cookmethod, req.user._id, cooktime, next);
                    console.log(recipe);
                    scrapeHelper.postRecipe(recipe, res);
                    break;
            }

        })

}


module.exports = router;
