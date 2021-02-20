const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const roomList = [];

io.on("connection", socket => {
    let previousId;

    const safeJoin = currentId => {
      socket.leave(previousId);
      socket.join(currentId, () => console.log(`Socket ${socket.id} joined room ${currentId}`));
      previousId = currentId;
    }

    socket.on("joinRoom", user => {
      safeJoin(user.roomId);

      let room = roomList.find(x => x.roomId == user.roomId);

      if(room && !room.userList.includes(user.username)) {
        room.userList.push(user.username)
      } else {
        roomList.push({ roomId: user.roomId, userList: [user.username] });
      }

      io.in(user.roomId).emit("userList", roomList.find(x => x.roomId == user.roomId).userList);
    });

    socket.on("sendMessageTaboo", message => {
      io.in(message.roomId).emit('receiveMessageTaboo', message.message);
    })

    socket.on("sliderChange", slider => {
      socket.to(slider.roomId).emit("slider", slider);
    });
});

http.listen(4444, () => {
  console.log('Listening on port 4444');
});