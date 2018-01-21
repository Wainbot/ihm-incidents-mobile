var express = require('express');
var app = express.createServer();

app.use(express.staticProvider(__dirname));

app.get('/', function(req, res) {
    res.render('index.html');
});

app.listen(process.env.PORT || 3000, '127.0.0.1');