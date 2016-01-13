
var express = require('express');
var app = express();
var opener = require("opener");
app.use(express.static(__dirname));



app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(8081, function () {
  console.log('Example app listening on port 8081!');
  opener("http://localhost:8081/index.html");
})
