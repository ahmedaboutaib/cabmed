const { Paiement, Service, Visite } = require("../models");

exports.createOne = async (req, res) => {
  try {
    const newVisite = await Visite.create(req.body);
    res.status(201).json(newVisite);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

exports.createAll = async (req, res) => {
  try {
    const newVisites = await Visite.bulkCreate(req.body);
    res.status(201).json(newVisites);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

exports.deleteOne = async (req, res) => {
  try {
    await Visite.destroy({
      where: {
        PaimentId: req.body.MedicamentId,
        ServiceId: req.body.OrdonnanceId,
      },
    });
    res.status(200).json({ message: "Visite deleted" });
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

exports.updateAll = async (req, res) => {
  try {
    const { ids, ...updateData } = req.body; // ids contient un tableau d'IDs des lignes à mettre à jour
    const options = { where: { PaiementId: ids } }; // Sélectionner toutes les lignes avec les IDs spécifiés
    const result = await Visite.bulkUpdate(updateData, options);
    res.status(200).json({ message: "visites updated", result });
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};
