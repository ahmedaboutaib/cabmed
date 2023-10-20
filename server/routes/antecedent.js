var express = require("express");
var router = express.Router();
var antecedentController = require("../controllers/antecedentController");
/* GET users listing. */
const AuthenticateJWT = require("../middleware/authenticateJWT");
router.get("/:PatientId", AuthenticateJWT, antecedentController.getAllid);
router.post("/", AuthenticateJWT, antecedentController.createOne);
router.put("/", AuthenticateJWT, antecedentController.updateOne);
router.delete("/:id", AuthenticateJWT, antecedentController.deleteOne);
module.exports = router;
