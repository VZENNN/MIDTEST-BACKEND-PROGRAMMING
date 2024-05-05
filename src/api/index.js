const express = require('express');

const authentication = require('./components/authentication/authentication-route');
const users = require('./components/users/users-route');
const olshop = require('./components/olshop/olshop-route');
const purchase = require('./components/purchase/purchase-route');

module.exports = () => {
  const app = express.Router();

  authentication(app);
  users(app);
  olshop(app);
  purchase(app);

  return app;
};
