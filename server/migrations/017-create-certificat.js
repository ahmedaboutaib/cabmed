'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Certificats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING
      },
      dateDub: {
        type: Sequelize.DATEONLY
      },
      nombre: {
        type: Sequelize.INTEGER
      },
      typeTemps: {
        type: Sequelize.STRING
      },
      PatientId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Patients', 
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
    await queryInterface.dropTable('Certificats');
  }
};