const db = require('../models');

const User = db.User;
const Property = db.Property;

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

const getLandlordById = async (req, res) => {

    const landlordId = req.params.id;
    try {
      const landlord = await User.findOne({
        where: {
          id: landlordId,
          role: 'landlord',
        },
        attributes: ['id', 'firstName', 'lastName', 'email', 'role'], 
        // include: [{ model: Property, as: 'properties', }]
      });
  
      if (!landlord) {
        res.status(404).json({ error: 'Landlord not found' });
      } else {
        res.status(200).json(landlord);
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error detected' });
    }

}

module.exports = {
   getAllLandlords,
    getLandlordById,
  }



