const buildMessage = (userId, user, text) => ({ userId, user, text })

const messageFactory = (io, socket) => ({
  reply: (user, text) => {
    socket.emit('message', buildMessage(user.id, user.username, text))
  },
  send: (user, text) => {
    io.to(user.room).emit('message', buildMessage(user.id, user.username, text))
  },
  broadcast: (room, user, text) => {
    socket.broadcast.to(room).emit("message", buildMessage(user.id, room, text))
  }
});

const init = (io) => {
  io.on('connection', socket => {
    const message = messageFactory(io, socket);

    require('./join')(socket, message);
    require('./chat')(socket, message);
    require('./disconnect')(socket, message);
  });
};

module.exports = init;