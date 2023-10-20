var express = require("express");
var router = express.Router();
var TypeTestController = require("../controllers/typeTestController");
const AuthenticateJWT = require("../middleware/authenticateJWT");

/* GET users listing. */
router.get("/:CabinetId", AuthenticateJWT, TypeTestController.getAllidCab);
router.post("/", AuthenticateJWT, TypeTestController.createOne);
router.delete("/:id", AuthenticateJWT, TypeTestController.deleteOne);

module.exports = router;
