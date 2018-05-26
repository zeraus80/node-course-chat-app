const path = require('path');
const http = require('http');

const express = require('express');
const socketIO = require('socket.io');

const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');
const { Users } = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', socket => {
    console.log('new user connected');

    socket.on('join', ({name, room}, callback) => {
        if (!isRealString(name) || !isRealString(room)) {
            return callback('Name and room name are required');
        }

        socket.join(room);
        users.removeUser(socket.id);
        users.addUser(socket.id, name, room);

        io.to(room).emit('updateUserList', users.getUserList(room));
        socket.emit('newMessage',  generateMessage('Admin', 'Welcome to the chat app'));
        socket.broadcast.to(room).emit('newMessage', generateMessage('Admin', `${name} has joined`));    

        callback();
    });

    socket.on('createMessage', ({text}, callback) => {
        var user = users.getUser(socket.id);
        if (user && isRealString(text)) {
            io.to(user.room).emit('newMessage', generateMessage(user.name, text));
        }
        callback();
    });

    socket.on('createLocationMessage', ({ latitude, longitude }) => {
        var user = users.getUser(socket.id);
        if (user) {
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, latitude, longitude));
        }
    });

    socket.on('disconnect', () => {
        var user = users.removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
        }
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});