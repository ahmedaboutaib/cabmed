const { Bilan, TypeBilan, Patient } = require("../models");
const UPL = require("../upload/upload");
const {createBilanAndComposition} = require("../services/bilanService");
exports.getAll = async (req, res) => {
  try {
    const bilan = await Bilan.findAll({
      include: [{ model: TypeBilan }],
    });
    res.status(200).json(bilan);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

exports.getAllid = async (req, res) => {
  try {
    const bilans = await Bilan.findAll({
      where: { PatientId: req.params.PatientId },
      include: [{ model: TypeBilan }, { model: Patient }],
    });
    res.status(200).json(bilans);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

exports.createOne = async (req, res) => {
  try {
    const newBilan = await Bilan.create(req.body);
    res.status(201).json(newBilan);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

exports.updateOne = async (req, res) => {
  try {
    const Bilans = {
      dateBilan: req.body.dateBilan,
      observation: req.body.observation,
      //  TypeBilanId: req.body.TypeBilanId,
      resultat: { resultat: UPL.tableFiles(req.files) },
    };

    const bilan = await Bilan.findByPk(req.params.id);
    if (bilan) {
      await bilan.update(Bilans);
      res.status(200).json({ message: "TestMed updated", bilan });
    } else {
      res.status(404).json({ message: "TestMed not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

exports.updateResultat = async (req, res) => {
  try {
    const bilan = await Bilan.findByPk(req.params.id);
    if (bilan) {
      await bilan.update({ resultat: { resultat: UPL.tableFiles(req.files) } });
      res.status(200).json({ message: "TestMed updated", bilan });
    } else {
      res.status(404).json({ message: "TestMed not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

exports.deleteOne = async (req, res) => {
  try {
    const bilan = await Bilan.findByPk(req.params.id);
    if (bilan) {
      await bilan.destroy();
      res.status(200).json({ message: "bilan deleted" });
    } else {
      res.status(404).json({ message: "bilan not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

exports.createBilanAndComposition = async (req, res) => {
  try {
    const bilan = req.body.bilan;

    
    const createdBilan = await createBilanAndComposition(bilan);
console.log("createdBilan",createdBilan);
    res.status(200).json(createdBilan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.toString() });
  }
};