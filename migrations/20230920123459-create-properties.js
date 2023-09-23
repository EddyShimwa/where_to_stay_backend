'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Properties', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      location: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      property_type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      imageUrls: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
      },
      isAvailable: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      number_rooms: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      number_of_bathrooms: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Properties');
  }
};