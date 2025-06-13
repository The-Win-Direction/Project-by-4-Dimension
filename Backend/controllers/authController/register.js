const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const sendEmail = require('../../utils/sendEmail');

const register = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);

  try {
    let user = await User.findOne({ email });

    if (user) {
      if (user.isVerified) {
        return res.status(400).json({ message: 'User already exists and is verified' });
      } else {
        await User.deleteOne({ email });
      }
    }

    // Create new user
    user = new User({ name, email, password });
    await user.save();

    // Generate email verification token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '2m' });

    // Send verification email
    const verificationLink = `${process.env.BACKEND_URL}/api/auth/verify-email?token=${token}`;
    await sendEmail(email, 'Verify your email', `Click to verify: ${verificationLink}`);

    res.status(201).json({ message: 'Registered successfully. Please verify your email.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = register;
