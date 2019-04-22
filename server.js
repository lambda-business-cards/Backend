const express = require('express');
const cors = require('cors');

const server = express();

const users = require('./users');

server.use(express.json());
server.use('/api/users', users);

server.get('/', (req, res) => {

  res.status(200).send('its alive homie');

});

module.exports = server;
