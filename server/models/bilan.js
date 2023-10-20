"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Bilan extends Model {
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
      this.belongsTo(models.TypeBilan, {
        foreignKey: 'TypeBilanId'
      });
      this.belongsToMany(models.TypeBilan, { through: models.BilanComposition, foreignKey: 'BilanId' });
    }
  }
  Bilan.init(
    {
      observation: DataTypes.STRING,
      dateBilan: DataTypes.DATEONLY,
      resultat: DataTypes.JSON,
      TypeBilanId: {
        type: DataTypes.INTEGER,
        references:{
          model:'TypeBilans',
          key:'id'
        }
      },
      PatientId: {
        type: DataTypes.INTEGER,
        references:{
          model:'Patients',
          key:'id'
        }
      }
    },
    {
      sequelize,
      modelName: "Bilan",
    }
  );
  return Bilan;
};
