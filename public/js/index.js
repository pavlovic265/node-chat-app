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

socket.on('newMessage',  (newMessage) => {
    console.log(newMessage);
});
