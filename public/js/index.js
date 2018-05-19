var socket = io();

socket.on('connect', function() {
    console.log('connected to the server');
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('newMessage', function({ from, text, createdAt }) {
    var formattedTime = moment(createdAt).format('h:mm a');
    var li = jQuery('<li></li>');
    li.text(`${from} ${formattedTime}: ${text}`);
    jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function({ from, url, createdAt }) {
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My current location </a>');
    var formattedTime = moment(createdAt).format('h:mm a');

    li.text(`${from} ${formattedTime}: `);
    a.attr('href', url);
    li.append(a);
    jQuery('#messages').append(li);
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