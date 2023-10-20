// controllers/patientController.js
const { Patient } = require("../models");
const { Op } = require("sequelize");

exports.getAll = async (req, res) => {
  try {
    const patients = await Patient.findAll();
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};
exports.getAllIdCab = async (req, res) => {
  try {
    const patients = await Patient.findAll({
      where: { CabinetId: req.params.CabinetId, status: "active" },
    });
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

exports.getOne = async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.id);
    if (patient) {
      res.status(200).json(patient);
    } else {
      res.status(404).json({ message: "Patient not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

exports.createOne = async (req, res) => {
  try {
    const newPatient = await Patient.create(req.body);
    res.status(201).json(newPatient);
  } catch (error) {
    console.log(error)

    res.status(500).json({ message: "An error occurred", error });
  }
};

exports.updateOne = async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.id);
    if (patient) {
      await patient.update(req.body);
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
    const patient = await Patient.findByPk(req.params.id);
    if (patient) {
      await patient.destroy();
      res.status(200).json({ message: "Patient deleted" });
    } else {
      res.status(404).json({ message: "Patient not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};
/*
exports.getrecher = async (req, res) => {
  try {
    const patients = await Patient.findAll({
      where: { nom: { [Op.like]: `%${req.params.rechercher}%` } },
    });
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: "an error  occurred" });
  }
};
*/

exports.getrecher = async (req, res) => {
  try {
    const patients = await Patient.findAll({
      where: {
        [Op.or]: [
          { nom: { [Op.like]: `%${req.params.rechercher}%` } },
          { prenom: { [Op.like]: `%${req.params.rechercher}%` } },
        ],
      },
    });
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: "an error  occurred" });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.id);
    if (patient) {
      await patient.update({ status: "inactive" });
      res.status(200).json({ message: "Patient updated", patient });
    } else {
      res.status(404).json({ message: "Patient not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};
