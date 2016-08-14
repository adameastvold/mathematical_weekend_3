//================================================================
//                        SETUP
//================================================================
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
//below are my declared routes
var adding = require("./routes/adding");
var subtracting = require("./routes/subtracting");
var dividing = require("./routes/dividing");
var multiplying = require("./routes/multiplying");

app.use(bodyParser.urlencoded({
    extended: true
}));

//================================================================
//                  ROUTE CONNECTION & USE
//================================================================
app.use('/adding', adding);
app.use('/subtracting', subtracting);
app.use('/dividing', dividing);
app.use('/multiplying', multiplying);


//================================================================
//                    STATIC STUFF
//================================================================
app.get('/*', function(req, res) {
    var file = req.params[0] || '/views/index.html'
    res.sendFile(path.join(__dirname, './public', file));
});

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function() {
    console.log('server is running on port ', app.get('port'));
});
