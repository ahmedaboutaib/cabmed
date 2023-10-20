"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Utilisateur extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Depense, {
        foreignKey: "UtilisateurId",
      });
      this.belongsTo(models.Cabinet, {
        foreignKey: "CabinetId",
      });
    }
  }
  Utilisateur.init(
    {
      nom: DataTypes.STRING,
      image: DataTypes.STRING,
      prenom: DataTypes.STRING,
      email: DataTypes.STRING,
      nomUtil: DataTypes.STRING,
      tel: DataTypes.STRING,
      role: DataTypes.STRING,
      pwd: DataTypes.STRING,
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
      modelName: "Utilisateur",
    }
  );
  return Utilisateur;
};
