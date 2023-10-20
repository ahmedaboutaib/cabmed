const { TestMedical, TypeTest, Patient } = require("../models");
const UPL = require("../upload/upload");

exports.getAll = async (req, res) => {
  try {
    const TestsMed = await TestMedical.findAll({
      include: [{ model: TypeTest }],
    });
    res.status(200).json(TestsMed);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

exports.getAllid = async (req, res) => {
  try {
    const TestsMeds = await TestMedical.findAll({
      where: { PatientId: req.params.PatientId },
      include: [{ model: TypeTest }, { model: Patient }],
    });

    /*const result = TestsMeds.map((test) => {
      const {
        id,
        dateTest,
        resultat,
        createdAt,
        updatedAt,
        PatientId,
        description,
        TypeTestId,
        TypeTests,
      } = test;
      return {
        id,
        dateTest,
        resultat,
        createdAt,
        updatedAt,
        PatientId,
        description,
        TypeTestId,
        TypeTests,
      };
    });*/

    res.status(200).json(TestsMeds);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};
exports.getOne = async (req, res) => {
  try {
    const TestMed = await TestMedical.findByPk(req.params.id);
    if (TestMed) {
      res.status(200).json(TestMed);
    } else {
      res.status(404).json({ message: "TypeTest not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

exports.createOne = async (req, res) => {
  try {
    const testMedData = {
      dateTest: req.body.dateTest,
      desc: req.body.desc,
      TypeTestId: req.body.TypeTestId,
      resultat: { resultat: UPL.tableFiles(req.files) },
      PatientId: req.body.PatientId,
    };

    const newTestMed = await TestMedical.create(testMedData);
    res.status(201).json(newTestMed);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

/*
exports.createOne = async (req, res) => {
  try {
    const testMedData = {
      dateTest: req.body.dateTest,
      desc: req.body.desc,
      TypeTestId: null,
      resultat: "data/upload/" + req.file.filename,
      PatientId: req.body.PatientId,
    };
    const newTestMed = await TestMedical.create(testMedData);
    res.status(201).json(newTestMed);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};
exports.createOne = async (req, res) => {
  try {
    
    const newTestMed = await TestMedical.create(req.body);
    res.status(201).json(newTestMed);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};


*/
exports.updateOne = async (req, res) => {
  try {
    const testMedData = {
      dateTest: req.body.dateTest,
      desc: req.body.desc,
      TypeTestId: req.body.TypeTestId,
      resultat: { resultat: UPL.tableFiles(req.files) },
      PatientId: req.body.PatientId,
    };
    const TestMed = await TestMedical.findByPk(req.params.id);
    if (TestMed) {
      await TestMed.update(testMedData);
      res.status(200).json({ message: "TestMed updated", TestMed });
    } else {
      res.status(404).json({ message: "TestMed not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

exports.deleteOne = async (req, res) => {
  try {
    const TestMed = await TestMedical.findByPk(req.params.id);
    if (TestMed) {
      await TestMed.destroy();
      res.status(200).json({ message: "TestMed deleted" });
    } else {
      res.status(404).json({ message: "TestMed not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};
