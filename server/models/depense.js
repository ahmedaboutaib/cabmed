"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Depense extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Cabinet, {
        foreignKey: "CabinetId",
      });
      this.belongsTo(models.Utilisateur, {
        foreignKey: "UtilisateurId",
      });
    }
  }
  Depense.init(
    {
      label: DataTypes.STRING,
      description: DataTypes.STRING,
      montant: DataTypes.DOUBLE,
      UtilisateurId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Utilisateurs",
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
      modelName: "Depense",
    }
  );
  return Depense;
};
