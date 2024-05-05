const joi = require('joi');
const { joiPasswordExtendCore } = require('joi-password');
const { updatePurchase } = require('./purchase-repository');
const joiPassword = joi.extend(joiPasswordExtendCore);

module.exports = {
  createPurchase: {
    body: {
      name: joi.string().min(1).max(100).required().label('Name'),
      price: joi.number().label('Price'),
      description: joi.string().min(1).max(500).required().label('Description'),
    },
  },

  updatePurchase: {
    body: {
      name: joi.string().min(1).max(100).label('Name'),
      price: joi.number().label('Price'),
      description: joi.string().min(1).max(255).label('Description'),
    },
  },
};
