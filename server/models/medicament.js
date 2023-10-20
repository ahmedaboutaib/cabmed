"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Medicament extends Model {
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
      this.belongsToMany(models.Ordonnance, { through: models.Prescription }); // i may need to add through option
    }
  }
  Medicament.init(
    {
      nom: DataTypes.STRING,
      dosage: DataTypes.DOUBLE,
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
      modelName: "Medicament",
    }
  );
  return Medicament;
};
