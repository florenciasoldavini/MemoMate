const express = require('express');
const server = express();
const routes = require('./routes/index');
const cors = require('cors');

server.use(express.json());

server.use(cors());

server.use('/', routes);

module.exports = server;