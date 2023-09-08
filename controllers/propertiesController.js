const pool = require('../config/database');

const getAllProperties = async (req, res) => {
  try {
    const query = 'SELECT * FROM properties';
    const { rows } = await pool.query(query);
    res.json(rows);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getPropertyById = async (req, res) => {
  const propertyId = req.params.id;
  try {
    const query = 'SELECT * FROM properties WHERE id = $1';
    const values = [propertyId];
    const { rows } = await pool.query(query, values);
    if (rows.length === 0) {
      res.status(404).json({ error: 'Property not found' });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createProperty = async (req, res) => {
  const { name, location, price, bedrooms, amenities, description } = req.body;
  try {
    const query = 'INSERT INTO properties (name, location, price, bedrooms, amenities, description) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
    const values = [name, location, price, bedrooms, amenities, description];
    const { rows } = await pool.query(query, values);
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateProperty = async (req, res) => {
  const propertyId = req.params.id;
  const { name, location, price, bedrooms, amenities, description } = req.body;
  try {
    const query = 'UPDATE properties SET name = $1, location = $2, price = $3, bedrooms = $4, amenities = $5, description = $6 WHERE id = $7 RETURNING *';
    const values = [name, location, price, bedrooms, amenities, description, propertyId];
    const { rows } = await pool.query(query, values);
    res.json(rows[0]);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteProperty = async (req, res) => {
  const propertyId = req.params.id;
  try {
    const query = 'DELETE FROM properties WHERE id = $1';
    const values = [propertyId];
    await pool.query(query, values);
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
