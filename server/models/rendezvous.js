"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RendezVous extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Patient, { foreignKey: "PatientId" });
      this.belongsTo(models.Cabinet, {
        foreignKey: "CabinetId",
      });
    }
  }
  RendezVous.init(
    {
      motif: DataTypes.STRING,
      type: DataTypes.STRING,
      heureRDV: DataTypes.TIME,
      status: DataTypes.ENUM("encour", "confirmer", "annuler"),
      dateRDV: DataTypes.DATEONLY,
      details: DataTypes.STRING,
      PatientId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Patients",
          key: "id",
        },
      },
      CabinetId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Cabinets",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "RendezVous",
    }
  );
  return RendezVous;
};
