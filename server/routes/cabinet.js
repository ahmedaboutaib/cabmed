var express = require("express");
var router = express.Router();
var CabinetController = require("../controllers/cabinetController");
const UPL = require("../upload/upload");
router.post("/", UPL.upload.single("file"), CabinetController.createOne);
router.put("/:id", UPL.upload.single("file"), CabinetController.updateOne);
router.get("/:id", CabinetController.getOneIdCab);
module.exports = router;
