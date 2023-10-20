'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SalleDAttentes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      motif: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      heureDAR: {
        type: Sequelize.TIME
      },
      status: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.DATEONLY
      },
      situation: {
        type: Sequelize.STRING
      },
      PatientId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Patients', 
          key: 'id',
        },
      },
      CabinetId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Cabinets', 
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('SalleDAttentes');
  }
};