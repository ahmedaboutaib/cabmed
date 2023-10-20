// controllers/userController.js
const jwt = require("jsonwebtoken");
const { Utilisateur, Cabinet } = require("../models");
const Sequelize = require("sequelize");

exports.getAll = async (req, res) => {
  try {
    const utilisateurs = await Utilisateur.findAll();
    res.status(200).json(utilisateurs);
  } catch (error) {
    res.status(500).json({ message: "An error occurred ", error });
  }
};
exports.getAllCabId = async (req, res) => {
  try {
    const utilisateurs = await Utilisateur.findAll({
      where: { CabinetId: req.params.CabinetId },
    });
    res.status(200).json(utilisateurs);
  } catch (error) {
    res.status(500).json({ message: "An error occurred ", error });
  }
};
exports.getOne = async (req, res) => {
  try {
    const utilisateur = await Utilisateur.findByPk(req.params.id);
    if (utilisateur) {
      res.status(200).json(utilisateur);
    } else {
      res.status(404).json({ message: "Utilisateur not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

exports.createOne = async (req, res) => {
  try {
    const count = await Utilisateur.count({
      where: {
        [Sequelize.Op.or]: [
          { email: req.body.email },
          { nomUtil: req.body.nomUtil },
        ],
      },
    });
    if (count === 0) {
      const newUtilisateur = await Utilisateur.create(req.body);
      res.status(201).json(newUtilisateur);
    } else {
      res
        .status(409)
        .json({ message: "Email ou nom utilisateur déjà existant" });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

exports.updateOne = async (req, res) => {
  try {
    const utilisateur = await Utilisateur.findByPk(req.params.id);
    if (utilisateur) {
      await utilisateur.update(req.body);
      res.status(200).json({ message: "Utilisateur updated", utilisateur });
    } else {
      res
        .status(409)
        .json({ message: "Email ou nom utilisateur déjà existant" });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

exports.deleteOne = async (req, res) => {
  try {
    const utilisateur = await Utilisateur.findByPk(req.params.id);
    if (utilisateur) {
      await utilisateur.destroy();
      res.status(200).json({ message: "Utilisateur deleted" });
    } else {
      res.status(404).json({ message: "Utilisateur not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

exports.createOneAdmin = async (req, res) => {
  try {
    const count = await Utilisateur.count({
      where: {
        [Sequelize.Op.or]: [
          { email: req.body.email },
          { nomUtil: req.body.nomUtil },
        ],
      },
    });
    if (count === 0) {
      const newUtilisateur = await Utilisateur.create(req.body);
      res.status(201).json(newUtilisateur);
    } else {
      res.status(409).json({ message: "déjà existe" });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurredd", error });
  }
};

exports.createCabinetAndAdmin = async (req, res) => {
  try {
    const cabent = {
      nom: req.body.nomcb,
      description: req.body.description,
      ville: req.body.ville,
      adresse: req.body.adresse,
      tel: req.body.tel,
      fixe: req.body.fixe,
      email: req.body.emailcb,
      logo: req?.file?.filename,
    };
    const count = await Utilisateur.count({
      where: {
        [Sequelize.Op.or]: [
          { email: req.body.email },
          { nomUtil: req.body.nomUtil },
        ],
      },
    });
    if (count === 0) {
      const newCabmed = await Cabinet.create(cabent);
      const user = {
        nomUtil: req.body.nomUtil,
        prenom: req.body.prenom,
        nom: req.body.nom,
        tel: req.body.telephone,
        email: req.body.email,
        pwd: req.body.pwd,
        role: "admin",
        CabinetId: newCabmed.id,
      };
      const newUtilisateur = await Utilisateur.create(user);
      res.status(201).json({ cabinet: newCabmed, utilisateur: newUtilisateur });
    } else {
      console.log("hhiiii")
      res
        .status(409)
        .json({ message: "Email ou nom utilisateur déjà existant" });
    }
  } catch (error) {
    res.status(500).json({ message: "Une erreur est survenue", error });
  }
};
