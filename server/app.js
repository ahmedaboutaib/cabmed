var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var app = express();
const cors = require("cors");

app.use(
  cors({
    origin: process.env.CLIENT_APP_URL,
    allowedHeaders: "*",
  })
);
var utilisateurRouter = require("./routes/utilisateurs");
var patientRouter = require("./routes/patients");
var RendezVousRouter = require("./routes/redezvous");
var depenseRouter = require("./routes/depense");
var examenphysiqueRouter = require("./routes/examenphysique");
var consultationRouter = require("./routes/consultation");
var medicamentRouter = require("./routes/medicament");
var ordonnanceRouter = require("./routes/ordonnance");
var prescriptionRouter = require("./routes/prescription");
var certificatRouter = require("./routes/certificat");
var typeTestRouter = require("./routes/typetest");
var testMedicalRouter = require("./routes/testMedical");
var cabinetRouter = require("./routes/cabinet");
var serviceRouter = require("./routes/service");
var paiementRouter = require("./routes/paiement");
var visiteRouter = require("./routes/visite");
var bilanRouter = require("./routes/bilan");
var typebilanRouter = require("./routes/typeBilan");
var salleRouter = require("./routes/salledattent");
var bilanCompositionRouter = require("./routes/bilan-compositions");
var antecedantRouter = require("./routes/antecedent");
var auth = require("./serviceAuth/auth");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// --
app.use("/utilisateurAuth", auth);

app.use("/utilisateur", utilisateurRouter);
app.use("/patients", patientRouter);
app.use("/rendezvous", RendezVousRouter);
app.use("/depenses", depenseRouter);
app.use("/examenphysique", examenphysiqueRouter);
app.use("/consultation", consultationRouter);
app.use("/medicament", medicamentRouter);
app.use("/ordonnance", ordonnanceRouter);
app.use("/prescription", prescriptionRouter);
app.use("/certificat", certificatRouter);
app.use("/typetest", typeTestRouter);
app.use("/testMedical", testMedicalRouter);
app.use("/cabinet", cabinetRouter);
app.use("/service", serviceRouter);
app.use("/paiement", paiementRouter);
app.use("/visite", visiteRouter);
app.use("/bilan", bilanRouter);
app.use("/typebilan", typebilanRouter);
app.use("/salledattent", salleRouter);
app.use("/bilan-compositions", bilanCompositionRouter);
app.use("/antecedent", antecedantRouter);

module.exports = app;
