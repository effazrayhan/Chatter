const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

// Store connected users: socket.id -> username
const users = {};

io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('join', (username) => {
        socket.username = username;
        users[socket.id] = username;

        // Send existing users to the new user
        socket.emit('user list', Object.values(users));

        // Notify others
        socket.broadcast.emit('user joined', username);
        console.log(`${username} joined`);
    });

    socket.on('chat message', (msg) => {
        io.emit('chat message', { user: socket.username, text: msg+" :)" });
    });

    socket.on('disconnect', () => {
        if (socket.username) {
            delete users[socket.id];
            io.emit('user left', socket.username);
            console.log(`${socket.username} left`);
        }
    });
});

const PORT = 4000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
