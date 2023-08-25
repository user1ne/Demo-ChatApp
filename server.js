const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve your HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Manage WebSocket communication
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('user joined', (username) => {
        socket.username = username;
        io.emit('update userlist', getUserList());
    });

    socket.on('chat message', (msg) => {
        io.emit('chat message', `${socket.username}: ${msg}`);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
        io.emit('update userlist', getUserList());
    });
});

// Function to get the list of connected users
function getUserList() {
    const users = [];
    for (const socketId in io.sockets.sockets) {
        if (io.sockets.sockets.hasOwnProperty(socketId)) {
            const socket = io.sockets.sockets[socketId];
            if (socket.username) {
                users.push(socket.username);
            }
        }
    }
    return users;
}

// Start the server
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
