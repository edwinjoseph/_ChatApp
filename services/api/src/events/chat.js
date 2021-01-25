const user = require('../controllers/user');

const chat = (socket, message) => {
  socket.on('chat', (text) => {
    const _user = user.find(socket.id);
    message.send(_user, text);
  })
};

module.exports = chat;
