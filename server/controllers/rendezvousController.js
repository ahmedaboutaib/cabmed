// controllers/rendezvousRendezVous.js
const { RendezVous, Patient } = require("../models");
exports.createOne = async (req, res) => {
  try {
    const newRendezVous = await RendezVous.create(req.body);
    res.status(201).json(newRendezVous);
  } catch (error) {
    console.log("error creating a rendez-vous :",error)
    res.status(500).json({ message: "An error occurred", error });
  }
};

exports.getAll = async (req, res) => {
  try {
    const rendezvous = await RendezVous.findAll();
    res.status(200).json(rendezvous);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
}; //  include: [{ model: Patient }],
exports.getAllCabinetId = async (req, res) => {
  try {
    const rendezvous = await RendezVous.findAll({
      where: { CabinetId: req.params.CabinetId },
      include: [{ model: Patient }],
    });
    res.status(200).json(rendezvous);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occurred", error });
  }
};
exports.getAllPatientId = async (req, res) => {
  try {
    const rendezvous = await RendezVous.findAll({
      where: { PatientId: req.params.PatientId },
    });
    res.status(200).json(rendezvous);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occurred", error });
  }
};
exports.getAllCabinetIdACTUEL = async (req, res) => {
  try {
    const rendezvous = await RendezVous.findAll({
      where: { CabinetId: req.body.CabinetId, dateRDV: req.body.dateRDV },
      include: [{ model: Patient }],
    });
    res.status(200).json(rendezvous);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};
exports.getAllCabinetIdMoisACTUEL = async (req, res) => {
  try {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Ajout de +1 pour obtenir le mois actuel

    const rendezvous = await RendezVous.findAll({
      where: {
        CabinetId: req.body.CabinetId,
        // Utilisation de Sequelize Opérateurs pour filtrer par mois
        dateRDV: {
          [Op.and]: [
            { [Op.gte]: Sequelize.literal(`DATE_FORMAT(dateRDV, '%Y-%m')`) },
            { [Op.lte]: Sequelize.literal(`DATE_FORMAT(dateRDV, '%Y-%m')`) },
          ],
        },
      },
      include: [{ model: Patient }],
    });

    res.status(200).json(rendezvous);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

exports.updateOne = async (req, res) => {
  try {
    const rendezvous = await RendezVous.findByPk(req.params.id);
    if (rendezvous) {
      await rendezvous.update(req.body);
      res.status(200).json({ message: "rendezvous updated", rendezvous });
    } else {
      res.status(404).json({ message: "rendezvous not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

exports.deleteOne = async (req, res) => {
  try {
    const rendezvous = await RendezVous.findByPk(req.params.id);
    if (rendezvous) {
      await rendezvous.destroy();
      res.status(200).json({ message: "rendezvous deleted" });
    } else {
      res.status(404).json({ message: "rendezvous not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};
