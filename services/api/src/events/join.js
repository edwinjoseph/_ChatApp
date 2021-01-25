const user = require('../controllers/user');

const join = (socket, message) => {
  socket.on('join', ({ username, room }) => {
    const _user = user.add(socket.id, username, room);

    socket.join(_user.room);

    message.reply({ ..._user, username: _user.room }, `Welcome ${_user.username}`);
    message.broadcast(_user.room, _user, `${_user.username} has joined the chat`);
  })
};

module.exports = join;
