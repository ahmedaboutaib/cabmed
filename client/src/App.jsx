import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/acceuil";
import Dashboard from "./pages/dashboard/dashboard";
import Patients from "./pages/dashboard/patients";
import Calendrier from "./pages/dashboard/calendrier";
import Depense from "./pages/dashboard/depenses";
import Parametres from "./pages/dashboard/parametes";
import Dossiersmedicaux from "./pages/dashboard/dossierMedicaux";
import Information from "./pages/dashboard/dossiersmedicaux/information";
import Index from "./pages/dashboard/dossiersmedicaux/index";
import Consultation from "./pages/dashboard/dossiersmedicaux/Consultation";
import Paiement from "./pages/dashboard/dossiersmedicaux/paiement";
import Ordonnance from "./pages/dashboard/dossiersmedicaux/ordonnance";
import Certificat from "./pages/dashboard/dossiersmedicaux/certificat";
import TestMedical from "./pages/dashboard/dossiersmedicaux/testmedical";
import Connexion from "./pages/auth/connexion";
import Inscription from "./pages/auth/inscription";
import Binvenu from "./pages/auth/binvenu";
import RequireAuth from "./pages/_helpers/RequireAuth";
import Utilisateur from "./pages/dashboard/paramirter/Utilisateur";
import AjouterUtilisateur from "./pages/dashboard/paramirter/AjouterUtilisateur";
import Service from "./pages/dashboard/paramirter/Service";
import Cabinet from "./pages/dashboard/paramirter/Cabinet";
import RequireAuthAdimn from "./pages/_helpers/RequireAuthAdmin";
import Bilan from "./pages/dashboard/dossiersmedicaux/bilan";
import Salledattente from "./pages/dashboard/salledattent";
import Paiements from "./pages/dashboard/Paiement";
import RendezVouss from "./pages/dashboard/Rendezvous/ToutRendezVous";

import PatientSelectir from "./pages/dashboard/salledattent/PatientSelector";
import Admin from "./pages/dashboard/admin";
import RequireMedecinSecraitre from "./pages/_helpers/RequireMedecinSecraitre";
import RequireDossierMed from "./pages/_helpers/RequireDossierMed";
import RendezVous from "./pages/dashboard/dossiersmedicaux/rendezVous/rendezvous";
import Antecedent from "./pages/dashboard/dossiersmedicaux/antecedent";
function App() {
  return (
    <>
      <Routes>
        <Route path="/test" element={<PatientSelectir />} />
        <Route path="/*" element={<h1>not found</h1>} />
        <Route path="" element={<Home />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/binvenu" element={<Binvenu />} />

        <Route element={<RequireAuth />}>
          <Route element={<RequireAuthAdimn />}>
            <Route path="admin" element={<Admin />}>
              <Route index element={<Utilisateur />} />
              <Route path="utilisateurs" element={<Utilisateur />} />
              <Route
                path="ajouterutilisateur"
                element={<AjouterUtilisateur />}
              />
              <Route path="service" element={<Service />} />
              <Route path="cabinet" element={<Cabinet />} />
            </Route>
          </Route>

          <Route element={<RequireMedecinSecraitre />}>
            <Route path="/dashboard" element={<Dashboard />}>
              <Route index element={<Patients />} />
              <Route path="patients" element={<Patients />} />
              <Route path="calendrier" element={<Calendrier />} />
              <Route path="paiement" element={<Paiements />} />
              <Route path="rendezvous" element={<RendezVouss />} />

              <Route path="salledattent/" element={<Salledattente />}></Route>

              <Route path="depenses" element={<Depense />} />

              <Route path="dossiersmedicaux" element={<Dossiersmedicaux />} />

              <Route path="dossiersmedicaux/patient" element={<Index />}>
                <Route index element={<Information />} />
                <Route path="information" element={<Information />} />
                <Route path="rendezvous" element={<RendezVous />} />
                <Route path="paiement" element={<Paiement />} />
                <Route element={<RequireDossierMed />}>
                  <Route path="consultaion" element={<Consultation />} />
                  <Route path="antecedent" element={<Antecedent />} />
                  <Route path="certificat" element={<Certificat />} />
                  <Route path="test" element={<TestMedical />} />
                  <Route path="ordonnance" element={<Ordonnance />} />
                  <Route path="bilan" element={<Bilan />} />
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
