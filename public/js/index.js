var socket = io();

socket.on('connect', function() {
    console.log('connected to the server');

    socket.emit('createMessage', {
        to: 'Antonio',
        text: 'Hi, this is Javier'
    });
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
    console.log('new message', message);
});