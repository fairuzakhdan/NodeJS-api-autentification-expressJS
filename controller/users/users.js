const { User } = require('../../models');

const createUsers = async (req, res) => {
  const { name, email } = req.body;
  const user = await User.create({
    name,
    email,
  });
  console.log(user);
  res.status(201).json({
    status: 'success',
    message: 'ok',
  });
  return res;
};

const getAllUsers = async (req, res) => {
  const users = await User.findAll();
  res.status(200).json(users);
};

const getUsersById = async (req, res) => {
  const { id } = req.params;
  const users = await User.findByPk(id);
  if (!users) {
    res.status(404).json({
      status: 'fail',
      message: 'User Not Found',
    });
    return res;
  }
  res.status(200).json(users);
  return res;
};
module.exports = { createUsers, getAllUsers, getUsersById };
