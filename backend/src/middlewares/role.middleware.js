const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.role || !allowedRoles.includes(req.role)) {
      return res.status(403).json({ success: false, message: 'Access denied for this role' });
    }
    next();
  };
};

module.exports = { authorizeRoles };