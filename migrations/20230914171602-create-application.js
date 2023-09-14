'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Applications', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      student_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      property_id: {
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

    await queryInterface.addConstraint('Applications', {
      type: 'foreign key',
      name: 'FK_Application_Student',
      fields: ['student_id'], 
      references: {
        table: 'users',
        field: 'id', 
      },
      onDelete: 'CASCADE',
    });

    await queryInterface.addConstraint('Applications', {
      type: 'foreign key',
      name: 'FK_Application_Property',
      fields: ['property_id'],
      references: {
        table: 'Properties',
        field: 'id',
      },
      onDelete: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Applications');
  }
};
