// Scraper for Delicious recipes
const scrapeHelper = require('./scrapeHelper');

module.exports.scrapeDelicious = function($, name, description, imagePath, ingredients, cookmethod, user, cooktime, next){
    console.log('in scrape delicious');
    // Check if article is recipe
    if ($('.content-recipe').length != 1) {
        return next(Error('not a valid recipe uri'))
    } else {
        ingredients = [];
        cookmethod = [];
        cooktime;
        name = $('.content-main-title').text();
        console.log(name);
        description = $('.introduction-text').text();
        imagePath = $('.lead-image').first().prop('src');
        prepTimeString = $('.cooking-info-block .text').eq(1).text();
        cookTimeString = $('.cooking-info-block .text').eq(2).text();
        console.log(cookTimeString);
        prepTime = parseInt(prepTimeString.replace(/[^\d]/g, ''), 10);
        cookTime = parseInt(cookTimeString.replace(/[^\d]/g, ''), 10);
        cooktime = {'prepTime': prepTime, 'cookTime': cookTime};
        console.log(cooktime);
        console.log(user);
        data = $('.ingredient').children().each(function () {
            console.log('-')
            console.log(($(this).text()))
            console.log('-')
            ingredient = {name: ($(this).text()).trim()};
            ingredients.push(ingredient)
        });
        data = $('.step-description').each(function (index, method) {
            cookmethod.push({stepNo: index, explanation: ($(this).text()).trim()})
        });
        console.log(cookmethod)
        recipe = scrapeHelper.createRecipe(name, description, imagePath, ingredients, cookmethod, user, cooktime);
        console.log(recipe)
        return recipe
    }
};
