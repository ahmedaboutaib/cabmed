var express = require("express");
var router = express.Router();
var visiteController = require("../controllers/visiteController");
const AuthenticateJWT = require("../middleware/authenticateJWT");

/* GET users listing. */

router.post("/", visiteController.createAll);
router.put("/", visiteController.updateAll);
module.exports = router;
