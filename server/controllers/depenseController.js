const { Depense } = require("../models");

exports.getAll = async (req, res) => {
  try {
    const depenses = await Depense.findAll();
    res.status(200).json(depenses);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};
exports.getAllCabinetId = async (req, res) => {
  try {
    const depenses = await Depense.findAll({
      where: { CabinetId: req.params.CabinetId },
    });
    res.status(200).json(depenses);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

exports.getOne = async (req, res) => {
  try {
    const depense = await Depense.findByPk(req.params.id);
    if (patient) {
      res.status(200).json(depense);
    } else {
      res.status(404).json({ message: "Patient not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

exports.createOne = async (req, res) => {
  try {
    const newDepense = await Depense.create(req.body);
    res.status(201).json(newDepense);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

exports.updateOne = async (req, res) => {
  try {
    const depense = await Depense.findByPk(req.params.id);
    if (depense) {
      await depense.update(req.body);
      res.status(200).json({ message: "Patient updated", patient });
    } else {
      res.status(404).json({ message: "Patient not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

exports.deleteOne = async (req, res) => {
  try {
    const depense = await Depense.findByPk(req.params.id);
    if (depense) {
      await depense.destroy();
      res.status(200).json({ message: "Patient deleted" });
    } else {
      res.status(404).json({ message: "Patient not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};
