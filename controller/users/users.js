const { User } = require('../../models');

const createUsers = async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    res.status(400).json({
      status: 'fail',
      message: 'Name dan Email Belum terisi',
    });
    return res;
  }
  const user = await User.create({
    name,
    email,
  });
  res.status(201).json({
    status: 'success',
    user,
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

const updateUsersById = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  if (!name || !email) {
    res.status(400).json({
      status: 'fail',
      message: 'Name dan Email Belum terisi',
    });
    return res;
  }
  const user = await User.findByPk(id);
  if (!user) {
    res.status(404).json({
      status: 'fail',
      message: 'User Not Found',
    });
    return res;
  }
  await user.update({
    name,
    email,
  });
  res.status(201).json({
    status: 'success',
    message: 'Data Berhasil diUpdate',
    user,
  });
  return res;
};

const deleteUsersById = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
  if (!user) {
    res.status(404).json({
      status: 'fail',
      message: 'User Not Found',
    });
    return res;
  }
  await user.destroy(id);
  res.status(200).json({
    status: 'success',
    message: 'User Berhasil dihapus',
  });
  return res;
};
module.exports = {
  createUsers,
  getAllUsers,
  getUsersById,
  updateUsersById,
  deleteUsersById,
};
