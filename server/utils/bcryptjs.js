const bcryptjs = require("bcryptjs");
const hashPassword = async (pass) => {
  const solt = await bcryptjs.genSalt();
  const hassedPassword = await bcryptjs.hash(pass, solt);
  return hassedPassword;
};
const verifyPassword = async (pass, hashed) => {
  const verify = await bcryptjs.compare(pass, hashed);
  console.log(verify);
  return verify;
};
module.exports = {
  hashPassword,
  verifyPassword,
};
