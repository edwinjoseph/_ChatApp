const express = require('express');
const socket = require('socket.io');
const cors = require('cors');

const port = 5000;

const app = express();
app.use(cors());

const server = app.listen(port, () => {
  console.info(`Served via port "${port}".`);
});

const io = socket(server, {
  cors: {
    origin: '*'
  },
});

require('./events/init')(io);
