const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "*"
  }
});

app.use(cors());

io.on('connection', socket => {
  console.log('User connected:', socket.id);

  socket.on('chat message', msg => {
    io.emit('chat message', msg); // broadcast message to all users
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
