const { Antecedent } = require("../models");
exports.createOne = async (req, res) => {
  try {
    const newAntecedent = await Antecedent.create(req.body);
    res.status(201).json(newAntecedent);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};
exports.getAllid = async (req, res) => {
  try {
    const responce = await Antecedent.findAll({
      where: { PatientId: req.params.PatientId },
    });
    res.status(200).json(responce);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};
exports.updateOne = async (req, res) => {
  try {
    const antecedent = await Antecedent.findByPk(req.body.id);
    if (antecedent) {
      await antecedent.update(req.body);
      res.status(200).json(antecedent);
    } else {
      res.status(404).json({ message: "not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

exports.deleteOne = async (req, res) => {
  try {
    const antecedent = await Antecedent.findByPk(req.params.id);
    if (antecedent) {
      await antecedent.destroy();
      res.status(200).json({ messae: "antecedent  delete" });
    } else {
      res.status(404).json({ message: "antecedent  not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};
