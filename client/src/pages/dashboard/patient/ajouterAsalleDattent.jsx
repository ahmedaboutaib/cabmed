import React, { useState } from "react";
import { useCabinetId } from "../../_helpers/Tokin";
import { createSalle } from "../../../utils/apis3";

const AjouterAsalle = ({
  fromsalle,
  changeFormsalle,
  patient,
  changeValidForm,
  setLoading,
}) => {
  const [salle, setSalle] = useState({
    status: "arriver",
    motif: null,
    date: null,
    type: "",
    heureDAR: null,
    situation: null,
    CabinetId: null,
    PatientId: null,
  });
  const heureActuel = () => {
    const now = new Date();
    const hour = now.getHours(); // heures actuelles (0-23)
    const minute = now.getMinutes(); // minutes actuelles (0-59)
    const second = now.getSeconds();
    const heure = `${hour}:${minute}:${second}`;
    return heure;
  };
  const CabinetId = useCabinetId();

  const sbmitSalle = (event) => {
    event.preventDefault();
  };

  const createSalles = async () => {
    try {
      setLoading(true);
      const rsp = await createSalle({
        ...salle,
        CabinetId: CabinetId,
        heureDAR: heureActuel(),
        date: new Date(),
        PatientId: patient.id,
      });
      changeFormsalle();
      setSalle({
        status: "arriver",
        motif: null,
        date: null,
        type: "",
        heureDAR: null,
        situation: null,
        CabinetId: null,
        PatientId: null,
      });
      setTimeout(() => {
        setLoading(false);
        changeValidForm();
      }, 1000);
    } catch (err) {
      console.error("error de creation de salle", err);
    }
  };

  return (
    <>
      {fromsalle && (
        <div className="ajouterrendezvous">
          <div id="popup" className="popup">
            <div className="popup-content">
              <div className="h3">
                <center>
                  <h3>Ajouter à la salle d'attente </h3>
                </center>
              </div>
              <span className="close" onClick={changeFormsalle}>
                &times;
              </span>
              <div className="ajouter-patient">
                <form
                  className=""
                  action=""
                  onSubmit={(event) => sbmitSalle(event)}
                >
                  {/** */}
                  <label>Motif</label>
                  <input
                    type="text"
                    onChange={(event) =>
                      setSalle({
                        ...salle,
                        motif: event.target.value,
                      })
                    }
                  />
                  <label>État de santé</label>
                  <input
                    type="text"
                    onChange={(event) =>
                      setSalle({
                        ...salle,
                        situation: event.target.value,
                      })
                    }
                  />
                  <label htmlFor="type">Type</label>
                  <select
                    onChange={(event) =>
                      setSalle({
                        ...salle,
                        type: event.target.value,
                      })
                    }
                  >
                    <option value="">
                      Selectionner un type de renez vous{" "}
                    </option>
                    <option value="consultaion">Consultaion</option>
                    <option value="contrôle">contrôle</option>
                    <option value="contre visite">contre visite</option>
                  </select>

                  <div className="div-button">
                    <button
                      onClick={() => {
                        createSalles();
                      }}
                      className="btn-v"
                      type="submit"
                    >
                      valider
                    </button>
                    <button
                      onClick={() => {
                        changeFormsalle();
                      }}
                      type="submit"
                      className="btn-a"
                    >
                      annule
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AjouterAsalle;
