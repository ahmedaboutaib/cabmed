import React, { useState } from "react";
//import "../dashbordcss/ajoutercss.css";
import { createPatient } from "../../../utils/apis";

import { useCabinetId } from "../../_helpers/Tokin";
const Ajouter = ({
  showForm,
  remplir,
  toggleForm,
  setShowForm,
  changeValidForm,
  setLoading,
}) => {
  const CabinetId = useCabinetId();

  const [ajouter, setAjouter] = useState({
    nom: "",
    prenom: "",
    adresse: "",
    tel: "",
    email: "",
    CabinetId: "",
    dateNaissance: null,
    tel2: "",
    genre: 1,
    situationFamiliale: "",
    groupeSanguin: "",
    status: "active",
  });
  const submitform = (event) => {
    event.preventDefault();

    const createPatients = async () => {
      setLoading(true);
      try {
        if (!CabinetId) {
          return;
        }

        const ajouterPatToCab = { ...ajouter, CabinetId: CabinetId };
        const data = await createPatient(ajouterPatToCab);
        setAjouter({
          nom: "",
          prenom: "",
          adresse: "",
          tel: "",
          email: "",
          CabinetId: "",
          dateNaissance: null,
          tel2: "",
          genre: 1,
          situationFamiliale: "",
          groupeSanguin: "",
          profession: "",
          status: "active",
          referenceDossier: "",
        });
        setShowForm(!showForm);
        remplir();
        setTimeout(() => {
          setLoading(false);
          changeValidForm();
        }, 1000);
      } catch (error) {
        console.error("Error loading patients:", error);
        console.log("errrrror :", error);
      }
    };
    createPatients();
  };

  return (
    <>
      {showForm && (
        <div className="ajouter">
          <div id="popup" className="popup">
            <div className="popup-content">
              <div className="h3">
                <center>
                  <h3>Ajouter Patient </h3>
                </center>
              </div>
              <span className="close" onClick={toggleForm}>
                &times;
              </span>

              <div className="ajouter-patient">
                <form onSubmit={(event) => submitform(event)}>
                  <div>
                    <label htmlFor="nom">
                      Nom : <span className="obligatoir">**</span>
                    </label>
                    <input
                      className=""
                      type="text"
                      name="nom"
                      id="nom"
                      onChange={(event) =>
                        setAjouter({ ...ajouter, nom: event.target.value })
                      }
                    />
                    <label className="" htmlFor="nom">
                      Prénom :<span className="obligatoir">**</span>
                    </label>
                    <input
                      className=""
                      type="text"
                      name="prenom"
                      id="nom"
                      onChange={(event) =>
                        setAjouter({ ...ajouter, prenom: event.target.value })
                      }
                    />
                    <label className="" htmlFor="">
                      Reference de Dossier Médical :
                    </label>
                    <input
                      className=""
                      type="text"
                      name="ref"
                      id="ref"
                      onChange={(event) =>
                        setAjouter({
                          ...ajouter,
                          referenceDossier: event.target.value,
                        })
                      }
                    />
                    <label className="" htmlFor="date_naissance">
                      Date de naissance :
                    </label>
                    <input
                      className=""
                      type="date"
                      id="date_naissance"
                      name="date_naissance"
                      onChange={(event) =>
                        setAjouter({
                          ...ajouter,
                          dateNaissance: event.target.value,
                        })
                      }
                    />
                    <label className="">Sexe :</label>
                    <select
                      className=""
                      onChange={(event) =>
                        setAjouter({ ...ajouter, genre: event.target.value })
                      }
                    >
                      {" "}
                      <option value={"Masculin"}>Masculin</option>
                      <option value={"Feminin"}>Féminin</option>
                    </select>
                    <label className=""> Groupe Sanguin :</label>
                    <select
                      className=""
                      onChange={(event) =>
                        setAjouter({
                          ...ajouter,
                          groupeSanguin: event.target.value,
                        })
                      }
                    >
                      <option value="">Sélectionner un groupe sanguin</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>
                  <div>
                    <label className="" htmlFor="email">
                      Email :
                    </label>
                    <input
                      className=""
                      type="text"
                      name="email"
                      id="email"
                      onChange={(event) =>
                        setAjouter({ ...ajouter, email: event.target.value })
                      }
                    />
                    <label className="" htmlFor="adresse">
                      Adresse :
                    </label>
                    <input
                      className=""
                      type="text"
                      name="adresse"
                      onChange={(event) =>
                        setAjouter({ ...ajouter, adresse: event.target.value })
                      }
                    />
                    <label className="" htmlFor="telephone">
                      Téléphone 1:<span className="obligatoir">**</span>
                    </label>
                    <input
                      className=""
                      type="text"
                      name="tel"
                      id="tel"
                      onChange={(event) =>
                        setAjouter({ ...ajouter, tel: event.target.value })
                      }
                    />
                    <label className="" htmlFor="telephone2">
                      Téléphone 2:
                    </label>
                    <input
                      className=""
                      type="text"
                      name="tel2"
                      id="tel2"
                      onChange={(event) =>
                        setAjouter({ ...ajouter, tel2: event.target.value })
                      }
                    />

                    <label className="" htmlFor="profession">
                      Profession :
                    </label>
                    <input
                      className=""
                      type="text"
                      name="profession"
                      id="profession"
                      onChange={(event) =>
                        setAjouter({
                          ...ajouter,
                          profession: event.target.value,
                        })
                      }
                    />
                    <label htmlFor="">Situation familiale :</label>
                    <select
                      className=""
                      onChange={(event) =>
                        setAjouter({
                          ...ajouter,
                          situationFamiliale: event.target.value,
                        })
                      }
                    >
                      <option value="">
                        Sélectionner une situation familiale
                      </option>
                      <option value="Célibataire">Célibataire</option>
                      <option value="Marié(e)">Marié(e)</option>
                      <option value="Divorcé(e)">Divorcé(e)</option>
                      <option value="Veuf/Veuve">Veuf/Veuve</option>
                    </select>
                  </div>
                  <input
                    disabled={
                      !ajouter.nom || !ajouter.prenom || !ajouter.tel
                        ? true
                        : false
                    }
                    className="submit"
                    type="submit"
                    value="Envoyer"
                  />
                  <input
                    className="annule"
                    type="button"
                    value="annule"
                    onClick={toggleForm}
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Ajouter;
