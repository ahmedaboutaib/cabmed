'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bilans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      observation: {
        type: Sequelize.STRING
      },
      dateBilan: {
        type: Sequelize.DATEONLY
      },
      resultat: {
        type: Sequelize.JSON
      },
      TypeBilanId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'TypeBilans', 
          key: 'id',
        },
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
    await queryInterface.dropTable('Bilans');
  }
};