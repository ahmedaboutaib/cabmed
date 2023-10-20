import React, { useState } from "react";
import { useCabinetId } from "../../_helpers/Tokin";
import { updateSalle } from "../../../utils/apis3";

const ModifierSalle = ({
  fromsalleMod,
  changeFormsalleMod,
  patients,
  salle,
  remplirSalle,
  setSalle,
  changeValidForm,
  setLoading,
}) => {
  const CabinetId = useCabinetId();

  const sbmitSalle = (event) => {
    event.preventDefault();
    setLoading(true);
    if (!CabinetId) {
      return;
    }
    const updateSalles = async () => {
      try {
        const rsp = await updateSalle(salle);
        changeFormsalleMod();
        remplirSalle();
        setTimeout(() => {
          setLoading(false);
          changeValidForm();
        }, 1000);
      } catch (err) {
        console.error("error de update de salle", err);
      }
    };
    updateSalles();
  };

  return (
    <>
      {fromsalleMod && (
        <div className="ajouterAsalle">
          <div className="">
            <div id="popup" class="popup">
              <div class="popup-content">
                <div className="h3">
                  <center>
                    <h3>Modifier</h3>
                  </center>
                </div>
                <span className="close" onClick={changeFormsalleMod}>
                  &times;
                </span>
                <div className="ajouter-sal">
                  <form action="" onSubmit={(event) => sbmitSalle(event)}>
                    <label>
                      Patient : <span className="obligatoir">**</span>
                    </label>

                    <select
                      onChange={(event) =>
                        setSalle({
                          ...salle,
                          PatientId: event.target.value,
                        })
                      }
                      value={salle.PatientId}
                    >
                      <option value="">Sélectionnez un patient</option>
                      {patients.map((patient) => (
                        <option key={patient.id} value={patient.id}>
                          {patient.nom} {patient.prenom}
                        </option>
                      ))}
                    </select>

                    <label>Motif :</label>
                    <input
                      type="text"
                      onChange={(event) =>
                        setSalle({
                          ...salle,
                          motif: event.target.value,
                        })
                      }
                      value={salle.motif}
                    />
                    <label>Date :</label>
                    <input
                      type="date"
                      onChange={(event) =>
                        setSalle({
                          ...salle,
                          date: event.target.value,
                        })
                      }
                      value={salle.date}
                    />
                    <label>Heure d'arriver : </label>
                    <input
                      type="time"
                      onChange={(event) =>
                        setSalle({
                          ...salle,
                          heureDAR: event.target.value,
                        })
                      }
                      value={salle.heureDAR}
                    />
                    <label>Situation :</label>
                    <input
                      type="text"
                      onChange={(event) =>
                        setSalle({
                          ...salle,
                          situation: event.target.value,
                        })
                      }
                      value={salle.situation}
                    />
                    <label for="type">Type :</label>
                    <select
                      onChange={(event) =>
                        setSalle({
                          ...salle,
                          type: event.target.value,
                        })
                      }
                      value={salle.type}
                    >
                      <option value="">selectionner un type</option>
                      <option value="consultaion">Consultaion</option>
                      <option value="contrôle">contrôle</option>
                      <option value="contre visite">contre visite</option>
                    </select>

                    <div className="div-button">
                      <button
                        disabled={!salle.PatientId ? true : false}
                        className="btn-v"
                        type="submit"
                      >
                        valider
                      </button>
                      <button
                        onClick={changeFormsalleMod}
                        className="btn-n"
                        type="submit"
                      >
                        annule
                      </button>
                    </div>
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

export default ModifierSalle;
