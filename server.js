const express = require('express')
const app = express() // make an express app
// serve the files in public statically
app.use(express.static('public'))
const expressServer = app.listen(4000)

const { Server } = require('socket.io') //the object the docs use to make a server
const socketio = require('socket.io')
// io is our socket.io server!
// Capital S is the server constuctor (in the docs, it's the top thing)
// small s is the variable in docs for the server, we call it io
// const io = socketio(expressServer,{
const io = new Server(expressServer,{    
    // serveClient: false,
    cors: [
        'http://localhost:4000'
    ]
})

// on is a regular javascript/node event listener
// emit is the other BIG method
io.on('connection',socket=>{
    console.log(socket.handshake)
    // Capital S in the docs, for Socket is the constuctor
    // lower case s, socket, is an individual socket
    console.log(socket.id, "has joined our server!")
    // 1st arg or emit is the event name
        // anything is OK, except for what is here: https://socket.io/docs/v4/emit-cheatsheet/
    // socket.emit will emit to THIS one socket
    // socket.emit('welcome',[1,2,3]) //push an event to the client/browser
    // // io.emit will emit to ALL sockets connected to the server
    // io.emit('newClient',socket.id)
    // socket.on('thankYou',data=>{
    //     console.log("message from client",data)
    // })
    socket.on('messageFromClientToServer',newMessage=>{
        // pass through the message to everyone connected
        io.emit('messageFromServerToAllClients',newMessage)
    })
})

