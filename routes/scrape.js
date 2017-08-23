const   express = require('express'),
    router = express.Router(),
    request = require('request'),
    cheerio = require('cheerio');

//  REGISTER ROUTE
router.get('/scrape', (req, res, next) => {

    url = "http://www.taste.com.au/recipes/chocolate-crackle-peanut-caramel-slice/ad128d3d-48c2-46df-ab5e-96826b4493e8?r=recipes/chocolateslicerecipes&c=L9PRwoWJ/Chocolate%20slice%20recipes"

    request(url, function(error, response, html){

        // First we'll check to make sure no errors occurred when making the request

        if(!error){
            // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality

            var $ = cheerio.load(html);

            // Finally, we'll define the variables we're going to capture


            var name, description, imagePath, ingredients, cookmethod;
            var json = {    name : "",
                            description : "",
                            imagePath : "",
                            ingredients: [],
                            cookmethod: [],
            };
            ingredients = [];
            cookmethod = [];
            name  = $('h1').text()
            description = $('.single-asset-description-block').children().first().text()
            imagePath = $('.lead-image-block').children().first().prop('src')
            data = $('.ingredient-description').each(function(ing) {
                ingredient =  { name: ($(this).text()) }
                ingredients.push(ingredient)
            })
            data = $('.recipe-method-step-content').each(function(index, method) {
                cookmethod.push( {stepNo: index, explanation: ($(this).text()).trim() })
            })

            json.name = name;
            json.description = description;
            json.imagePath = imagePath;
            json.ingredients = ingredients;
            json.cookmethod = cookmethod;


            console.log(imagePath);
            console.log(cookmethod);
            console.log(description);
            console.log(ingredients)

            res.json(200, [json] );
            // res.send(ingredients[0]);
        }
    })
});

module.exports = router;
