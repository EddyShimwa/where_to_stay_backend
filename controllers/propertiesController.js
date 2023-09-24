const db = require('../models');
const Property = db.Property;


const createProperty = async (req, res) => {
  const {
    description,
    price,
    location,
    property_type,
    imageUrls, 
    isAvailable,
    number_rooms,
    number_of_bathrooms,
  } = req.body;

  try {
    const newProperty = await Property.create({
      description,
      price,
      location,
      property_type,
      imageUrls, 
      isAvailable,
      number_rooms,
      number_of_bathrooms,
      userId: req.user.id,
    });

    console.log('req.body:', req.body); 
    console.log('New Property Created:', newProperty);
    res.status(201).json(newProperty);

    if (!description || !price || !location || !property_type || !imageUrls || !isAvailable || !number_rooms || !number_of_bathrooms) {
      res.status(400).json({ error: 'Please provide all required fields' });
      return;
    }

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

  const getAllProperties = async (req, res) => {
    try {
      const properties = await Property.findAll({
        attributes: ['id', 'description', 'price', 'location', 'property_type', 'imageUrls', 'isAvailable', 'number_rooms', 'number_of_bathrooms', 'bookings_count'],
      });
      res.status(200).json(properties);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  const getLandlordProperties = async (req, res) => {
    try {
      const properties = await Property.findAll({
        where: {
          userId: req.user.id, 
        },
        attributes: ['id', 'description', 'price', 'location', 'property_type', 'imageUrls', 'isAvailable', 'number_rooms', 'number_of_bathrooms', 'bookings_count'],
      });

      //check if there are no properties
      if (properties.length === 0) {
        res.status(404).json({ message: 'You have not uploaded any properties'});
        return;
      }
      res.status(200).json(properties);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

  const getPropertyById = async (req, res) => {
    const propertyId = req.params.id;
    try {
      const property = await Property.findOne({
        where: {
          id: propertyId,
        },
        attributes: ['id', 'description', 'price', 'location', 'property_type', 'imageUrls', 'isAvailable', 'number_rooms', 'number_of_bathrooms', 'bookings_count' ],
      });
      if (!property) {
        res.status(404).json({ error: 'Property not found' });
      } else {
        res.status(200).json(property);
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // updade property

  const updateProperty = async (req, res) => {
    const propertyId = req.params.id;
    const { description, price, location, property_type, imageUrls, isAvailable, number_rooms, number_of_bathrooms } = req.body;
    
    try {
      const property = await Property.findOne({
        where: {
          id: propertyId,
        },
      });
  
      if (!property) {
        res.status(404).json({ error: 'Property not found' });
        return;
      }
  
      // Check if the user making the request is the owner of the property
      if (property.userId !== req.user.id) {
        res.status(403).json({ error: 'You are not authorized to update this property' });
        return;
      }
  
      await property.update({
        description,
        price,
        location,
        property_type,
        imageUrls,
        isAvailable,
        number_rooms,
        number_of_bathrooms,
      });
  
      res.status(200).json(property);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
  
  // delete property
  const deleteProperty = async (req, res) => {
    const propertyId = req.params.id;
    
    try {
      const property = await Property.findOne({
        where: {
          id: propertyId,
        },
      });
  
      if (!property) {
        res.status(404).json({ error: 'Property not found' });
        return;
      }
  
      // Check if the user making the request is the owner of the property
      if (property.userId !== req.user.id) {
        res.status(403).json({ error: 'You are not authorized to delete this property' });
        return;
      }
  
      await property.destroy();
      res.status(200).json({ message: 'Property deleted successfully' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

module.exports = {
    createProperty,
    getAllProperties,
    getPropertyById,
    getLandlordProperties,
    updateProperty,
    deleteProperty
}
