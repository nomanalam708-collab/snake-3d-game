const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

app.use(express.static('public'));

const WORLD_SIZE = 5000;

let players = {};

function randomPosition() {
  return {
    x: Math.random() * WORLD_SIZE - WORLD_SIZE / 2,
    z: Math.random() * WORLD_SIZE - WORLD_SIZE / 2
  };
}

io.on('connection', (socket) => {

  const spawn = randomPosition();

  players[socket.id] = {
    id: socket.id,
    x: spawn.x,
    z: spawn.z,
    angle: 0,
    size: 1,
    color: `hsl(${Math.random() * 360}, 100%, 50%)`,
    score: 0
  };

  socket.emit('currentPlayer', players[socket.id]);

  io.emit('playersUpdate', players);

  socket.on('move', (data) => {

    if (!players[socket.id]) return;

    players[socket.id].x = data.x;
    players[socket.id].z = data.z;
    players[socket.id].angle = data.angle;

    io.emit('playersUpdate', players);
  });

  socket.on('disconnect', () => {

    delete players[socket.id];

});
