const { id } = require('@hapi/joi/lib/base');
const db = require('../models');
const property = require('../models/property');

const Booking = db.Booking;
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

const getStudentsBooked = async (req, res) => {
   const propertyId = req.params.id;
  try {
    const property = await Property.findOne({
      where: {
        id: propertyId,
        userId: req.user.id,
      },
    });

    if (!property) {
      return res.status(404).json({ error: 'Property not found or does not belong to the specified landlord' });
    }

    // Retrieve the list of students who have booked this property
    const students = await Booking.findAll({
      where: {
        property_id: propertyId,
      },
      attributes: ['student_id'], // You can retrieve other student information as needed
      include: [
        {
          model: User,
          as: 'student',
          attributes: ['id', 'firstName', 'lastName', 'email'],
        },
      ],
    });

    res.status(200).json(students);
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
    getLandlordById,
    getStudentsBooked
  }



