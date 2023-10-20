"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Prescription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Prescription.init(
    {
      description: DataTypes.STRING,
      ordonnanceId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Ordonnaces",
          key: "id",
        },
      },
      MedicamentId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Medicaments",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Prescription",
    }
  );
  return Prescription;
};
