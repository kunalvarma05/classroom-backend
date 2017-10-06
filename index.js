require('dotenv').load();

const http = require('http');
const path = require('path');
const express = require('express');
var cors = require('cors')
const tokenGenerator = require('./src/token_generator');

// Create Express webapp
const app = express();

app.use(cors())
app.use(express.static(path.join(__dirname, 'public')));

app.options('*', cors())

app.get('/', function (request, response) {
  response.send({
    message: "Ignorance is Bliss."
  });
});

app.get('/generate', function (request, response) {
  const identity = request.query.identity || 'identity';
  const room = request.query.room;
  response.json({
    token: tokenGenerator(identity, room)
  });
});

// Create an http server and run it
const server = http.createServer(app);
const port = process.env.PORT || 3000;
server.listen(port, function () {
  console.log('Express server running on *:' + port);
});
