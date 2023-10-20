import React, { useState } from "react";
import "../../dashbordcss/ajouterconsultation.css";
import { createcertificat } from "../../../../utils/apis2";
import { useCabinetId } from "../../../_helpers/Tokin";

const AjouterCertificat = ({
  formcertificat,
  changeFormCertificat,
  remplirCertificat,
  id,
  changeValidForm,
  setLoading,
}) => {
  const [certificat, setcertificat] = useState({
    dateDub: null,
    type: null,
    PatientId: null,
    nombre: null,
    typeTemps: "jours",
  });
  const CabinetId = useCabinetId();

  const sbmitcertificat = (event) => {
    setLoading(true);
    event.preventDefault();
    const createcertificats = async () => {
      const createCert = {
        ...certificat,
        PatientId: JSON.parse(localStorage.getItem("patient")).id,
      };
      try {
        if (!CabinetId) {
          return;
        }
        const response = await createcertificat(createCert);
        changeFormCertificat();
        remplirCertificat();
        setcertificat({
          dateDub: null,
          type: null,
          PatientId: null,
          nombre: null,
          typeTemps: "jours",
        });
        setTimeout(() => {
          setLoading(false);
          changeValidForm();
        }, 1000);
      } catch (error) {
        console.error("error creation de certificat", error);
      }
    };
    createcertificats();
  };

  return (
    <>
      {formcertificat && (
        <div className="ajouterconsultation">
          <div id="popup" class="popup">
            <div class="popup-content">
              <div className="h3">
                <h3>
                  <center>Ajouter Certificat</center>
                </h3>
              </div>
              <span className="close" onClick={changeFormCertificat}>
                &times;
              </span>
              <div className="consult">
                <form action="" onSubmit={(event) => sbmitcertificat(event)}>
                  <label htmlFor="">
                    {" "}
                    Choiser Type : <span className="obligatoir">**</span>
                  </label>
                  <select
                    onChange={(event) =>
                      setcertificat({
                        ...certificat,
                        type: event.target.value,
                      })
                    }
                    name=""
                    id=""
                  >
                    <option value="">sélectionner un type de certificat</option>
                    <option value="certificat medical d arret de travail">
                      Certificat médical d'arrêt de travail
                    </option>
                    <option value="certificat medical de reprise du travail">
                      Certificat médical de reprise du travail{" "}
                    </option>
                    <option value="certificat medical de non contre-indication a la pratique sportive">
                      Certificat médical de non contre-indication à la pratique
                      sportive
                    </option>
                    <option value="certificat medical pour absence scolaire">
                      Certificat médical pour absence scolaire
                    </option>
                    <option value="certificat medical de grossesse">
                      Certificat médical de grossesse
                    </option>
                  </select>
                  <label>
                    Date Debut / Reprise :<span className="obligatoir">**</span>
                  </label>
                  <input
                    type="date"
                    onChange={(event) =>
                      setcertificat({
                        ...certificat,
                        dateDub: event.target.value,
                      })
                    }
                  />

                  <label htmlFor="">
                    Nombre Jours/Semaine :<span className="obligatoir">**</span>
                  </label>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <input
                      type="number"
                      onChange={(event) =>
                        setcertificat({
                          ...certificat,
                          nombre: event.target.value,
                        })
                      }
                    />
                    <select
                      onChange={(event) =>
                        setcertificat({
                          ...certificat,
                          typeTemps: event.target.value,
                        })
                      }
                      name=""
                      id=""
                    >
                      <option value="jours">jours</option>
                      <option value="semaines">semaines</option>
                    </select>
                  </div>

                  <div className="div-buton">
                    <div className="div-button">
                      <button
                        disabled={
                          !certificat?.type ||
                          !certificat?.nombre ||
                          !certificat?.typeTemps ||
                          !certificat?.dateDub
                            ? true
                            : false
                        }
                        className="btn-v"
                        type="submit"
                      >
                        valider
                      </button>
                      <button
                        onClick={changeFormCertificat}
                        className="btn-n"
                        type="submit"
                      >
                        annule
                      </button>
                    </div>
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
export default AjouterCertificat;
