const { Utilisateur, Service } = require("../models");

exports.getAll = async (req, res) => {
  try {
    const services = await Service.findAll();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: "An error occurred ", error });
  }
};
exports.getAllCabId = async (req, res) => {
  try {
    const services = await Service.findAll({
      where: { CabinetId: req.params.CabinetId },
    });
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: "An error occurred ", error });
  }
};
exports.getOne = async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (service) {
      res.status(200).json(service);
    } else {
      res.status(404).json({ message: "Utilisateur not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

exports.createOne = async (req, res) => {
  try {
    const newservice = await Service.create(req.body);
    res.status(201).json(newservice);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

exports.updateOne = async (req, res) => {
  try {
    const service = await Service.findByPk(req.body.id);
    if (service) {
      await service.update(req.body);
      res.status(200).json({ message: "Utilisateur updated", service });
    } else {
      res.status(404).json({ message: "Utilisateur not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

exports.deleteOne = async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (service) {
      await service.destroy();
      res.status(200).json({ message: "Utilisateur deleted" });
    } else {
      res.status(404).json({ message: "Utilisateur not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};
