var express = require("express");
var router = express.Router();
var depenseController = require("../controllers/depenseController");
const AuthenticateJWT = require("../middleware/authenticateJWT");
/* GET users listing. */
router.get("/", AuthenticateJWT, depenseController.getAll);
router.get("/:CabinetId", AuthenticateJWT, depenseController.getAllCabinetId);
router.post("/", AuthenticateJWT, depenseController.createOne);
router.delete("/:id", AuthenticateJWT, depenseController.deleteOne);
router.put("/:id", AuthenticateJWT, depenseController.updateOne);

module.exports = router;
