const purchaseService = require('./purchase-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

/**
 * Handle get list of purchase request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function getPurchases(request, response, next) {
  try {
    const page_number = parseInt(request.query.page_number) || 1;
    const page_size = parseInt(request.query.page_size) || 10;
    const search = request.query.search;
    const sort = request.query.sort || 'name:asc';

    const purchases = await purchaseService.getPurchases(
      page_number,
      page_size,
      search,
      sort
    );

    const totalPurchases = await purchaseService.getTotalPurchases(search);
    const totalPages = Math.ceil(totalPurchases / page_size);

    const pagination = {
      page_number: page_number,
      page_size: page_size,
      count: totalPurchases,
      total_pages: totalPages,
      has_previous_page: page_number > 1,
      has_next_page: page_number < totalPages,
    };

    return response.status(200).json({ ...pagination, data: purchases });
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle get purchase detail request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function getPurchase(request, response, next) {
  try {
    const purchase = await purchaseService.getPurchase(request.params.id);

    if (!product) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Unknown purchase');
    }

    return response.status(200).json(purchase);
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle create purchase request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function createPurchase(request, response, next) {
  try {
    const name = request.body.name;
    const price = request.body.price;
    const description = request.body.description;

    const success = await purchaseService.createPurchase(
      name,
      price,
      description
    );
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to create purchase'
      );
    }

    return response.status(200).json({ name, price, description });
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle update product request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function updatePurchase(request, response, next) {
  try {
    const id = request.params.id;
    const name = request.body.name;
    const price = request.body.price;
    const description = request.body.description;

    const success = await purchaseService.updatePurchase(
      id,
      name,
      price,
      description
    );
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to update purchase'
      );
    }

    return response.status(200).json({ id });
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle delete purchase request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function deletePurchase(request, response, next) {
  try {
    const id = request.params.id;

    const success = await purchaseService.deletePurchase(id);
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to delete purchase'
      );
    }

    return response.status(200).json({ id });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getPurchases,
  getPurchase,
  createPurchase,
  updatePurchase,
  deletePurchase,
};
