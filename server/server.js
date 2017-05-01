const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;
// console.log(__dirname + '/../public');
// console.log(publicPath);

var app = express();
var server = http.createServer(app); //Mozemo da koristimo app jer su express i http modul dosta slicni
var io = socketIO(server); //dobijamo web socket server, mozemo da emitujemo i slusamo

app.use(express.static(publicPath));

//prvi argument je koji event hocemo da slusamo
//bult in event connection, on nam omogucava da slusamo novu konekciju (kada je klijent povezan sa serverom)
// i da radimo nesto kada se ta konekcija desi
io.on('connection', (socket) => {
    //socket argument je slican socket-u sa front-end koji nam stize
    console.log('New user connected');

    //pandam kao disconnect na klijentu
    socket.on('disconnect', (socket) => {
        //socket argument je slican socket-u sa front-end koji nam stize
        console.log('New user disconnect');
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});