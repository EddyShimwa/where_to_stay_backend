const db = require('../models');
const Property = db.Property;

const createProperty = async (req, res) => {
    const { description, price, location, property_type, image, isAvailable, number_rooms } = req.body;
    try {
      const newProperty = await Property.create({
        description,
        price,
        location,
        property_type,
        image,
        isAvailable,
        number_rooms,
        userId: req.user.id,
      });
      console.log('New Property Created:', newProperty);
      res.status(201).json(newProperty);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  const getAllProperties = async (req, res) => {
    try {
      const properties = await Property.findAll({
        attributes: ['id', 'description', 'price', 'location', 'property_type', 'image', 'isAvailable', 'number_rooms'],
      });
      res.status(200).json(properties);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  const getPropertyById = async (req, res) => {
    const propertyId = req.params.id;
    try {
      const property = await Property.findOne({
        where: {
          id: propertyId,
        },
        attributes: ['id', 'description', 'price', 'location', 'property_type', 'image', 'isAvailable', 'number_rooms'],
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
    const { description, price, location, property_type, image, isAvailable, number_rooms } = req.body;
    
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
        image,
        isAvailable,
        number_rooms,
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
      res.status(204).json({ message: 'Property deleted successfully' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

module.exports = {
    createProperty,
    getAllProperties,
    getPropertyById,
    updateProperty,
    deleteProperty
}
