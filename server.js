var express = require('express');
var app = express();

app.use(express.static(__dirname));
app.set('port', process.env.PORT || 3000);

app.get('/', function(req, res) {
    res.render('index.html');
});

app.listen(app.get('port'));