const { Certificat, Patient } = require("../models");
exports.createOne = async (req, res) => {
  try {
    const newCertificat = await Certificat.create(req.body);
    res.status(201).json(newCertificat);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};
exports.getAllid = async (req, res) => {
  try {
    const responce = await Certificat.findAll({
      where: { PatientId: req.params.PatientId },
      include: [{ model: Patient }],
    });
    res.status(200).json(responce);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

exports.updateOne = async (req, res) => {
  try {
    const certificat = await Certificat.findByPk(req.body.id);
    if (certificat) {
      await certificat.update(req.body);
      res.status(200).json(certificat);
    } else {
      res.status(404).json({ message: "not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

exports.deleteOne = async (req, res) => {
  try {
    const certificat = await Certificat.findByPk(req.params.id);
    if (certificat) {
      await certificat.destroy();
      res.status(200).json({ messae: "certificat delete" });
    } else {
      res.status(404).json({ message: "certificat not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};
