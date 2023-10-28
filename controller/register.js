// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require('bcrypt');
const { User } = require('../models');

const register = async (req, res) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password) {
    res.status(400).json({
      status: 'fail',
      message: 'Mohon Email,Name Password dilengkapi',
    });
    return res;
  }

  const isEmailUsed = await User.findOne({
    where: { email },
  });
  if (isEmailUsed) {
    res.status(400).json({
      status: 'fail',
      message: 'Email sudah digunakan',
    });
    return res;
  }

  const passwordHash = bcrypt.hashSync(password, 10);
  const user = await User.create({
    email,
    name,
    password: passwordHash,
  });
  res.status(201).json({
    status: 'success',
    message: 'Register berhasil',
    user,
  });
  return res;
};
module.exports = { register };
