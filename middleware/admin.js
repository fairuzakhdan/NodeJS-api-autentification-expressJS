const roleAdmin = async (req, res, next) => {
  const { user } = req;
  if (user.role !== 'admin') {
    res.status(403).json({
      status: 'fail',
      message: 'Unauthorized',
    });
    return res;
  }
  next();
};
module.exports = { roleAdmin };
