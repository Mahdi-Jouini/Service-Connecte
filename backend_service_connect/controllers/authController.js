const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const transporter = require('../config/nodemailerConfig');
const { User, Provider } = require('../models'); // Adjusted to import both models
const dotenv = require('dotenv');
const crypto = require('crypto');
const db = require('../models');
dotenv.config();

let verificationCodes = {}; // Moved outside to persist in memory (temporary)

const verifyEmail = async (req, res) => {
  try {
    const { name, surname, email, phone, password, location, role, photo, profession, experience, specific_skills, description, qualities, certification, service } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const verificationCode = crypto.randomBytes(3).toString('hex');
    verificationCodes[email] = { code: verificationCode, timestamp: Date.now() };

    const hashedPassword = await bcrypt.hash(password, 10);
    const token = jwt.sign(
      {
        name, surname, email, phone, hashedPassword, location, role, photo, profession, experience, specific_skills, description, qualities, certification, service,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    const emailTemplate = `
      <p>Hi ${name},</p>
      <p>Your verification code is: <strong>${verificationCode}</strong></p>
    `;

    await transporter.sendMail({
      to: email,
      subject: 'Verify your email',
      html: emailTemplate,
    });
    res.status(200).json({ token, message: 'Verification email sent. Please verify your email to complete registration.' });
  } catch (error) {
    console.error('Error during email verification:', error);
    res.status(500).json({ message: 'An error occurred during email verification.' });
  }
};

const signup = async (req, res) => {
    const { token, verificationCode } = req.body;
    console.log(token, verificationCode)

    if (!token || !verificationCode) {
      return res.status(400).json({ message: 'Token and verification code are required.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const storedCode = verificationCodes[decoded.email];
    console.log(storedCode)

    if (!storedCode || storedCode.code !== verificationCode || Date.now() - storedCode.timestamp > 300000) {
      return res.status(400).json({ message: 'Invalid or expired verification code.' });
    }

    const user = await db.User.create({
      name: decoded.name,
      surname: decoded.surname,
      email: decoded.email,
      phone: decoded.phone,
      password: decoded.hashedPassword,
      location: decoded.location,
      photo: decoded.photo,
      role: decoded.role,
    });

    if (decoded.role === 'provider') {
      await db.Provider.create({
        user_id: user.id,
        profession: decoded.profession,
        experience: decoded.experience,
        specific_skills: decoded.specific_skills,
        description: decoded.description,
        qualities: decoded.qualities,
        certification: decoded.certification,
        service: decoded.service,
      });
    }

    delete verificationCodes[decoded.email];
    res.status(201).json({ token: token, message: 'Email verified successfully. User created.' });

};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const user = await db.User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({token: token, message: 'Login successful.', token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'An error occurred during login.' });
  }
};

module.exports = { verifyEmail, signup, login };
