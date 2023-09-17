const db = require('../models');

const User = db.User;

const getAllLandlords = async (req, res) => {
  
    try {
        const landlords = await User.findAll({
          where: {
            role: 'landlord',
          },
          attributes: ['id', 'firstName', 'lastName', 'email', 'role'], 
        });
    
        res.status(200).json(landlords);
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

module.exports = { getAllLandlords}



