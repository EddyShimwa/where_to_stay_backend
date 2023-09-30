const db = require('../models');

const User = db.User;

const getUserProfile = async (req, res) => {
  const userId = req.user.id; 

  try {
    const user = await User.findOne({
      where: { id: userId },
      attributes: ['id', 'firstName', 'lastName', 'username'],
    });

    if (!user) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getUserProfile,
};
