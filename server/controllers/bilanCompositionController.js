const e = require("express");
const {  BilanComposition, Bilan, TypeBilan } = require("../models");

exports.createOne = async (req, res) => {
  try {
    const newBilanComposition = await BilanComposition.create(req.body);
    res.status(201).json(newBilanComposition);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};
exports.getOne = async (req, res) => {
  try {
    const { id, PatientId } = req.params;
    const bilanComposition = await BilanComposition.findOne({ where: { id, PatientId } });
    res.status(200).json(bilanComposition);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

exports.getAll = async (req, res) => {
  try {
    const { PatientId } = req.params;
    const bilanCompositions = await BilanComposition.findAll({where:{PatientId}});
    res.status(200).json(bilanCompositions);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
}
};
exports.createAll = async (req, res) => {
  try {
    const newBilanCompositions = await BilanComposition.bulkCreate(req.body);
    res.status(201).json(newBilanCompositions);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

exports.deleteOne = async (req, res) => {
  try {
    await BilanComposition.destroy({
      where: {
        PaimentId: req.body.MedicamentId,
        ServiceId: req.body.OrdonnanceId,
      },
    });
    res.status(200).json({ message: "BilanComposition deleted" });
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await BilanComposition.update(req.body, {
      where: { id },
    });
    if (updated) {
      const updatedBilanComposition = await BilanComposition.findOne({
        where: { id },
      });
      return res.status(200).json({ bilanComposition: updatedBilanComposition });
    }
    throw new Error("BilanComposition not found");
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

exports.updateAll = async (req, res) => {
  try {
    const { ids, ...updateData } = req.body; // ids contient un tableau d'IDs des lignes à mettre à jour
    const options = { where: { PaiementId: ids } }; // Sélectionner toutes les lignes avec les IDs spécifiés
    const result = await BilanComposition.bulkUpdate(updateData, options);
    res.status(200).json({ message: "bilanCompositions updated", result });
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};
