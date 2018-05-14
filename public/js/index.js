var socket = io();

socket.on('connect', function() {
    console.log('connected to the server');
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('newMessage', function({from, text}) {
    var li = jQuery('<li></li>');
    li.text(`${from}: ${text}`);
    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', event => {
    event.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function() {
        
    });
});