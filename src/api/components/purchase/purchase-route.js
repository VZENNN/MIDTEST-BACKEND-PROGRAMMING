const express = require('express');

const authenticationMiddleware = require('../../middlewares/authentication-middleware');
const celebrate = require('../../../core/celebrate-wrappers');
const purchaseController = require('./purchase-controller');
const purchaseValidator = require('./purchase-validator');

const route = express.Router();

module.exports = (app) => {
  app.use('/purchase', route);

  // Get list of the products
  route.get('/', authenticationMiddleware, purchaseController.getPurchases);

  // Create product
  route.post(
    '/',
    authenticationMiddleware,
    celebrate(purchaseValidator.createPurchase),
    purchaseController.createPurchase
  );

  // Get detail of product
  route.get('/:id', authenticationMiddleware, purchaseController.getPurchases);

  // Update product
  route.put(
    '/:id',
    authenticationMiddleware,
    celebrate(purchaseValidator.updatePurchase),
    purchaseController.updatePurchase
  );

  // Delete product
  route.delete(
    '/:id',
    authenticationMiddleware,
    purchaseController.deletePurchase
  );
};
