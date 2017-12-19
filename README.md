# Fork'n' Grate Recipes

MEAN Stack Angular 4 Application

Do you find it hard to keep track of multiple recipes from popular sites? 
Do you ever make changes to the recipes you use but forget the amount of ingredients that work best for you? 
Forking Great Recipes is a recipe scraper that scrapes the content from popular recipe websites and adds them to your own person/editable page. 

Sites supported: Taste, Delicious

## Getting Started

1. Clone the git repository to your computer 
2. Create a MongoDB Database either locally or remotely: https://www.mongodb.com/
3. In the 'config' folder, create a file called 'database.js' and fill it with the following details:

```
// Database details and secret
module.exports= {
    database: 'mongodb://username:password@your.mongo.db.address:27017/yourdatabasename',
    secret: 'yoursecret'
}
```
4. Run 'npm install' inside the base folder
5. run 'npm start' to start the backend (If you are running locally, comment out lines 15-17 and line 95 to ignore SSL certificates being read in)
6. In the angular-app/services folder, the data-storage and auth service will be pointing to localhost:3000 as the backend by default.
Feel free to change this if necessary.
7. Navigate to the angular-app folder and run 'ng serve' to start the front end.
8. The app should be up and running


### Prerequisites

* [NPM](https://www.npmjs.com/) - Node Packet Manager
* [Angular CLI](https://cli.angular.io/) - Angular Command Line Interface
* [MongoDB](https://www.mongodb.com/)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* The front end was built using knowledge gained from this wonderful Angular course: 
https://www.udemy.com/the-complete-guide-to-angular-2/learn/v4/overview
