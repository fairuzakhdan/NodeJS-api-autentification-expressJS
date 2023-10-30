// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken');
// eslint-disable-next-line import/no-extraneous-dependencies
const { compareSync } = require('bcrypt');
const { User } = require('../models');

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({
      status: 'fail',
      message: 'Mohon isi Email Dan Password',
    });
    return res;
  }
  const user = await User.findOne({
    where: { email },
  });
  if (!user) {
    res.status(404).json({
      status: 'fail',
      message: 'Email Not Found',
    });
    return res;
  }
  const isPasswordCorrect = compareSync(password, user.password);
  if (!isPasswordCorrect) {
    res.status(400).json({
      status: 'fail',
      message: 'password tidak sesuai',
    });
    return res;
  }

  const data = {
    id: user.id,
    name: user.name,
    email: user.email,
  };

  const token = jwt.sign({ data }, 'shhh', {
    // expiresIn => memberikan expire token dengan waktu 10 detik
    expiresIn: '1d',
  });
  res.status(200).json({
    status: 'success',
    message: 'login berhasil',
    token,
  });
  return res;
};

module.exports = { login };
