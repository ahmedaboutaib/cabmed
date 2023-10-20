var express = require("express");
var router = express.Router();
var paiementController = require("../controllers/paiementControler");
const AuthenticateJWT = require("../middleware/authenticateJWT");

/* GET users listing. */

router.post("/", AuthenticateJWT, paiementController.createOne);
router.get(
  "/impaye/:CabinetId",
  AuthenticateJWT,
  paiementController.getAllCabinetId
);
router.get("/:PatientId", AuthenticateJWT, paiementController.getAllPatientId);
router.put("/", AuthenticateJWT, paiementController.updateOne);
router.put("/visite", AuthenticateJWT, paiementController.updateOneEtVisite);
router.delete("/:id", AuthenticateJWT, paiementController.deleteOneEtVisite);
module.exports = router;
