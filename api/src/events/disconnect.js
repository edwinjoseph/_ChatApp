const user = require('../controllers/user');

const disconnect = (socket, message) => {
  socket.on('disconnect', () => {
    const _user = user.remove(socket.id);

    if (_user) {
      message.send({ ..._user, username: _user.room }, `${_user.username} has left the chat`);
    }
  })
};

module.exports = disconnect;
