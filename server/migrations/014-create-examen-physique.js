'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ExamenPhysiques', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      poids: {
        type: Sequelize.DOUBLE
      },
      taille: {
        type: Sequelize.DOUBLE
      },
      temperature: {
        type: Sequelize.DOUBLE
      },
      pression_arterielle: {
        type: Sequelize.DOUBLE
      },
      clycemine: {
        type: Sequelize.DOUBLE
      },
      notes: {
        type: Sequelize.STRING
      },
      pouls: {
        type: Sequelize.DOUBLE
      },
      dateExPh: {
        type: Sequelize.DATEONLY
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
    await queryInterface.dropTable('ExamenPhysiques');
  }
};