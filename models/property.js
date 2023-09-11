const pool = require('../config/database');

const getAllProperties = async () => {
  const query = 'SELECT * FROM properties';
  const { rows } = await pool.query(query);
  return rows;
};

const createProperty = async (propertyData) => {
  const {
    streetAddress,
    status,
    district,
    sector,
    location,
    rentalPrice,
    propertyType,
    numberOfRooms,
    bedrooms,
    rentPeriod,
    description,
    landlordId,
  } = propertyData;

  const query = `
    INSERT INTO properties (
      street_address, status, district, sector, location,
      rental_price, property_type, number_of_rooms, bedrooms,
      rent_period, description, landlord_id
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
    RETURNING *
  `;

  const values = [
    streetAddress,
    status,
    district,
    sector,
    location,
    rentalPrice,
    propertyType,
    numberOfRooms,
    bedrooms,
    rentPeriod,
    description,
    landlordId,
  ];

  const { rows } = await pool.query(query, values);
  return rows[0];
};

const getPropertyById = async (id) => {
  const query = 'SELECT * FROM properties WHERE id = $1';
  const values = [id];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

module.exports = {
  getAllProperties,
  createProperty,
  getPropertyById,
};
