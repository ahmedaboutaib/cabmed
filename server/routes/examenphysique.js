var express = require("express");
var router = express.Router();
var examenphysiqueController = require("../controllers/examenphysiqueController");
const AuthenticateJWT = require("../middleware/authenticateJWT");
router.get("/", AuthenticateJWT, examenphysiqueController.getAll);
router.get("/:PatientId", AuthenticateJWT, examenphysiqueController.getOne);
router.post("/", AuthenticateJWT, examenphysiqueController.createOne);
router.put("/:id", AuthenticateJWT, examenphysiqueController.updateOne);
module.exports = router;
