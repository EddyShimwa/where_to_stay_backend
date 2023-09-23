const db = require('../models');
const Booking = db.Booking;
const Property = db.Property;
const User = db.User;

const createBooking = async (req, res) => {
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

    // Send a notification to the landlord (replace with your notification logic)
    const landlordUserId = property.userId;
    const notificationContent = `New booking for your property: ${property.description}. Contact student at ${user.email}.`;

   io.to(landlordUserId).emit('newBooking', notificationContent);

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
    } else {
      await booking.destroy();
      res.status(200).json({ message: 'You have successfully cancelled this booking' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = {
  createBooking,
  cancelBooking
};
