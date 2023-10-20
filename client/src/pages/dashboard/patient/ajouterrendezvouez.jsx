import React, { useState } from "react";
import { createRendezVous } from "../../../utils/apis";
import { useCabinetId } from "../../_helpers/Tokin";

const Ajouterrendezvoues = ({
  formRv,
  changeFormRv,
  patienId,
  changeValidForm,
  remplirRDV,
  setLoading,
}) => {
  /// pour ajouter rendez vouez
  const CabinetId = useCabinetId();
  const [rendezvoues, setRendvous] = useState({
    status: 1,
    dateRDV: new Date(),
    PatientId: "",
    details: "",
    heureRDV: "",
    motif: "",
    type: "",
    CabinetId: null,
  });
  // fonction pour arreter submite et charger a la BD
  const onEnregestrerRDV = (event) => {
    setLoading(true);
    event.preventDefault();
    if (!CabinetId) {
      return;
    }
    const createRendez = async () => {
      const uprendez = {
        ...rendezvoues,
        PatientId: patienId.id,
        CabinetId: CabinetId,
      };

      try {
        const data = await createRendezVous(uprendez);
        setRendvous({ dateRDV: new Date(), status: "encour" });
        changeFormRv();

        setTimeout(() => {
          setLoading(false);
          changeValidForm();
          remplirRDV();
        }, 1000);
      } catch (error) {
        console.error("Error loading patients:", error);
      }
    };
    createRendez();
  };

  // ----
  return (
    <>
      {formRv && (
        <div className="ajouterrendezvous">
          <div id="popup" className="popup">
            <div className="popup-content">
              <div className="h3">
                <center>
                  <h3>Ajouter Rendez Vous</h3>
                </center>
              </div>
              <span
                className="close"
                onClick={() => {
                  changeFormRv();
                }}
              >
                &times;
              </span>
              <div>
                <div className="ajouter-patient">
                  <form onSubmit={(event) => onEnregestrerRDV(event)}>
                    <input type="hidden" value={patienId.id} />
                    <div className="">
                      <label htmlFor="date">
                        Date <span className="obligatoir">**</span>
                      </label>
                      <input
                        id="date"
                        type="date"
                        onChange={(event) =>
                          setRendvous({
                            ...rendezvoues,
                            dateRDV: event.target.value,
                          })
                        }
                        placeholder="jj/mm/aaaa"
                        value={rendezvoues.dateRDV}
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="heure">
                        Heure <span className="obligatoir">**</span>
                      </label>
                      <input
                        id="heure"
                        type="time"
                        placeholder="hh:mm"
                        onChange={(event) => {
                          setRendvous({
                            ...rendezvoues,
                            heureRDV: event.target.value,
                          });
                        }}
                        value={rendezvoues.heureRDV}
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="motif">motif</label>
                      <input
                        id="motif"
                        type="text"
                        onChange={(event) => {
                          setRendvous({
                            ...rendezvoues,
                            motif: event.target.value,
                          });
                        }}
                        value={rendezvoues.motif}
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="type">type</label>
                      <select
                        onChange={(event) => {
                          setRendvous({
                            ...rendezvoues,
                            type: event.target.value,
                          });
                        }}
                        value={rendezvoues.type}
                      >
                        <option value="">
                          Selectionner un type de renez vous{" "}
                        </option>
                        <option value="consultaion">Consultaion</option>
                        <option value="contrôle">contrôle</option>
                        <option value="contre visite">contre visite</option>
                      </select>
                    </div>

                    <div className="mb-4">
                      <label htmlFor="details">Détails</label>
                      <textarea
                        id="details"
                        onChange={(event) =>
                          setRendvous({
                            ...rendezvoues,
                            details: event.target.value,
                          })
                        }
                        value={rendezvoues.details}
                        placeholder="Ajoutez des détails ici "
                      ></textarea>
                    </div>
                    <div className="div-button">
                      <button
                        disabled={
                          !rendezvoues.dateRDV || !rendezvoues.heureRDV
                            ? true
                            : false
                        }
                        className="btn-v"
                        type="submit"
                      >
                        {" "}
                        Valider
                      </button>

                      <button
                        className="btn-a"
                        onClick={() => {
                          changeFormRv();
                        }}
                        type="button"
                      >
                        Annuler
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
export default Ajouterrendezvoues;
