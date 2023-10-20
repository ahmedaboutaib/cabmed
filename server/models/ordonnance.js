"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Ordonnance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Patient, {
        foreignKey: 'PatientId'
      });
      this.belongsToMany(models.Medicament, { through: models.Prescription });
    }
  }
  Ordonnance.init(
    {
      dateOrd: DataTypes.DATEONLY,
      PatientId: {
        type: DataTypes.INTEGER,
        references:{
          model:'Patients',
          key:'id'
        }
      },
    },
    {
      sequelize,
      modelName: "Ordonnance",
    }
  );
  return Ordonnance;
};
