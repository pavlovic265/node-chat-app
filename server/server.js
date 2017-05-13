const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;
// console.log(__dirname + '/../public');
// console.log(publicPath);

var app = express();
var server = http.createServer(app); //Mozemo da koristimo app jer su express i http modul dosta slicni
var io = socketIO(server); //dobijamo web socket server, mozemo da emitujemo i slusamo
var users = new Users();

app.use(express.static(publicPath));

//prvi argument je koji event hocemo da slusamo
//bult in event connection, on nam omogucava da slusamo novu konekciju (kada je klijent povezan sa serverom)
// i da radimo nesto kada se ta konekcija desi
io.on('connection', (socket) => {
    //socket argument je slican socket-u sa front-end koji nam stize
    console.log('New user connected');

    // Example
    // socket.emit('newEmail', {
    //     from: 'mike@examole.com',
    //     text: 'Hey. What is going on.',
    //     createAt: 123
    // });

    // Example
    // socket.on('createEmail',  (newEmail) => {
    //     console.log(newEmail);
    // });

    socket.on('join', (params, callback) => {
        if(!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and a room name are required.');
        }

        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));

        // io.emit                  <=> io.to(room).emit(someMessage) - posalce poruku svim u odredjenoj sobi
        // socket.broadcast.emit    <=> socket.broadcast.to(room).emit - posalce svim poruku sem odredjenog user-a
        // socket.emit              <=> koristice se isto samo poslace poruku odredjenom user-u

        socket.emit('newMessage', generateMessage('Admin', 'Wellcome to chat app'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joind.`));

        callback()
    });

    socket.on('createMessage',  (message, callback) => {
        // console.log(message)
        var user = users.getUser(socket.id);
        if(user && isRealString(message.text)) {
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
            callback('This is from server.');
        }

        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });
    });

    socket.on('createLocationMessage', (cords) => {
        var user = users.getUser(socket.id);
        if(user) {
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, cords.latitude, cords.longitude));
        }
    });

    //pandam kao disconnect na klijentu 
    socket.on('disconnect', () => {
        //socket argument je slican socket-u sa front-end koji nam stize
        console.log('New user disconnect');
        var user = users.removeUser(socket.id);

        if(user) {
            io.to(user.room).emit('updateUserList', users.getUserList(users.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
        }
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});