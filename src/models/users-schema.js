const usersSchema = {
  name: String,
  email: String,
  password: String,
  loginAttempt: { type: Number, default: 0 },
  LoginAttemptmax: { type: Number, default: 5 },
  lastLoginFailed: { type: Date, default: null },
};

module.exports = usersSchema;
