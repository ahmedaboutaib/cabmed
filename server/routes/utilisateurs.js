var express = require("express");
var router = express.Router();
var utilisateurController = require("../controllers/utilisateurController");
const AuthenticateJWT = require("../middleware/authenticateJWT");
const UPL = require("../upload/upload");
/* GET users listing. */
router.get("/", AuthenticateJWT, utilisateurController.getAll);
router.get("/:CabinetId", AuthenticateJWT, utilisateurController.getAllCabId);
router.post("/", AuthenticateJWT, utilisateurController.createOne); //?
router.post(
  "/admin",
  UPL.upload.single("file"),
  utilisateurController.createCabinetAndAdmin
);
router.put("/:id", AuthenticateJWT, utilisateurController.updateOne);
router.delete("/:id", AuthenticateJWT, utilisateurController.deleteOne);
module.exports = router;
