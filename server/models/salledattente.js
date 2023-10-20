"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SalleDAttente extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Cabinet, {
        foreignKey: 'CabinetId'
      });
      this.belongsTo(models.Patient, { 
        foreignKey: "PatientId" 
      });
    }
  }
  SalleDAttente.init(
    {
      motif: DataTypes.STRING,
      type: DataTypes.STRING,
      heureDAR: DataTypes.TIME,
      status: DataTypes.STRING,
      date: DataTypes.DATEONLY,
      situation: DataTypes.STRING,
      PatientId: {
        type: DataTypes.INTEGER,
        references:{
          model:'Patients',
          key:'id'
        }
      },
      CabinetId: {
        type: DataTypes.INTEGER,
        references:{
          model:'Cabinets',
          key:'id'
        }
      },
    },
    {
      sequelize,
      modelName: "SalleDAttente",
    }
  );
  return SalleDAttente;
};
