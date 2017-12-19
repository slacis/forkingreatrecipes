const   express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    passport = require('passport'),
    mongoose = require('mongoose'),
    config = require('./config/database'),
    http = require('http'),
    https = require('https'),
    fs = require('fs');

const app = express();

// SSL CERTS
const options = {
    cert: fs.readFileSync('./sslcert/fullchain.pem'),
    key: fs.readFileSync('./sslcert/privkey.pem')
};

//  ROUTE FILES
const users = require('./routes/users');
const scrape = require('./routes/scrape');
const recipe = require('./routes/recipes');

//  BODY PARSER MIDDLEWARE
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())

//  ACTIVATE CORS
app.use(cors());

//  LIMIT MAXIMUM SOCKETS USED TO PREVENT FLOODING
http.globalAgent.maxSockets = 1;
https.globalAgent.maxSockets = 1;


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
app.use('', recipe);

// ERROR MIDDLEWARE
app.use((err, req, res, next) => {
    console.log(err);
    if (res.headersSent) {
        return next(err)
    }
    // Make this status more appropriate in regards to error
    res.status(500);
    res.json(err.message)
});

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

//  CREATE HTTPS SERVER
https.createServer(options, app).listen(8443);