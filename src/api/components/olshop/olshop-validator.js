const joi = require('joi');
const { joiPasswordExtendCore } = require('joi-password');
const { updateBarang } = require('./olshop-repository');
const joiPassword = joi.extend(joiPasswordExtendCore);

module.exports = {
  createBarang: {
    body: {
      name: joi.string().min(1).max(100).required().label('Name'),
      price: joi.number().label('Price'),
      description: joi.string().min(1).max(255).required().label('Description'),
    },
  },

  updateBarang: {
    body: {
      name: joi.string().min(1).max(100).label('Name'),
      price: joi.number().label('Price'),
      description: joi.string().min(1).max(255).label('Description'),
    },
  },
};
