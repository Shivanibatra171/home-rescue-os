const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Worker = require('../models/Worker');
const Admin = require('../models/Admin');

const modelMap = { user: User, worker: Worker, admin: Admin };

const protect = async (req, res, next) => {
  try {
    let token;
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer')) {
      token = authHeader.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ success: false, message: 'Not authorized, no token' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const Model = modelMap[decoded.role];

    if (!Model) {
      return res.status(401).json({ success: false, message: 'Invalid token role' });
    }

    const account = await Model.findById(decoded.id);
    if (!account) {
      return res.status(401).json({ success: false, message: 'Account not found' });
    }

    req.user = account;
    req.role = decoded.role;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Not authorized, token failed' });
  }
};

module.exports = { protect };