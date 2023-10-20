var express = require("express");
var router = express.Router();
var consultaionController = require("../controllers/consultaionController");
/* GET users listing. */
const AuthenticateJWT = require("../middleware/authenticateJWT");
router.get("/:PatientId", AuthenticateJWT, consultaionController.getAllid);
router.post("/", AuthenticateJWT, consultaionController.createOne);
router.put("/", AuthenticateJWT, consultaionController.updateOne);
router.delete("/:id", AuthenticateJWT, consultaionController.deleteOne);
module.exports = router;
