const db = require('../models');
const Landlord = db.landlords;

// Create and Save a new Landlord
const createLandlord = async (req, res) => {
  try {
    const landlord = await Landlord.create(req.body);
    res.status(201).json(landlord);
  } catch (error) {
    console.error("Database error:", error);
    return res.status(500).json("Internal server error");
  }
};

// Retrieve all Landlords from the database.
const getAllLandlords = async (req, res) => {
  try {
    const landlords = await Landlord.findAll();
    res.json(landlords);
  } catch (error) {
    console.error("Database error:", error);
    return res.status(500).json("Internal server error");
  }
}

// Find a single Landlord with an id
const getLandlordById = async (req, res) => {
  const id = req.params.id;
  try {
    const landlord = await Landlord.findByPk(id);
    if (landlord === null) {
      return res.status(404).json("Landlord not found");
    }
    res.json(landlord);
  } catch (error) {
    console.error("Database error:", error);
    return res.status(500).json("Internal server error");
  }
}

module.exports = {
  createLandlord,
  getAllLandlords,
  getLandlordById
};