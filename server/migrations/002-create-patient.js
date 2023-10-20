"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Patients", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nom: {
        type: Sequelize.STRING,
      },
      prenom: {
        type: Sequelize.STRING,
      },
      adresse: {
        type: Sequelize.STRING,
      },
      tel: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      dateNaissance: {
        type: Sequelize.DATEONLY,
      },
      tel2: {
        type: Sequelize.STRING,
      },
      genre: {
        type: Sequelize.ENUM("Masculin", "Feminin"),
        allowNull: true,
      },
      situationFamiliale: {
        type: Sequelize.STRING,
      },
      profession: {
        type: Sequelize.STRING,
      },
      groupeSanguin: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
      referenceDossier: {
        type: Sequelize.STRING,
      },
      CabinetId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Cabinets",
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
    await queryInterface.dropTable("Patients");
  },
};
