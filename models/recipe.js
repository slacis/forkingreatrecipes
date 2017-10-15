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
    },
    cooktime: {
        type: mongoose.Schema.Types.Mixed
    }
});


const Recipe = module.exports = mongoose.model('Recipe', RecipeSchema);

module.exports.addRecipe = function(recipe, callback) {
    recipe.save(callback);
}