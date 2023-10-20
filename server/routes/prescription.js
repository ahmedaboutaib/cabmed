var express = require("express");
var router = express.Router();
var prescriptionController = require("../controllers/prescriptionController");
/* GET users listing. */
//router.post("/", prescriptionController.createOne);
router.post("/", prescriptionController.createAll);
router.post("/up/:id", prescriptionController.createAllUp);
router.delete("/", prescriptionController.deleteOne);
router.post("/delete", prescriptionController.deleteOne); /// ????
module.exports = router;
