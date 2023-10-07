const db = require('../models');
const Booking = db.Booking;
const Property = db.Property;
const User = db.User;

const createBooking = async (req, res ) => {
  const { property_id } = req.body;

  try {
    const user = await User.findByPk(req.user.id);
    if (!user || user.role !== 'student') {
      res.status(403).json({ error: 'Only students can book properties' });
      return;
    }

    const property = await Property.findByPk(property_id);
    if (!property) {
      res.status(404).json({ error: 'Property not found' });
      return;
    }
    
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
          {
            model: Booking,
            as: 'bookings',
            attributes: ['id', 'student_id', 'property_id', 'status'],
          },
        ],
    });

    res.status(200).json(properties);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



const approveBooking = async (req, res) => {
  const bookingId = req.params.id;
  try {
    const booking = await Booking.findOne({
      where: {
        id: bookingId,
        status: 'Request Sent',
      },
      include: [{ model: Property, as: 'property' }], 
    });

    if (!booking) {
      res.status(404).json({ error: 'Booking not found or already approved/rejected' });
      return;
    }

    //check if the owner of the property is the one approving the booking
    if (booking.property.userId !== req.user.id) {
      res.status(403).json({ error: 'You are not authorized to approve this booking' });
      return;
    }
   

    await booking.update({
      status: 'Approved',
    });

    // const studentSocket = io.to(`student-${booking.student_id}`);
    // studentSocket.emit('bookingApproved', { booking: booking });

    res.status(200).json({ message: 'You have successfully approved this booking' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const rejectBooking = async (req, res) => {
  const bookingId = req.params.id;
  try {
    const booking = await Booking.findOne({
      where: {
        id: bookingId,
        status: 'Request Sent', 
      },
      include: [{ model: Property, as: 'property' }],
    });

    if (!booking) {
      res.status(404).json({ error: 'Booking not found or already approved/rejected' });
      return;
    }

    if (booking.property.userId !== req.user.id) {
      res.status(403).json({ error: 'You are not authorized to reject this booking' });
      return;
    }

    await booking.update({
      status: 'Rejected', 
    });

    // const studentSocket = io.to(`student-${booking.student_id}`);
    // studentSocket.emit('bookingRejected', { booking: booking });

    res.status(200).json({ message: 'You have successfully rejected this booking' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = {
  approveBooking,
  rejectBooking,
  createBooking,
  getBookedPropertiesByStudent,
  cancelBooking
};
