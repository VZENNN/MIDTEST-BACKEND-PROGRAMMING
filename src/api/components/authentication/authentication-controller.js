const { errorResponder, errorTypes } = require('../../../core/errors');
const authenticationServices = require('./authentication-service');

/**
 * Handle login request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function login(request, response, next) {
  const { email, password } = request.body;

  try {
    const user = await authenticationServices.getUserByEmail(email);

    const { LoginAttemptmax, loginAttempt, lastLoginFailed } = user;

    // Check login credentials
    const loginSuccess = await authenticationServices.checkLoginCredentials(
      email,
      password
    );

    if (loginAttempt >= LoginAttemptmax && limitLoginTime(lastLoginFailed)) {
      // Jika dalam 30 menit login attempt dan lebih dari 5 kali maka login akan gagal
      throw errorResponder(
        errorTypes.FORBIDDEN,
        'Too many failed login attempts. Please try again later.'
      );
    }

    if (!loginSuccess) {
      await authenticationServices.updateLoginAttempt(email);
      throw errorResponder(
        errorTypes.INVALID_CREDENTIALS,
        'Wrong email or password'
      );
    }

    return response.status(200).json(loginSuccess);
  } catch (error) {
    return next(error);
  }
}

//Fungsi untuk membuat login limit sesuai dengan waktu yang diinginkan
function limitLoginTime(timestamp) {
  const Thirty_Minute = 1000 * 60 * 30; // 30 menit dalam milidetik
  const lastLoginFailed = new Date(timestamp);
  return Date.now() - lastLoginFailed <= Thirty_Minute;
}

module.exports = {
  login,
};
