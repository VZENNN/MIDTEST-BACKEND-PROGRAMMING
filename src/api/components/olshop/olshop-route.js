const express = require('express');

const authenticationMiddleware = require('../../middlewares/authentication-middleware');
const celebrate = require('../../../core/celebrate-wrappers');
const olshopController = require('./olshop-controller');
const olshopValidator = require('./olshop-validator');

const route = express.Router();

module.exports = (app) => {
  app.use('/olshop', route);

  // Get list of the products
  route.get('/', authenticationMiddleware, olshopController.getBarangs);

  // Create product
  route.post(
    '/',
    authenticationMiddleware,
    celebrate(olshopValidator.createBarang),
    olshopController.createBarang
  );

  // Get detail of product
  route.get('/:id', authenticationMiddleware, olshopController.getBarangs);

  // Update product
  route.put(
    '/:id',
    authenticationMiddleware,
    celebrate(olshopValidator.updateBarang),
    olshopController.updateBarang
  );

  // Delete product
  route.delete('/:id', authenticationMiddleware, olshopController.deleteBarang);
};
