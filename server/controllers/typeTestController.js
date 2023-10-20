const { TypeTest } = require("../models");

exports.getAllidCab = async (req, res) => {
  try {
    const TypeTests = await TypeTest.findAll({
      where: { CabinetId: req.params.CabinetId },
    });
    res.status(200).json(TypeTests);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

exports.getOne = async (req, res) => {
  try {
    const Typetest = await TypeTest.findByPk(req.params.id);
    if (Typetest) {
      res.status(200).json(Typetest);
    } else {
      res.status(404).json({ message: "TypeTest not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

exports.createOne = async (req, res) => {
  try {
    const newTypeTest = await TypeTest.create(req.body);
    res.status(201).json(newTypeTest);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

exports.updateOne = async (req, res) => {
  try {
    const Typetest = await TypeTest.findByPk(req.params.id);
    if (Typetest) {
      await Typetest.update(req.body);
      res.status(200).json({ message: "TypeTest updated", TypeTest });
    } else {
      res.status(404).json({ message: "TypeTest not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

exports.deleteOne = async (req, res) => {
  try {
    const Typetest = await TypeTest.findByPk(req.params.id);
    if (Typetest) {
      await Typetest.destroy();
      res.status(200).json({ message: "TypeTest deleted" });
    } else {
      res.status(404).json({ message: "TypeTest not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};
