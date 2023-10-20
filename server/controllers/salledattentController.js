const { Patient, SalleDAttente } = require("../models");

exports.getAll = async (req, res) => {
  try {
    const salles = await SalleDAttente.findAll();
    res.status(200).json(salles);
  } catch (error) {
    res.status(500).json({ message: "An error occurred ", error });
  }
};

exports.getAllCabId = async (req, res) => {
  try {
    const salles = await SalleDAttente.findAll({
      where: { CabinetId: req.params.CabinetId, status: "arriver" },
      include: [{ model: Patient }],
    });
    res.status(200).json(salles);
  } catch (error) {
    res.status(500).json({ message: "An error occurred ", error });
  }
};
exports.getOne = async (req, res) => {
  try {
    const service = await SalleDAttente.findByPk(req.params.id);
    if (service) {
      res.status(200).json(service);
    } else {
      res.status(404).json({ message: "Utilisateur not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

exports.createOne = async (req, res) => {
  try {
    const newsalle = await SalleDAttente.create(req.body);
    res.status(201).json(newsalle);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

exports.updateOne = async (req, res) => {
  try {
    const salle = await SalleDAttente.findByPk(req.params.id);
    if (salle) {
      await salle.update(req.body);
      res.status(200).json({ message: "salle updated", salle });
    } else {
      res.status(404).json({ message: "salle not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

exports.deleteOne = async (req, res) => {
  try {
    const salle = await SalleDAttente.findByPk(req.params.id);
    if (salle) {
      await salle.destroy();
      res.status(200).json({ message: "salle deleted" });
    } else {
      res.status(404).json({ message: "salle not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};
