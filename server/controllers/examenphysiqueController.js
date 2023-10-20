const { ExamenPhysique } = require("../models");
exports.getOne = async (req, res) => {
  try {
    const examenphysique = await ExamenPhysique.findOne({
      where: { PatientId: req.params.PatientId },
    });
    if (examenphysique) {
      res.status(200).json(examenphysique);
    } else {
      res.status(404).json({ mesage: " examenphysique n'exist pas" });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred ", error });
  }
};

exports.getAll = async (req, res) => {
  try {
    const examenphysique = await ExamenPhysique.findAll();
    if (examenphysique) {
      res.status(200).json(examenphysique);
    } else {
      res.status(404).json({ mesage: " examenphysique n'exist pas" });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred ", error });
  }
};

exports.createOne = async (req, res) => {
  try {
    const newExamenPhysique = await ExamenPhysique.create(req.body);
    res.status(201).json(newExamenPhysique);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

exports.updateOne = async (req, res) => {
  try {
    const modifierExmenPhysique = await ExamenPhysique.findByPk(req.body.id);
    if (modifierExmenPhysique) {
      await modifierExmenPhysique.update(req.body);
      res.status(201).json(modifierExmenPhysique);
    } else {
      res.status(404).json({ message: "not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "An error Oncurred " });
  }
};
