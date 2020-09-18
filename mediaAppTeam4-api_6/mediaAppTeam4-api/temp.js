---------------------------------

const http = require('http')
const app = require('./app')
 
const express = require('express')()
const socketio = require('socket.io')
 
//let users  = []
 
//const app = express()
const server = http.createServer(app)
const io = socketio(server)
 
const PORT = 3000
 
io.on('connection', (socket) => {
    console.log('user connected')
    socket.on('connected', (newUser) => {
        console.log(newUser.name + ' connected!')
        socket.name = newUser.name
        //users.push(newUser.name)
       // io.emit('userList', users)
    })
 
    socket.on('disconnect', () => {
        console.log(socket.name + ' disconnected!')
     //   const currentUsers = users.filter(user => user != socket.name)
      //  users = currentUsers
       // io.emit('userList', users)
    })
 
    socket.on('onMsgFromClient', (message) => {
       // let time = new Date()
      //  message.time = time.toLocaleTimeString().replace('/:\d+ /', ' ')
        console.log('User message is: ' + message)
        io.emit('onMsgFromServer', message + ' in server') 
    })
   
});
 
server.listen(PORT, () => console.log('Server Started!'))