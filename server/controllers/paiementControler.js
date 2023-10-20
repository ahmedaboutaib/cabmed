const {
  Paiement,
  Service,
  Visite,
  Patient,
  SalleDAttente,
} = require("../models");
const sequelize = require("sequelize");

/*
exports.createOne = async (req, res) => {
  try {
    const newPaiement = await Paiement.create(req.body);
    res.status(201).json(newPaiement);
  
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};*/

exports.createOne = async (req, res) => {
  const PatientId = req.body.PatientId;
  try {
    const newPaiement = await Paiement.create(req.body);

    if (newPaiement) {
      const salle = await SalleDAttente.findOne({
        order: [["id", "DESC"]],
        where: { PatientId: PatientId },
      });
      if (salle) {
        await salle.update({ status: "terminer" });
      }
    }
    res.status(201).json(newPaiement);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

exports.getAll = async (req, res) => {
  try {
    const paiement = await Paiement.findAll({
      include: [{ model: Service }],
    });
    res.status(200).json(paiement);
  } catch (error) {
    res.status(500).json({ message: "An error occurred ", error });
  }
};

//------

exports.getAllPatientId = async (req, res) => {
  try {
    const paiement = await Paiement.findAll({
      where: { PatientId: req.params.PatientId },
      include: [{ model: Service }],
    });
    res.status(200).json(paiement);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

//

exports.getAllCabinetId = async (req, res) => {
  try {
    const paiement = await Paiement.findAll({
      where: { status: "impaye" },
      include: [
        {
          model: Patient,
          as: "Patient",
          where: { CabinetId: req.params.CabinetId },
        },
      ],
    });
    res.status(200).json(paiement);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};
//
exports.updateOne = async (req, res) => {
  try {
    const paiement = await Paiement.findByPk(req.body.id);
    if (paiement) {
      await paiement.update(req.body);
      res.status(200).json({ message: "Paiement  updated", paiement });
    } else {
      res.status(404).json({ message: "Paiement  not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

exports.deleteOneEtVisite = async (req, res) => {
  try {
    const paiement = await Paiement.findByPk(req.params.id);
    if (paiement) {
      await Visite.destroy({
        where: { PaiementId: req.params.id },
      });
      await paiement.destroy({ where: { id: req.params.id } });
      res.status(200).json({ message: "Ordonnance deleted" });
    } else {
      res.status(404).json({ message: "Ordonnance not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

exports.updateOneEtVisite = async (req, res) => {
  try {
    await Visite.destroy({
      where: { PaiementId: req.body.id },
    });
    const paiement = await Paiement.findByPk(req.body.id);
    if (paiement) {
      await paiement.update(req.body);
      res.status(200).json({ message: "Paiement  updated", paiement });
    } else {
      res.status(404).json({ message: "Paiement  not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};
