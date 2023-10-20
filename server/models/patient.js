"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Antecedent, {
        foreignKey: "PatientId",
      });

      this.hasMany(models.ExamenPhysique, {
        foreignKey: "PatientId",
      });

      this.hasMany(models.TestMedical, {
        foreignKey: "PatientId",
      });

      this.hasMany(models.RendezVous, {
        foreignKey: "PatientId",
      });
      this.hasMany(models.Bilan, {
        foreignKey: "PatientId",
      });

      this.hasMany(models.Paiement, {
        foreignKey: "PatientId",
      });

      this.hasMany(models.Consultation, {
        foreignKey: "PatientId",
      });

      this.hasMany(models.Ordonnance, {
        foreignKey: "PatientId",
      });

      this.hasMany(models.Certificat, {
        foreignKey: "PatientId",
      });

      this.hasMany(models.SalleDAttente, {
        foreignKey: "PatientId",
        // Add other options such as `through` if needed
      });

      this.belongsTo(models.Cabinet, {
        foreignKey: "CabinetId",
      });
    }
  }
  Patient.init(
    {
      nom: DataTypes.STRING,
      prenom: DataTypes.STRING,
      adresse: DataTypes.STRING,
      tel: DataTypes.STRING,
      email: DataTypes.STRING,
      dateNaissance: DataTypes.DATEONLY,
      tel2: DataTypes.STRING,
      genre: DataTypes.ENUM("Masculin", "Feminin"),
      situationFamiliale: DataTypes.STRING,
      profession: DataTypes.STRING,
      groupeSanguin: DataTypes.STRING,
      status: DataTypes.STRING,
      referenceDossier: DataTypes.STRING,
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
      modelName: "Patient",
    }
  );
  return Patient;
};
