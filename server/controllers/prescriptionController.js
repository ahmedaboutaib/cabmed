// controllers/patientController.js
const { Prescription, Ordonnance } = require("../models");

exports.createOne = async (req, res) => {
  try {
    const newPrescription = await Prescription.create(req.body);
    res.status(201).json(newPrescription);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};
exports.createAll = async (req, res) => {
  try {
    const newPrescriptions = await Prescription.bulkCreate(req.body);
    res.status(201).json(newPrescriptions);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

exports.deleteOne = async (req, res) => {
  try {
    await Prescription.destroy({
      where: {
        MedicamentId: req.body.MedicamentId,
        OrdonnanceId: req.body.OrdonnanceId,
      },
    });
    res.status(200).json({ message: "preinscription deleted" });
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

exports.createAllUp = async (req, res) => {
  try {
    await Prescription.destroy({
      where: {
        OrdonnanceId: req.params.id,
      },
    });

    const newPrescriptions = await Prescription.bulkCreate(req.body);
    res.status(201).json(newPrescriptions);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};
