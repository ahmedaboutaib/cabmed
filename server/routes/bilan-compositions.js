var express = require("express");
var router = express.Router();
var bilanCompositionController = require("../controllers/bilanCompositionController");
const AuthenticateJWT = require("../middleware/authenticateJWT");

router.get("/:PatientId", AuthenticateJWT, bilanCompositionController.getAll);
router.get("/:id/patients/:PatientId", AuthenticateJWT, bilanCompositionController.getOne);
router.post("/", AuthenticateJWT, bilanCompositionController.createOne);
router.put("/:id", AuthenticateJWT, bilanCompositionController.update);

module.exports = router;
