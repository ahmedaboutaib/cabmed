const { TypeBilan } = require("../models");

exports.getAllidCab = async (req, res) => {
  try {
    const TypeTests = await TypeBilan.findAll({
      where: { CabinetId: req.params.CabinetId },
    });
    res.status(200).json(TypeTests);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};
exports.createOne = async (req, res) => {
  try {
    const newTypeBilan = await TypeBilan.create(req.body);
    res.status(201).json(newTypeBilan);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

exports.deleteOne = async (req, res) => {
  try {
    const TypeBilans = await TypeBilan.findByPk(req.params.id);
    if (TypeBilans) {
      await TypeBilans.destroy();
      res.status(200).json({ message: "TypeBilan deleted" });
    } else {
      res.status(404).json({ message: "TypeBilan not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};
