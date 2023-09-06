const db = require('../config/database')

const getAllLandlords = async (req, res) => {
  try {
    const Landlords = await db.any('SELECT * FROM Landlords');
    res.json(Landlords);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createLandlord = async (req, res) => {
  const { username, email } = req.body;
  try {
    const newLandlord = await db.one(
      'INSERT INTO Landlords (username, email) VALUES ($1, $2) RETURNING *',
      [username, email]
    );
    res.status(201).json(newLandlord);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getLandlordById = async (req, res) => {
    const landlordId = req.params.id;
    try {
        const landlord = await db.one('SELECT * FROM Landlords WHERE id = $1', [landlordId]);
        res.json(landlord);
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

