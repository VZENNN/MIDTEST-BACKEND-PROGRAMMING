const { User } = require('../../../models');

/**
 * Get user by email for login information
 * @param {string} email - Email
 * @returns {Promise}
 */
async function updateLoginAttempt(email) {
  await User.updateOne(
    { email },
    { $inc: { loginAttempt: 1 }, $set: { lastLoginFailed: new Date() } }
  );
}

async function getUserByEmail(email) {
  return User.findOne({ email });
}

async function resetLoginAttempt(email) {
  await User.updateOne({ email }, { loginAttempt: 0 });
}

module.exports = {
  getUserByEmail,
  updateLoginAttempt,
  resetLoginAttempt,
};
