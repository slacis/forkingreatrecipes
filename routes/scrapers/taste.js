// Scraper for Taste recipes
const scrapeHelper = require('./scrapeHelper');

module.exports.scrapeTaste = function($, name, description, imagePath, ingredients, cookmethod, user, cooktime, next){
    console.log('in scrape taste');
    // Check if recipe page
    if($('.recipe-page').length != 1){
        return next(Error('not a valid recipe uri'))
    } else {
    ingredients = [];
    cookmethod = [];
    // Get recipe name
    name = $('h1').text();
    // Get recipe description
    description = $('.single-asset-description-block').children().first().text();
    // Get preperation and cook times
    prepTimeString = $('ul.recipe-cooking-infos>li>b').eq(0).text().split(':');
    prepTime = parseInt(prepTimeString[0]) * 60 + parseInt(prepTimeString[1]);
    // convert to string => seperate by '.' => multiply 0 index by 60 and add to first index
    cookTimeString =  $('ul.recipe-cooking-infos>li>b').eq(1).text().split(':');
    cookTime = parseInt(cookTimeString[0]) * 60 + parseInt(cookTimeString[1]);
    cooktime = {'prepTime': prepTime, 'cookTime': cookTime};
    // Get image
    imagePath = $('.lead-image-block').children().first().prop('src');
    // Get ingredients
    data = $('.ingredient-description').each(function (ing) {
        ingredient = {name: ($(this).text())};
        ingredients.push(ingredient);
    });
    // Get method
    data = $('.recipe-method-step-content').each(function (index, method) {
        cookmethod.push({stepNo: index, explanation: ($(this).text()).trim()})
    });
    // Add recipe to database
    recipe = scrapeHelper.createRecipe(name, description, imagePath, ingredients, cookmethod, user, cooktime);
    return recipe;
    }
};