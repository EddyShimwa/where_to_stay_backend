const db = require('../config/database')

const getAllProperties = async (req, res) => {
  try {
    const properties = await db.any('SELECT * FROM properties');
    res.json(properties);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getPropertyById = async (req, res) => {
  const propertyId = req.params.id;
  try {
    const property = await db.one('SELECT * FROM properties WHERE id = $1', [propertyId]);
    res.json(property);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createProperty = async (req, res) => {
  const { name, location, price, bedrooms, amenities, description } = req.body;
  try {
    const newProperty = await db.one(
      'INSERT INTO properties (name, location, price, bedrooms, amenities, description) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, location, price, bedrooms, amenities, description]
    );
    res.status(201).json(newProperty);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateProperty = async (req, res) => {
  const propertyId = req.params.id;
  const { name, location, price, bedrooms, amenities, description } = req.body;
  try {
    const updatedProperty = await db.one(
      'UPDATE properties SET name = $1, location = $2, price = $3, bedrooms = $4, amenities = $5, description = $6 WHERE id = $7 RETURNING *',
      [name, location, price, bedrooms, amenities, description, propertyId]
    );
    res.json(updatedProperty);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteProperty = async (req, res) => {
  const propertyId = req.params.id;
  try {
    await db.none('DELETE FROM properties WHERE id = $1', [propertyId]);
    res.json({ message: 'Property deleted successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
};
