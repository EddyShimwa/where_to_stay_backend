const db = require('../models');

const Booking = db.Booking;
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

const getStudentsForProperty = async (req, res) => {
  const propertyId = req.params.propertyId;

  try {
    // Find all bookings for the given property
    const bookings = await Booking.findAll({
      where: {
        property_id: propertyId,
      },
      include: [
        {
          model: User,
          as: 'student',
          attributes: ['id', 'firstName', 'lastName', 'email'],
        },
      ],
    });



    if (bookings.length === 0) {
      res.status(404).json({ message: 'No students have booked this property' });
      return;
    }



    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};






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
    getStudentsForProperty,
    getLandlordById,
  }



