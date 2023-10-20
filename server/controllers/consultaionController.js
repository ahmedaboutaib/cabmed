const { Consultation } = require("../models");
exports.createOne = async (req, res) => {
  try {
    const newConsultation = await Consultation.create(req.body);
    res.status(201).json(newConsultation);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};
exports.getAllid = async (req, res) => {
  try {
    const responce = await Consultation.findAll({
      where: { PatientId: req.params.PatientId },
    });
    res.status(200).json(responce);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};
exports.updateOne = async (req, res) => {
  try {
    const consultation = await Consultation.findByPk(req.body.id);
    if (consultation) {
      await consultation.update(req.body);
      res.status(200).json(consultation);
    } else {
      res.status(404).json({ message: "not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

exports.deleteOne = async (req, res) => {
  try {
    const consultation = await Consultation.findByPk(req.params.id);
    if (consultation) {
      await consultation.destroy();
      res.status(200).json({ messae: "consultaion delete" });
    } else {
      res.status(404).json({ message: "consultaion not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};
