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

    const emitUserList = roomId => {
      io.to(roomId).emit("userList", roomList.find(x => x.roomId == roomId).userList);
    }
    
    // Used like so
    var arr = [2, 11, 37, 42];
    shuffle(arr);
    console.log(arr);

    socket.on("joinRoom", joinDetails => {
      safeJoin(joinDetails.roomId);

      let room = roomList.find(x => x.roomId == joinDetails.roomId);

      if(room && !room.userList.includes(joinDetails.user)) {
        room.userList.push(joinDetails.user)
      } else {
        joinDetails.user.isHost = true;
        roomList.push({ roomId: joinDetails.roomId, userList: [joinDetails.user] });

      }

      emitUserList(joinDetails.roomId);

      socket.on('disconnect', () => {
        let room = roomList.find(x => x.roomId == joinDetails.roomId);

        if(room && room.userList.includes(joinDetails.user)) {
          room.userList = room.userList.filter(username => username != joinDetails.user)
          if(room.userList[0] && joinDetails.user.isHost) {
            room.userList[0].isHost = true;
          }
        }
        console.log(`Socket ${socket.id} disconnected from room ${joinDetails.roomId}`);
        emitUserList(joinDetails.roomId);
      });
    });

    socket.on("startGame", roomId => {
      let room = roomList.find(x => x.roomId == joinDetails.roomId);
      shuffle(room.userList);
      emitUserList(joinDetails.roomId);

      io.in(roomId).emit('startGameEvent', true);
    });

    socket.on("ready", roomId => {
      
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

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}