const socket = io();

let currentPlayer = null;
let serverPlayers = {};

socket.on('currentPlayer', (player) => {
  currentPlayer = player;
});

socket.on('playersUpdate', (players) => {
  serverPlayers = players;
});
