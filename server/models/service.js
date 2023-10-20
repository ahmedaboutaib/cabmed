"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
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
      this.belongsToMany(models.Paiement, { through: models.Visite });
    }
  }
  Service.init(
    {
      nom: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
      description: DataTypes.STRING,
      prix: DataTypes.DOUBLE,
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
      modelName: "Service",
    }
  );
  return Service;
};
