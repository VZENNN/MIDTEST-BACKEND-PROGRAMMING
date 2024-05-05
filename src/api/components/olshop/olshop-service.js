const olshopRepository = require('./olshop-repository');

/**
 * Get list of products
 * @returns {Array}
 */
async function getBarangs(pageNumber, pageSize, search, sort) {
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

  const products = await olshopRepository.getBarangs(
    pageNumber,
    pageSize,
    filter,
    sortedData
  );

  return products;
}

async function getTotalBarangs() {
  const totalProducts = await olshopRepository.getTotalBarangs();
  return totalProducts;
}

/**
 * Get product detail
 * @param {string} id - Product ID
 * @returns {Object}
 */
async function getBarang(id) {
  const product = await olshopRepository.getProduct(id);

  if (!product) {
    return null;
  }

  return {
    id: product.id,
    name: product.name,
    price: product.price,
    description: product.description,
  };
}

/**
 * Create new product
 * @param {string} name - Name
 * @param {string} price - Price
 * @param {string} description - Description
 * @returns {boolean}
 */
async function createBarang(name, price, description) {
  try {
    await olshopRepository.createBarang(name, price, description);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Update existing product
 * @param {string} id - Product ID
 * @param {string} name - Name
 * @param {string} price - Price
 * @param {string} description - Description
 * @returns {boolean}
 */
async function updateBarang(id, name, price, description) {
  const data = await olshopRepository.getProduct(id);

  // Product not found
  if (!data) {
    return null;
  }

  try {
    await olshopRepository.updateBarang(id, name, price, description);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Delete product
 * @param {string} id - Product ID
 * @returns {boolean}
 */
async function deleteBarang(id) {
  const data = await olshopRepository.getBarang(id);

  // Product not found
  if (!data) {
    return null;
  }

  try {
    await olshopRepository.deleteBarang(id);
  } catch (err) {
    return null;
  }

  return true;
}

module.exports = {
  getBarangs,
  getBarang,
  createBarang,
  updateBarang,
  deleteBarang,
  getTotalBarangs,
};
