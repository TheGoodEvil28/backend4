const AuthenticationsHandler = require('./handler');
const AuthenticationsValidator = require('./validator');
const AuthenticationService = require('../../services/AuthenticationService');

const authService = new AuthenticationService();
const authValidator = new AuthenticationsValidator();
const authHandler = new AuthenticationsHandler(authService, authValidator);

module.exports = [
  {
    method: 'POST',
    path: '/authentications',
    handler: authHandler.postAuthenticationHandler,
  },
  {
    method: 'PUT',
    path: '/authentications',
    handler: authHandler.putAuthenticationHandler,
  },
  {
    method: 'DELETE',
    path: '/authentications',
    handler: authHandler.deleteAuthenticationHandler,
  },
];
