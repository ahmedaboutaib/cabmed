var express = require("express");
var router = express.Router();
var ordonnanceController = require("../controllers/ordonnanceController");
/* GET users listing. */
const AuthenticateJWT = require("../middleware/authenticateJWT");
router.get("/", AuthenticateJWT, ordonnanceController.getAll);
router.get(
  "/:PatientId",
  AuthenticateJWT,
  ordonnanceController.getAllpatientId
);
router.put("/:id", AuthenticateJWT, ordonnanceController.updateOne);
router.delete(
  "/:id",
  AuthenticateJWT,
  ordonnanceController.deleteOneEtpreinscription
);
router.post("/", AuthenticateJWT, ordonnanceController.createOne);

module.exports = router;
