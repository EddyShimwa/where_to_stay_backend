const db = require('../models');
const Booking = db.Booking;
const Property = db.Property;
const User = db.User;

const createBooking = async (req, res ) => {
  const { property_id } = req.body;

  try {
    // Check if the user making the booking is a student
    const user = await User.findByPk(req.user.id);
    if (!user || user.role !== 'student') {
      res.status(403).json({ error: 'Only students can book properties' });
      return;
    }

    // Check if the property with the provided ID exists
    const property = await Property.findByPk(property_id);
    if (!property) {
      res.status(404).json({ error: 'Property not found' });
      return;
    }

    // Check if the student has already booked this property
    const existingBooking = await Booking.findOne({
      where: {
        student_id: req.user.id,
        property_id,
      },
    });

    if (existingBooking) {
      res.status(400).json({ error: 'You have already booked this property' });
      return;
    }

    // Create the booking
    const newBooking = await Booking.create({
      student_id: req.user.id,
      property_id: property.id, // Use the ID of the existing property
    });
     await property.increment('bookings_count');

    //  const landlordSocket = io.to(`landlord-${property.landlord_id}`);
    //  landlordSocket.emit('newBooking', { booking: newBooking });

    res.status(201).json(newBooking);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
//cancel booking 

const cancelBooking = async (req, res) => {
  const bookingId = req.params.id;
  try {
    const booking = await Booking.findOne({
      where: {
        id: bookingId,
      },
    });
    
    if (!booking) {
      res.status(404).json({ error: 'Booking not found' });
      return;
    }
    const property = await Property.findOne({
      where: {
        id: booking.property_id,
      },
    });
    
    if (!property) {
      res.status(404).json({ error: 'Property not found' });
      return;
    }
    
    
    if (booking.student_id !== req.user.id) {
      res.status(403).json({ error: 'You are not authorized to cancel this booking' });
      return;
    }
    
    await property.decrement('bookings_count');
    
    await booking.destroy();
    
    res.status(200).json({ message: 'You have successfully cancelled this booking' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//get student's bookings 

const getBookedPropertiesByStudent = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      where: {
        student_id: req.user.id,
      },
    });

    if (bookings.length === 0) {
      res.status(404).json({ message: 'You have not booked any properties' });
      return;
    }

    const propertyIds = bookings.map((booking) => booking.property_id);

    // Retrieve property details for the booked properties and include the associated landlord (User)
    const properties = await Property.findAll({
      where: {
        id: propertyIds,
      },
      include: [
        {
          model: User, 
          as: 'User', 
          attributes: ['firstName', 'lastName', 'email', 'phoneNumber'], 
        },
      ],
    });

    res.status(200).json(properties);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createBooking,
  getBookedPropertiesByStudent,
  cancelBooking
};
