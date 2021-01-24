const users = new Map();

const add = (id, username, room) => {
  const user = { id, username, room };
  users.set(id, user);
  return user;
}

const find = (id) => {
  if (!id) {
    throw {
      code: 0001,
      message: 'User ID requied to fetch user data',
    };
  }

  const _user = users.get(id);
    
  if (!_user) {
    throw {
      code: 0002,
      message: 'User not found',
    };
  }

  return _user;
}

const remove = (id) => {
  if (!id) {
    throw {
      code: 0003,
      message: 'User ID requied to remove user',
    };
  }

  const _user = users.get(id);
  users.delete(id);

  return _user;
} 

module.exports = {
  add,
  find,
  remove,
};
