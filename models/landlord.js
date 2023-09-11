const pool = require('../config/database');

const getAllLandlords = async () => {
  const query = 'SELECT * FROM landlords';
  const { rows } = await pool.query(query);
  return rows;
};

const createLandlord = async (username, propertyOwnership) => {
  const query = 'INSERT INTO landlords (username, property_ownership) VALUES ($1, $2) RETURNING *';
  const values = [username, propertyOwnership];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

const getLandlordById = async (id) => {
  const query = 'SELECT * FROM landlords WHERE id = $1';
  const values = [id];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

module.exports = {
  getAllLandlords,
  createLandlord,
  getLandlordById,
};
