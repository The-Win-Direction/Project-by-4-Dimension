const jwt = require('jsonwebtoken');
const User = require('../../models/User');

const verifyToken = async (req, res) => {
  const { token } = req.body;

  if (!token) return res.status(400).json({ message: 'Token is required' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ valid: true, user });
  } catch (err) {
    res.status(401).json({ valid: false, message: 'Invalid or expired token' });
  }
};

module.exports = verifyToken;
