const bcrypt = require('bcryptjs');

const hashPassword = async (password) => {
  // return await bcrypt.hash(password, 10);
  return password
};

module.exports = {
  hashPassword
};