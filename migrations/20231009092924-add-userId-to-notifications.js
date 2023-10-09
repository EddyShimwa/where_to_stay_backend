'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('notifications', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: true, 
      references: {
        model: 'users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('notifications', 'userId');
  },
};
