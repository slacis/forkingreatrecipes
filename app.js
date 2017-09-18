const   express = require('express'),
        path = require('path'),
        bodyParser = require('body-parser'),
        cors = require('cors'),
        passport = require('passport'),
        mongoose = require('mongoose'),
        config = require('./config/database');

const app = express();
//  ROUTE FILES
const users = require('./routes/users');
const scrape = require('./routes/scrape');

//  BODY PARSER MIDDLEWARE
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())

//  ACTIVATE CORS
app.use(cors());



//  PASSPORT MIDDLEWARE
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

//  CONNECT TO DB
mongoose.connect(config.database);

//  ON DB SUCCESS
mongoose.connection.on('connected', () => {
    console.log('connected to db: ' + config.database);
});

//  ON DB FAILURE
mongoose.connection.on('error', (err) => {
    console.log('db error occurred: ', err.message);
});

//  STATIC FOLDER
app.use(express.static(path.join(__dirname, 'public')));

const port = 3000;
app.set("view engine", "ejs");
app.use(express.static("public"));

//  SET ROUTES
app.use('/users', users);
app.use('', scrape);
//  INDEX ROUTE
app.get('/', (req, res) => {
    res.send("working");
});


//  WILDCARD ROUTE
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

//  START SERVER
app.listen(port, () => {
    console.log('server started on port: ' + port)
});