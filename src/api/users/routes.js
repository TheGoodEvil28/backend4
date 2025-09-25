const UsersHandler = require('./handler');
const UsersValidator = require('./validator');
const UserService = require('../../services/UserService');

const userService = new UserService();
const usersValidator = new UsersValidator();
const usersHandler = new UsersHandler(userService, usersValidator);

module.exports = [
  {
    method: 'POST',
    path: '/users',
    handler: usersHandler.postUserHandler,
  },
];
