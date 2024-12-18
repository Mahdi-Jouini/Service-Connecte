const db = require('../models');
const { User } = require('../models'); // Adjust the path according to your project structure

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

module.exports = { getUserById };
