const { Purchase } = require('../../../models');

/**
 * Get a list of purchases
 * @returns {Promise}
 */
async function getPurchases(pageNumber, pageSize, filter, sort) {
  const skipCount = (pageNumber - 1) * pageSize;

  let query = {};
  if (filter) {
    query = { $or: [filter] };
  }

  return Purchase.find(query).sort(sort).skip(skipCount).limit(pageSize);
}

/**
 * Get detail of purchase
 * @param {string} id - Purchase ID
 * @returns {Promise}
 */
async function getPurchase(id) {
  return Purchase.findById(id);
}

async function getTotalPurchases() {
  return Purchase.countDocuments();
}

/**
 * Create new purchase
 * @param {string} name - Name
 * @param {string} price - Price
 * @param {string} description - Description
 * @returns {Promise}
 */
async function createPurchase(name, price, description) {
  return Purchase.create({
    name,
    price,
    description,
  });
}

/**
 * Update existing purchase
 * @param {string} id
 * @param {string} name - Name
 * @param {string} price - Price
 * @param {string} description - Description
 * @returns {Promise}
 */
async function updatePurchase(id, name, price, description) {
  return Purchase.updateOne(
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
 * Delete a purchase
 * @param {string} id - Purchase ID
 * @returns {Promise}
 */
async function deletePurchase(id) {
  return Purchase.deleteOne({ _id: id });
}

module.exports = {
  getPurchases,
  getPurchase,
  createPurchase,
  updatePurchase,
  deletePurchase,
  getTotalPurchases,
};
