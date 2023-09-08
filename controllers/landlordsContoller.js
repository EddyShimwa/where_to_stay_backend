const pool = require('../config/database');

const getAllLandlords = async (req, res) => {
  try {
    const query = 'SELECT * FROM landlords';
    const { rows } = await pool.query(query);
    res.json(rows);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createLandlord = async (req, res) => {
  const { username, property_ownership } = req.body;
  try {
    const query = 'INSERT INTO landlords (username, property_ownership) VALUES ($1, $2) RETURNING *';
    const values = [username, property_ownership];
    const { rows } = await pool.query(query, values);
    // Use rows[0] to get the newly inserted landlord
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const getLandlordById = async (req, res) => {
  const landlordId = req.params.id;
  try {
    const query = 'SELECT * FROM landlords WHERE id = $1';
    const values = [landlordId];
    const { rows } = await pool.query(query, values);
    if (rows.length === 0) {
      res.status(404).json({ error: 'Landlord not found' });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllLandlords,
  createLandlord,
  getLandlordById
};
