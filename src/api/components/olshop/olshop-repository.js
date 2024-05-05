const { Product } = require('../../../models');

/**
 * Get a list of products
 * @returns {Promise}
 */
async function getBarangs(pageNumber, pageSize, filter, sort) {
  const skipCount = (pageNumber - 1) * pageSize;

  let query = {};
  if (filter) {
    query = { $or: [filter] };
  }

  return Product.find(query).sort(sort).skip(skipCount).limit(pageSize);
}

/**
 * Get detail of product
 * @param {string} id - Product ID
 * @returns {Promise}
 */
async function getBarang(id) {
  return Product.findById(id);
}

async function getTotalBarangs() {
  return Product.countDocuments();
}

/**
 * Create new product
 * @param {string} name - Name
 * @param {string} price - Price
 * @param {string} description - Description
 * @returns {Promise}
 */
async function createBarang(name, price, description) {
  return Product.create({
    name,
    price,
    description,
  });
}

/**
 * Update existing product
 * @param {string} id
 * @param {string} name - Name
 * @param {string} price - Price
 * @param {string} description - Description
 * @returns {Promise}
 */
async function updateBarang(id, name, price, description) {
  return Product.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        name,
        price,
        description,
      },
    }
  );
}

/**
 * Delete a product
 * @param {string} id - Product ID
 * @returns {Promise}
 */
async function deleteBarang(id) {
  return Product.deleteOne({ _id: id });
}

module.exports = {
  getBarangs,
  getBarang,
  createBarang,
  updateBarang,
  deleteBarang,
  getTotalBarangs,
};
