var express = require('express');
var app = express();
var mongo = require('mongodb').MongoClient;
var assert = require('assert');
var bodyParser = require('body-parser');
var cors = require('cors');
var ObjectID = require('mongodb').ObjectID;

// //ROUTES
var bookmark_route = require('./routes/bookmark_routes');
var tag_route = require('./routes/tag_routes');


var Bookmark = require('./configuration/collection_bookmark');
var Tag = require('./configuration/collection_tag');


//Configuring Port
app.set('port', (process.env.PORT || 8000));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});

const url = 'mongodb://localhost:27017/bookmark';
const connect  = mongo.connect(url, { useFindAndModify: false,  useUnifiedTopology: true, useNewUrlParser: true});

connect.then((db) => {
  console.log('Connected correctly to MongoDB..');
}, (err) => { console.log(err); });

bookmark_route.configure(app, mongo, ObjectID, url, assert, Bookmark);
tag_route.configure(app, mongo, ObjectID, url, assert, Tag);


app.get('/', function (req, res) {
    res.send("WELCOME");
});