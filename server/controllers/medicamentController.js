// controllers/patientController.js
const { Medicament } = require("../models");

exports.getAll = async (req, res) => {
  try {
    const medicament = await Medicament.findAll({
      where: { CabinetId: req.params.CabinetId },
    });
    res.status(200).json(medicament);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};
exports.createOne = async (req, res) => {
  try {
    const medicament = await Medicament.create(req.body);
    res.status(200).json(medicament);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

exports.deleteOne = async (req, res) => {
  try {
    const medicament = await Medicament.findByPk(req.params.id);
    if (medicament) {
      await medicament.destroy();
      res.status(200).json({ message: "medicament deleted" });
    } else {
      res.status(404).json({ message: "medicament not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};
