const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true, },
  // Other user properties
});
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};
module.exports = mongoose.model('User', userSchema);
