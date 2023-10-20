var express = require("express");
var router = express.Router();
var patientController = require("../controllers/patientController");
const AuthenticateJWT = require("../middleware/authenticateJWT");

/* GET users listing. */
router.get("/", AuthenticateJWT, patientController.getAll);
router.get("/One/:id", AuthenticateJWT, patientController.getOne);
router.get("/:CabinetId", AuthenticateJWT, patientController.getAllIdCab);
router.post("/", AuthenticateJWT, patientController.createOne);
router.delete("/:id", AuthenticateJWT, patientController.deleteOne);
router.put("/:id", AuthenticateJWT, patientController.updateOne);
router.put("/status/:id", AuthenticateJWT, patientController.updateStatus);
router.post(
  "/rchercher/:rechercher",
  AuthenticateJWT,
  patientController.getrecher
);

module.exports = router;
// AuthenticateJWT,
