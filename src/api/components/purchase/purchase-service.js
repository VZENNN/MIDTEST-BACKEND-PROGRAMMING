const purchaseRepository = require('./purchase-repository');

/**
 * Get list of purchases
 * @returns {Array}
 */
async function getPurchases(pageNumber, pageSize, search, sort) {
  let filter = {};
  let sortedData = {};

  if (search) {
    const [fieldName, searchKey] = search.split(':');
    if (['price'].includes(fieldName)) {
      filter[fieldName] = parseFloat(searchKey); // Parse as number for numeric fields
    } else {
      const escapedSearchKey = searchKey.replace(
        /[-\/\\^$*+?.()|[\]{}]/g,
        '\\$&'
      );
      filter[fieldName] = new RegExp(escapedSearchKey, 'i');
    }
  }

  if (sort) {
    const [fieldName, sortOrder] = sort.split(':');
    sortedData[fieldName] = sortOrder === 'desc' ? -1 : 1;
  }

  const purchases = await purchaseRepository.getPurchases(
    pageNumber,
    pageSize,
    filter,
    sortedData
  );

  return purchases;
}

async function getTotalPurchases() {
  const totalPurchases = await purchaseRepository.getTotalPurchases();
  return totalPurchases;
}

/**
 * Get purchase detail
 * @param {string} id - Purchase ID
 * @returns {Object}
 */
async function getPurchase(id) {
  const purchase = await purchaseRepository.getPurchase(id);

  if (!purchase) {
    return null;
  }

  return {
    id: purchase.id,
    name: purchase.name,
    price: purchase.price,
    description: purchase.description,
  };
}

/**
 * Create new purchase
 * @param {string} name - Name
 * @param {string} price - Price
 * @param {string} description - Description
 * @returns {boolean}
 */
async function createPurchase(name, price, description) {
  try {
    await purchaseRepository.createPurchase(name, price, description);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Update existing purchase
 * @param {string} id - Purchase ID
 * @param {string} name - Name
 * @param {string} price - Price
 * @param {string} description - Description
 * @returns {boolean}
 */
async function updatePurchase(id, name, price, description) {
  const data = await purchaseRepository.getPurchase(id);

  // Purchase not found
  if (!data) {
    return null;
  }

  try {
    await purchaseRepository.updatePurchase(id, name, price, description);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Delete purchase
 * @param {string} id - Purchase ID
 * @returns {boolean}
 */
async function deletePurchase(id) {
  const data = await purchaseRepository.getPurchase(id);

  // Purchase not found
  if (!data) {
    return null;
  }

  try {
    await purchaseRepository.deletePurchase(id);
  } catch (err) {
    return null;
  }

  return true;
}

module.exports = {
  getPurchases,
  getPurchase,
  createPurchase,
  updatePurchase,
  deletePurchase,
  getTotalPurchases,
};
