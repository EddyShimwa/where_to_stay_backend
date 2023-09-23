const cloudinary = require('cloudinary').v2;

const db = require('../models');
const Property = db.Property;

// cloudinary config

cloudinary.config({ 
  cloud_name: 'dqgncfpxo', 
  api_key: '418163194637529', 
  api_secret: 'hvLLJJtfnBAIWCepTVTmnp87SYk' 
});

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
    const uploadedImages = await Promise.all(
      imageUrls.map(async (imageUrl) => {
        const result = await cloudinary.uploader.upload(imageUrl, {
          folder: 'property_images', 
        });
        return result.secure_url;
      })
    );

    const newProperty = await Property.create({
      description,
      price,
      location,
      property_type,
      imageUrls: uploadedImages, 
      isAvailable,
      number_rooms,
      number_of_bathrooms,
      userId: req.user.id,
    });

    console.log('req.body:', req.body); 
    console.log('imageUrls:', imageUrls);

    console.log('New Property Created:', newProperty);
    res.status(201).json(newProperty);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

  const getAllProperties = async (req, res) => {
    try {
      const properties = await Property.findAll({
        attributes: ['id', 'description', 'price', 'location', 'property_type', 'imageUrls', 'isAvailable', 'number_rooms'],
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
        attributes: ['id', 'description', 'price', 'location', 'property_type', 'imageUrls', 'isAvailable', 'number_rooms'],
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
    const { description, price, location, property_type, imageUrls, isAvailable, number_rooms } = req.body;
    
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
