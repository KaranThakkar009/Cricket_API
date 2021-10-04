const isAdmin = (req, res, next) => {
  if (!req.user.is_admin)
    return res.status(200).json({
      message: `You are not an Admin`,
    });
  next();
};

module.exports = isAdmin;
