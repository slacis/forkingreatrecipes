const       mongoose = require('mongoose'),
            config = require('../config/database'),
            Ingredient = require('./classes/ingredient'),
            CookMethod = require('./classes/cookmethod');


// RECIPE SCHEMA

const RecipeSchema = mongoose.Schema({
    name: {
        type: String
    },
    description: {
        type: String,
    },
    imagePath: {
        type: String,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    ingredients: {
        type: [mongoose.Schema.Types.Mixed],
    },
    cookmethod: {
        type: [mongoose.Schema.Types.Mixed],
    }
});


const Recipe = module.exports = mongoose.model('Recipe', RecipeSchema);

module.exports.matchIngredientsToRecipe = function(ingredients, callback) {
    // Find recipe that has all ingredients
    console.log(ingredients)
    // const query = {ingredients: { $all : ingredients}};
    Recipe.find(function() {
        // Implant your query JSON object here
        var query_obj = [{"name" : "fruit"},
            {"name" : "toast"},
        ];
        return ingredients.filter(function(ingredient) {
                var has_ingredients = false;
                query_obj.forEach(function(query) {
                    has_ingredients |= (ingredient.name);
                });
                return has_ingredients;
            }).length === ingredients.length;
    }, callback)
    // Recipe.find(query, callback)
}

module.exports.addRecipe = function(recipe, callback) {
    recipe.save(callback);
}