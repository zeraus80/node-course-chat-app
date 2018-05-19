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

socket.on('newLocationMessage', function({ from, url }) {
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My current location </a>');
    
    li.text(`${from}: `);
    a.attr('href', url);
    li.append(a);
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

var locationButton = jQuery('#send-location');

locationButton.on('click', () => {
    if (!navigator.geolocation) { 
        return alert('Geolocation not supported by your browser.');
    }

    navigator.geolocation.getCurrentPosition(function(position) {
        console.log(position);
        const { latitude, longitude } = position.coords;
        socket.emit('createLocationMessage', { latitude, longitude });        
    }, function() {
        alert('Unable to fetch location');
    });
});