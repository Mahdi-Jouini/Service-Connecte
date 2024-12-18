const db = require('../models');
const bcrypt = require('bcrypt');
const { User } = require('../models');// Adjust the path according to your project structure

const getUserById = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await db.User.findOne({
      where: { id: userId },
      attributes: ['id', 'name', 'surname', 'email', 'phone', 'location', 'photo', 'role'], // Return selected fields (adjust as necessary)
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
};




const createUser = async (req, res) => {
  try {
    const { name, surname, email, phone, password, location, photo, role } = req.body;

    // Validate input
    if (!name || !surname || !email || !password) {
      return res.status(400).json({ error: 'Name, surname, email, and password are required.' });
    }

    // Check if the email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already registered.' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate email verification code
    const emailVerificationCode = 'aasba';

    // Create the new user
    const newUser = await User.create({
      name,
      surname,
      email,
      phone,
      password: hashedPassword,
      location,
      photo,
      role: role || 'user', // Default to 'user' if no role is provided
      email_verification_code: emailVerificationCode,
    });

    return res.status(201).json({
      message: 'User created successfully!',
      user: {
        id: newUser.id,
        name: newUser.name,
        surname: newUser.surname,
        email: newUser.email,
        phone: newUser.phone,
        location: newUser.location,
        photo: newUser.photo,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
};

module.exports = { getUserById };
