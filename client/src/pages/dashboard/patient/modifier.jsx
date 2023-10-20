import React, { useState } from "react";
//import "../dashbordcss/ajoutercss.css";
import { updatePatient } from "../../../utils/apis";
import { useCabinetId } from "../../_helpers/Tokin";
const Modifier = ({
  modForm,
  modifier,
  setModifier,
  changeModForm,
  remplir,
  changeValidForm,
  setLoading,
}) => {
  const CabinetId = useCabinetId();
  const subimtmodfierform = (event) => {
    setLoading(true);
    event.preventDefault();
    const modifierpatient = async () => {
      try {
        if (!CabinetId) {
          return;
        }
        const data = await updatePatient(modifier.id, modifier);
        changeModForm();
        setTimeout(() => {
          remplir();
          setLoading(false);
          changeValidForm();
        }, 1000);
      } catch {
        console.error("error update", error);
      }
    };
    modifierpatient();
  };
  return (
    <>
      {modForm && (
        <div className="ajouter">
          {/**modifier */}
          <div id="popup" className="popup">
            <div className="popup-content">
              <div className="h3">
                <center>
                  <h3>Modifier les informations du Patient </h3>
                </center>
              </div>
              <span className="close" onClick={changeModForm}>
                &times;
              </span>

              <div className="ajouter-patient">
                <div>
                  <form onSubmit={(event) => subimtmodfierform(event)}>
                    <div>
                      {" "}
                      <label className="">
                        Nom :<span className="obligatoir">**</span>
                      </label>
                      <input
                        className=""
                        type="text"
                        name="nom"
                        id="nom"
                        onChange={(event) =>
                          setModifier({ ...modifier, nom: event.target.value })
                        }
                        value={modifier?.nom || ""}
                      />
                      <label className="">
                        Prénom :<span className="obligatoir">**</span>
                      </label>
                      <input
                        className=""
                        type="text"
                        name="prenom"
                        id="nom"
                        onChange={(event) =>
                          setModifier({
                            ...modifier,
                            prenom: event.target.value,
                          })
                        }
                        value={modifier?.prenom || ""}
                      />
                      <label className="" htmlFor="nom">
                        Reference de Dossier Médical :
                      </label>
                      <input
                        className=""
                        type="text"
                        name="prenom"
                        id="nom"
                        onChange={(event) =>
                          setModifier({
                            ...modifier,
                            referenceDossier: event.target.value,
                          })
                        }
                        value={modifier?.referenceDossier || ""}
                      />
                      <label className="">Date de naissance :</label>
                      <input
                        className=""
                        type="date"
                        id="date_naissance"
                        name="date_naissance"
                        onChange={(event) =>
                          setModifier({
                            ...modifier,
                            dateNaissance: event.target.value,
                          })
                        }
                        value={modifier?.dateNaissance || ""}
                      />
                      <label className="">Sexe :</label>
                      <select
                        className=""
                        onChange={(event) =>
                          setModifier({
                            ...modifier,
                            genre: event.target.value,
                          })
                        }
                        value={modifier?.genre || ""}
                      >
                        <option value="">Sélectionner un genre</option>
                        <option value="Masculin">Masculin</option>
                        <option value="Feminin">Féminin</option>
                      </select>
                      <label className=""> Groupe Sanguin :</label>
                      <select
                        className=""
                        onChange={(event) =>
                          setModifier({
                            ...modifier,
                            groupeSanguin: event.target.value,
                          })
                        }
                        value={modifier?.groupeSanguin || ""}
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
                          setModifier({
                            ...modifier,
                            email: event.target.value,
                          })
                        }
                        value={modifier?.email || ""}
                      />
                      <label className="" htmlFor="adresse">
                        Adresse :
                      </label>
                      <input
                        className=""
                        type="text"
                        name="adresse"
                        id="adresse"
                        onChange={(event) =>
                          setModifier({
                            ...modifier,
                            adresse: event.target.value,
                          })
                        }
                        value={modifier?.adresse || ""}
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
                          setModifier({ ...modifier, tel: event.target.value })
                        }
                        value={modifier?.tel || ""}
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
                          setModifier({ ...modifier, tel2: event.target.value })
                        }
                        value={modifier?.tel2 || ""}
                      />

                      <label className="aj-rv-lb" htmlFor="profession">
                        Profession :
                      </label>
                      <input
                        className=""
                        type="text"
                        name="profession"
                        id="profession"
                        onChange={(event) =>
                          setModifier({
                            ...modifier,
                            profession: event.target.value,
                          })
                        }
                        value={modifier?.profession || ""}
                      />
                      <label htmlFor="">Situation familiale :</label>
                      <select
                        className=""
                        onChange={(event) =>
                          setModifier({
                            ...modifier,
                            situationFamiliale: event.target.value,
                          })
                        }
                        value={modifier?.situationFamiliale || ""}
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
                        !modifier.nom || !modifier.prenom || !modifier.tel
                          ? true
                          : false
                      }
                      className="submit"
                      type="submit"
                      value="Envoyer"
                    />

                    <input
                      className="annule"
                      value="Annulé"
                      onClick={changeModForm}
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Modifier;
