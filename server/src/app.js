const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const roomList = [];
const wordsList = [];

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

    socket.on("joinRoom", joinDetails => {
        safeJoin(joinDetails.roomId);

        let room = roomList.find(x => x.roomId == joinDetails.roomId);

        if (room && !room.userList.includes(joinDetails.user)) {
            room.userList.push(joinDetails.user)
        } else {
            joinDetails.user.isHost = true;
            roomList.push({ roomId: joinDetails.roomId, userList: [joinDetails.user] });

        }

        emitUserList(joinDetails.roomId);

        socket.on('disconnect', () => {
            let room = roomList.find(x => x.roomId == joinDetails.roomId);

            if (room && room.userList.includes(joinDetails.user)) {
                room.userList = room.userList.filter(user => user != joinDetails.user)
                if (room.userList[0] && joinDetails.user.isHost) {
                    room.userList[0].isHost = true;
                }
            }
            console.log(`Socket ${socket.id} disconnected from room ${joinDetails.roomId}`);
            emitUserList(joinDetails.roomId);
        });
    });

    socket.on("startGame", roomId => {
        let room = roomList.find(x => x.roomId == roomId);
        shuffle(room.userList);
        emitUserList(roomId);

        io.in(roomId).emit('startGameEvent', true);
    });

    socket.on("ready", roomId => {
        io.in(roomId).emit('readyEvent', true)
    });

    socket.on("sendTabooWords", words => {
        if(wordsList.find(x => x.roomId == words.roomId)) {
            wordsList.find(x => x.roomId == words.roomId).tabooWords = words.tabooWords;
        } else {
            wordsList.push(words);
        }
    });

    socket.on("sendMessageTaboo", message => {
        if(wordsList.find(x => x.roomId == message.roomId).tabooWords[message.currentWordIndex].toLowerCase() == message.message.text.toLowerCase()) {
            message.message.isCorrect = true;
        }

        io.in(message.roomId).emit('receiveMessageTaboo', message.message);
    });

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