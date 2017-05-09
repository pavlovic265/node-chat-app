var socket = io(); //pravimo request sa klijenta ka serveru
//socket nam omogucava da slusamo request sa servera, kao i da saljemo request ka serveru

//bult in event connect, je pandam connection sa servera
socket.on('connect', function () {
    //i nemamo socket argument jer ga vecimamo gore definisan
    console.log('Connected to server');

    // Example
    // socket.emit('createEmail', {
    //     to: 'jen@examile.com',
    //     text: 'Hey. This is Marko.'
    // });

});

//Isto bult in event
//Ispalice se kada konkcije padne, ako server padane
socket.on('disconnect', function () {
    console.log('Disconnect from server');
});

// Example
// socket.on('newEmail', function (email) {
//     console.log(email);
// });

socket.on('newMessage',  (message) => {
    var formatedTime = moment(message.createdAt).format('h:mm a');
    var li = $('<li></li>');
    li.text(`${message.from} ${formatedTime}: ${message.text}`)
    $('#messages').append(li);
    console.log(message);
});

socket.on('newLocationMessage',  (message) => {
    var formatedTime = moment(message.createdAt).format('h:mm a');
    var li = $('<li></li>');
    var a = $('<a target="_blank">My current location</a>');
    li.text(`${message.from} ${formatedTime}: `);
    a.attr('href', message.url);
    li.append(a);
    $('#messages').append(li);
    console.log(message);
});


// socket.emit('createMessage', {
//     from: 'Frank',
//     text: 'Hi'
// }, function (data){
//     console.log('Got it!',data);
// });

$('#message-form').on('submit', function(e){
    e.preventDefault();
    var messageTextBox =  $('[name=message]');
    if('' === messageTextBox.val().trim()) return;
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.val()
    }, function() {
        messageTextBox.val('');
        console.log('Done')
    });
});

var locationButton = $('#send-location');
locationButton.on('click', function(){
    if(!navigator.geolocation) {
        return alert('Geolocation not supported by your browser!');
    }
    locationButton.attr('disabled', true).text('Sending location....');

    navigator.geolocation.getCurrentPosition(function(position){
        locationButton.attr('disabled', false).text('Send location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function(){
        locationButton.attr('disabled', false).text('Send location');
        alert('Unable to fetch location.');
    });
});