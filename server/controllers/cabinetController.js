const { Cabinet } = require("../models");

exports.createOne = async (req, res) => {
  try {
    const cabent = {
      nom: req.body.nom,
      description: req.body.description,
      ville: req.body.ville,
      adresse: req.body.adresse,
      tel: req.body.tel,
      fixe: req.body.fixe,
      email: req.body.email,
      logo: "data/upload/" + req?.file?.filename,
    };
    const cab = await Cabinet.findByPk(req.body.id);
    if (!cab) {
      const newCabmed = await Cabinet.create(cabent);
      res.status(201).json(newCabmed);
    } else {
      await cab.update(cabent);
      res.status(200).json(cab);
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};
exports.updateOne = async (req, res) => {
  try {
    const cabent = {
      nom: req.body.nom,
      description: req.body.description,
      ville: req.body.ville,
      adresse: req.body.adresse,
      tel: req.body.tel,
      fixe: req.body.fixe,
      email: req.body.email,
      logo: "data/upload/" + req?.file?.filename,
    };

    const cab = await Cabinet.findByPk(req.params.id);
    if (cab) {
      await cab.update(cabent);

      res.status(200).json({ message: "cabinet updated", cab });
    } else {
      res.status(404).json({ message: "cabinet not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

exports.getOneIdCab = async (req, res) => {
  try {
    const cab = await Cabinet.findByPk(req.params.id);
    res.status(200).json(cab);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};
