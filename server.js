const express = require('express');
const cors = require('cors');

const server = express();

const users = require('./users');
const cards = require('./cards');

server.use(express.json());
server.use('/api/users', users);
server.use('/api/cards', cards);

server.get('/', (req, res) => {

  res.status(200).send('its alive homie');

});

module.exports = server;
