var express = require("express");
var router = express.Router();
var rendezvouController = require("../controllers/rendezvousController");
const AuthenticateJWT = require("../middleware/authenticateJWT");

/* GET users listing. */
router.get("/", AuthenticateJWT, rendezvouController.getAll);
router.get("/:CabinetId", AuthenticateJWT, rendezvouController.getAllCabinetId);
router.get(
  "/patient/:PatientId",
  AuthenticateJWT,
  rendezvouController.getAllPatientId
);
router.post(
  "/actuel",
  AuthenticateJWT,
  rendezvouController.getAllCabinetIdACTUEL
);
router.post(
  "/moisactuel",
  AuthenticateJWT,
  rendezvouController.getAllCabinetIdMoisACTUEL
);
router.post("/", AuthenticateJWT, rendezvouController.createOne);
router.delete("/:id", AuthenticateJWT, rendezvouController.deleteOne);
router.put("/:id", AuthenticateJWT, rendezvouController.updateOne);
module.exports = router;
