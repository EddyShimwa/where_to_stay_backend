const pool = require('../config/database');

const getAllApplications = async () => {
  const query = 'SELECT * FROM applications';
  const { rows } = await pool.query(query);
  return rows;
};

const createApplication = async (propertyId, studentId, applicationDate, status) => {
  const query = `
    INSERT INTO applications (property_id, student_id, application_date, status)
    VALUES ($1, $2, $3, $4) RETURNING *
  `;

  const values = [propertyId, studentId, applicationDate, status];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

const getApplicationById = async (id) => {
  const query = 'SELECT * FROM applications WHERE id = $1';
  const values = [id];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

module.exports = {
  getAllApplications,
  createApplication,
  getApplicationById,
};
