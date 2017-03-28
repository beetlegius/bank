var PORT = 3000 || process.env.PORT;
var DATABASE_NAME = 'bank';

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var index = require('./server/routes/index');
// var movements = require('./server/routes/movements');

var app = express();

// View engine
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
// app.engine('html', require('ejs').renderFile);

// Set static folder
var static_folder = app.use(express.static(path.join(__dirname, 'client')));

// Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Database
var DB = "mongodb://localhost/" + DATABASE_NAME;
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(DB, function(err) {
  if (err) {
    return err;
  } else {
    console.log('Successfully connected to ' + DB);
  }
});

app.use('/', index);
// app.use('/api', movements);

app.listen(PORT, function(){
  console.log('Server started on port ' + PORT);
});
