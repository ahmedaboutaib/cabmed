"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("RendezVous", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      motif: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.STRING,
      },
      heureRDV: {
        type: Sequelize.TIME,
      },
      status: {
        type: Sequelize.ENUM("encour", "confirmer", "annuler"),
        allowNull: true,
      },
      dateRDV: {
        type: Sequelize.DATEONLY,
      },
      details: {
        type: Sequelize.STRING,
      },
      CabinetId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Cabinets",
          key: "id",
        },
      },
      PatientId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Patients",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("RendezVous");
  },
};
