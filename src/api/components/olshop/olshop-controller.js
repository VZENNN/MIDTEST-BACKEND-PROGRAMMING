const olshopService = require('./olshop-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

/**
 * Handle get list of products request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function getBarangs(request, response, next) {
  try {
    const page_number = parseInt(request.query.page_number) || 1;
    const page_size = parseInt(request.query.page_size) || 10;
    const search = request.query.search;
    const sort = request.query.sort || 'name:asc';

    const products = await olshopService.getBarangs(
      page_number,
      page_size,
      search,
      sort
    );

    const totalBarangs = await olshopService.getTotalBarangs(search);
    const totalPages = Math.ceil(totalBarangs / page_size);

    const pagination = {
      page_number: page_number,
      page_size: page_size,
      count: totalBarangs,
      total_pages: totalPages,
      has_previous_page: page_number > 1,
      has_next_page: page_number < totalPages,
    };

    return response.status(200).json({ ...pagination, data: products });
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle get product detail request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function getBarang(request, response, next) {
  try {
    const product = await olshopService.getBarang(request.params.id);

    if (!product) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Unknown product');
    }

    return response.status(200).json(product);
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle create product request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function createBarang(request, response, next) {
  try {
    const name = request.body.name;
    const price = request.body.price;
    const description = request.body.description;

    const success = await olshopService.createBarang(name, price, description);
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to create product'
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
async function updateBarang(request, response, next) {
  try {
    const id = request.params.id;
    const name = request.body.name;
    const price = request.body.price;
    const description = request.body.description;

    const success = await olshopService.updateBarang(
      id,
      name,
      price,
      description
    );
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to update product'
      );
    }

    return response.status(200).json({ id });
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle delete product request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function deleteBarang(request, response, next) {
  try {
    const id = request.params.id;

    const success = await olshopService.deleteBarang(id);
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to delete product'
      );
    }

    return response.status(200).json({ id });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getBarangs,
  getBarang,
  createBarang,
  updateBarang,
  deleteBarang,
};
