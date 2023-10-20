const express = require("express");
const router = express.Router();
const { Utilisateur, Cabinet } = require("../models");
const jwt = require("jsonwebtoken");
const Sequelize = require("sequelize");

require("dotenv").config();

router.post("/login", async (req, res) => {
  try {
    const user = await Utilisateur.findOne({
      where: {
        [Sequelize.Op.or]: [
          { email: req.body.email },
          { nomUtil: req.body.nomUtil },
        ],
      },
      include: [{ model: Cabinet }],
    });

    if (user) {
      if (req.body.pwd == user.pwd) {
        const role = user.role;
        let token = jwt.sign(
          { id: user.id, usernom: user.nom, role },
          process.env.JWT_PRIVATE_KEY,
          {
            expiresIn: "24h",
          }
        );

        res.status(200).json({ token: token, user: user });
      } else {
        res.status(400).json({ message: "Invalid password ou l'email" });
      }
    } else {
      res.status(400).json({ message: "Invalid email ou password" });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "An error occurred", error });
  }
});

module.exports = router;
