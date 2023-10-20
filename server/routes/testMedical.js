var express = require("express");
var router = express.Router();
var TestMedicalController = require("../controllers/testMedicalController");
const UPL = require("../upload/upload");
const AuthenticateJWT = require("../middleware/authenticateJWT");

router.get("/:PatientId", AuthenticateJWT, TestMedicalController.getAllid);
router.delete("/:id", AuthenticateJWT, TestMedicalController.deleteOne);
router.put(
  "/:id",
  AuthenticateJWT,
  UPL.upload.array("files"),
  TestMedicalController.updateOne
);
router.post(
  "/",
  AuthenticateJWT,
  UPL.upload.array("files"),
  TestMedicalController.createOne
);
module.exports = router;

//router.get("/", TestMedicalController.getAll);
//router.post("/", TestMedicalController.createOne);
