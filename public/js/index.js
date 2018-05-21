var socket = io();

socket.on('connect', function() {
    console.log('connected to the server');
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('newMessage', function({ from, text, createdAt }) {
    var formattedTime = moment(createdAt).format('h:mm a');
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, { text, from, createdAt: formattedTime });
    jQuery('#messages').append(html);
});

socket.on('newLocationMessage', function({ from, url, createdAt }) {
    var formattedTime = moment(createdAt).format('h:mm a');
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template, { from, url, createdAt: formattedTime });
    jQuery('#messages').append(html);
});

jQuery('#message-form').on('submit', event => {
    event.preventDefault();
    var messageTextBox = jQuery('[name=message]');
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.val()
    }, function() {
        messageTextBox.val('');
    });
});

var locationButton = jQuery('#send-location');

locationButton.on('click', () => {
    if (!navigator.geolocation) { 
        return alert('Geolocation not supported by your browser.');
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function(position) {
        locationButton.removeAttr('disabled').text('Send location');
        const { latitude, longitude } = position.coords;
        socket.emit('createLocationMessage', { latitude, longitude });        
    }, function() {
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location');
    });
});