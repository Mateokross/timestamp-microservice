// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// endpoint definition
app.get('/api/:date?', function(req, res, next) {

  //get date input
  var input = req.params.date;

 
  //transform to Number if necessary (for unix timestamp input)
  input = isNaN(Number(input)) ? input : Number(input);

  //check if date is empty, if so use current time
  var dateObject = typeof input === 'undefined' ? new Date() : new Date(input)

  //check if valid date
  var isValidDate = !isNaN(dateObject.getTime());

  //if invalid return error
  if (!isValidDate) {
    res.json({ error: "Invalid Date" });
  }

  //create unix & dates
  var unixDate = dateObject.getTime()
  var utcDate = dateObject.toUTCString()

  res.json({ unix: unixDate, utc: utcDate }); 
});







// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
