// controllers/patientController.js
const { Ordonnance, Medicament, Prescription, Patient } = require("../models");

exports.getAll = async (req, res) => {
  try {
    const ordonnances = await Ordonnance.findAll({
      include: [{ model: Medicament }],
    });
    res.status(200).json(ordonnances);
  } catch (error) {
    res.status(500).json({ message: "An error occurred ", error });
  }
};

//------

exports.getAllpatientId = async (req, res) => {
  try {
    const ordonnances = await Ordonnance.findAll({
      where: { PatientId: req.params.PatientId },
      include: [{ model: Medicament }, { model: Patient }],
    });
    res.status(200).json(ordonnances);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occurred", error });
  }
};

exports.createOne = async (req, res) => {
  try {
    const newOrdonnance = await Ordonnance.create(req.body);
    res.status(201).json(newOrdonnance);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

exports.updateOne = async (req, res) => {
  try {
    const ordonnance = await Ordonnance.findByPk(req.params.id);
    if (ordonnance) {
      await Ordonnance.update(req.body);
      res.status(200).json({ message: "Ordonnance updated", ordonnance });
    } else {
      res.status(404).json({ message: "Ordonnance not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

exports.deleteOne = async (req, res) => {
  try {
    const ordonnance = await Ordonnance.findByPk(req.params.id);
    if (ordonnance) {
      await Ordonnance.destroy();
      res.status(200).json({ message: "Ordonnance deleted" });
    } else {
      res.status(404).json({ message: "Ordonnancenot found" });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

exports.deleteOneEtpreinscription = async (req, res) => {
  try {
    const ordonnance = await Ordonnance.findByPk(req.params.id);
    if (ordonnance) {
      await Prescription.destroy({
        where: { OrdonnanceId: req.params.id },
      });
      await Ordonnance.destroy({ where: { id: req.params.id } });
      res.status(200).json({ message: "Ordonnance deleted" });
    } else {
      res.status(404).json({ message: "Ordonnance not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};
