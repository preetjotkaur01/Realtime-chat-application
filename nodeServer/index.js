 // It is a node server which will handle socket io connection .
 // socket io is used for bidirectional connection between server and the client 
 // where socket io pushes any update on either side(client or server side)

 const io = require('socket.io')(8000 ,{
    cors:{
        origin:"*",
        methods:["GET","POST"]
    }
 });
 // 8000 is the port
 const users = {};
 //users is an array for different users that connect to the server
 io.on('connection',socket=>{
    socket.on('new-user-joined', name =>{
          console.log("New user", name);
          users[socket.id] = name;
          socket.broadcast.emit('user-joined',name);
      // broadcast.emit which emits an event to everyone else!!
    });

    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message: message , name: users[socket.id]})
    });

    socket.on('disconnect', message =>{
        socket.broadcast.emit('left', users[socket.id])
    });
 })
 //io.on is going to listen different socket connections(like harry, rohan,divya)
 //socket.on deals with a particular event 

