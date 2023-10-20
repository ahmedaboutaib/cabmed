var express = require("express");
var router = express.Router();
var TypeBilanController = require("../controllers/typebilanController");
const AuthenticateJWT = require("../middleware/authenticateJWT");
/* GET users listing. */
router.get("/:CabinetId", AuthenticateJWT, TypeBilanController.getAllidCab);
router.post("/", AuthenticateJWT, TypeBilanController.createOne);
router.delete("/:id", AuthenticateJWT, TypeBilanController.deleteOne);
module.exports = router;
