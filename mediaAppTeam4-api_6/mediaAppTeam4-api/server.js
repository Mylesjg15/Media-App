const http = require('http')
const app = require('./app')
 
const express = require('express')()
const socketio = require('socket.io')

const server = http.createServer(app)
const io = socketio(server)
 
const PORT = 3000

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('user', (user) => {
        console.log("User: " + user);
        socket.broadcast.emit('user', user)
    });
    socket.on('message', (msg) => {
        console.log("Sent: " + msg);
        socket.broadcast.emit('message', msg);
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});


