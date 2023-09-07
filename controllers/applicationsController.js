const db = require('../config/database')

const getAllApplications = async (req, res) => {
  try {
    const Applications = await db.any('SELECT * FROM Applications');
    res.json(Applications);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createApplication = async (req, res) => {
  const { username, email } = req.body;
  try {
    const newApplication = await db.one(
      'INSERT INTO Applications (username, email) VALUES ($1, $2) RETURNING *',
      [username, email]
    );
    res.status(201).json(newApplication);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getApplicationById = async (req, res) => {
    const ApplicationId = req.params.id;
    try {
        const Application = await db.one('SELECT * FROM Applications WHERE id = $1', [ApplicationId]);
        res.json(Application);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
  getAllApplications,
  createApplication,
  getApplicationById
};

