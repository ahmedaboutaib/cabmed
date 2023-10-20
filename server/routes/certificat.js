var express = require("express");
var router = express.Router();
var controllerCertificat = require("../controllers/certificatController");
/* GET users listing. */
const AuthenticateJWT = require("../middleware/authenticateJWT");
router.get("/:PatientId", AuthenticateJWT, controllerCertificat.getAllid);
router.post("/", AuthenticateJWT, controllerCertificat.createOne);
router.put("/", AuthenticateJWT, controllerCertificat.updateOne);
router.delete("/:id", AuthenticateJWT, controllerCertificat.deleteOne);
module.exports = router;
