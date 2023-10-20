import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
//  <RouterProvider router={router} />
/**
 * 
 * import Home from "./pages/acceuil";
import Dashboard from "./pages/dashboard/dashboard";
import Parametres from "./pages/dashboard/parametes";
import Patients from "./pages/dashboard/patients";
//import RendezVous from "./pages/dashboard/rendezvous";
import RendezVous from "./pages/dashboard/rendezvous";
import Test from "./pages/dashboard/test";
import Depenses from "./pages/dashboard/depenses/index";
import Connexion from "./pages/auth/connexion";
import Inscription from "./pages/auth/inscription";
import PrivateRoutes from "./utils/privateRoutes";
import Login from "./pages/auth/login";
import Dossiersmedicaux from "./pages/dashboard/dossierMedicaux";
import Index from "./pages/dashboard/dossiersmedicaux";
import Information from "./pages/dashboard/dossiersmedicaux/information";
import Consultation from "./pages/dashboard/dossiersmedicaux/Consultation";
import Paiement from "./pages/dashboard/dossiersmedicaux/paiement";
import Ordonnance from "./pages/dashboard/dossiersmedicaux/ordonnance";
import TestMedical from "./pages/dashboard/dossiersmedicaux/testmedical";
import Certificat from "./pages/dashboard/dossiersmedicaux/certificat";

 * 
 * 
 * const router = createBrowserRouter([
  {
    path: "/accueil",
    element: <Home />,
  },
  {
    path: "/connexion",
    element: <Connexion />,
  },

  {
    path: "/inscription",
    element: <Inscription />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    element: <PrivateRoutes />,
    children: [
      // enfants
      {
        path: "/dashboard",
        element: <Dashboard />,
        children: [
          {
            path: "parametres",
            element: <Parametres />,
          },
          {
            path: "patients",
            element: <Patients />,
          },
          {
            path: "test",
            element: <Test />,
          },
          {
            path: "rendezvous",
            element: <RendezVous />,
          },
          {
            path: "depenses",
            element: <Depenses />,
          },
          {
            path: "dossiersmedicaux",
            element: <Dossiersmedicaux />,
          },
          {
            path: "patients/dossiersmedicaux",
            element: <Index />,
            children: [
              {
                path: "information",
                element: <Information />,
              },
              {
                path: "consultaion",
                element: <Consultation />,
              },
              {
                path: "paiement",
                element: <Paiement />,
              },
              {
                path: "ordonnance",
                element: <Ordonnance />,
              },
              {
                path: "test",
                element: <TestMedical />,
              },

              {
                path: "certificat",
                element: <Certificat />,
              },
            ],
          },
          {
            path: "dossiersmedicaux/patient",
            element: <Index />,
            children: [
              {
                path: "information",
                element: <Information />,
              },
              {
                path: "consultaion",
                element: <Consultation />,
              },
              {
                path: "paiement",
                element: <Paiement />,
              },
              {
                path: "ordonnance",
                element: <Ordonnance />,
              },
              {
                path: "test",
                element: <TestMedical />,
              },

              {
                path: "certificat",
                element: <Certificat />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
 */
