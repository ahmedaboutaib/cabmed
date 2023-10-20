"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Consultation extends Model {
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
    }
  }
  Consultation.init(
    {
      motif: DataTypes.STRING,
      heureCon: DataTypes.TIME,
      dateCon: DataTypes.DATEONLY,
      descriptionCon: DataTypes.STRING,
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
      modelName: "Consultation",
    }
  );
  return Consultation;
};
