var express = require("express");
var medicamentController = require("../controllers/medicamentController");
var router = express.Router();
const AuthenticateJWT = require("../middleware/authenticateJWT");
/* GET users listing. */
router.get("/:CabinetId", AuthenticateJWT, medicamentController.getAll);
router.delete("/:id", AuthenticateJWT, medicamentController.deleteOne);
router.post("/", AuthenticateJWT, medicamentController.createOne);
module.exports = router;
