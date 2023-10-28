const jwt = require('jsonwebtoken');
const { User } = require('../models');

const verifyToken = async (req, res, next) => {
  // Get Auth Token
  const token = req.headers.authorization;
  if (!token) {
    res.status(403).json({
      status: 'fail',
      message: 'Incorrcet Credential',
    });
    return res;
  }
  //   hapus bareer
  const JWTToken = token.split(' ').pop();

  //   Verify Token
  try {
    const data = jwt.verify(JWTToken, 'shhh');
    const user = await User.findByPk(data.data.id);
    if (!user) {
      res.status(404).json({
        status: 'fail',
        message: 'User Not Found',
      });
    }
    // cek user login
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 'fail',
      message: 'Incorrect Credential',
      serverMessage: err,
    });
    return res;
  }
};
module.exports = { verifyToken };
