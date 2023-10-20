var express = require("express");
var router = express.Router();
var bilanController = require("../controllers/bilanController");
const UPL = require("../upload/upload");
const AuthenticateJWT = require("../middleware/authenticateJWT");

router.get("/:PatientId", AuthenticateJWT, bilanController.getAllid);
router.post("/bilan-compositions", AuthenticateJWT, bilanController.createBilanAndComposition);
router.delete("/:id", AuthenticateJWT, bilanController.deleteOne);
router.put(
  "/:id",
  AuthenticateJWT,
  UPL.upload.array("files"),
  bilanController.updateOne
);
router.put(
  "/charger/:id",
  AuthenticateJWT,
  UPL.upload.array("files"),
  bilanController.updateResultat
);

module.exports = router;
