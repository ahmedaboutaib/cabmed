import React, { useEffect, useState } from "react";
import "../../dashbordcss/ajouterconsultation.css";
import { updatecertificat } from "../../../../utils/apis2";
import { useCabinetId } from "../../../_helpers/Tokin";

const ModifierCertificat = ({
  formcertificatMod,
  changeFormCertificatMod,
  remplirCertificat,
  certificat,
  setCertificat,
  changeValidForm,
  setLoading,
}) => {
  const CabinetId = useCabinetId();
  const sbmitcertificatMod = (event) => {
    setLoading(true);
    event.preventDefault();
    const updatecertificats = async () => {
      try {
        if (!CabinetId) {
          return;
        }
        const response = await updatecertificat(certificat);
        changeFormCertificatMod();
        remplirCertificat();

        setTimeout(() => {
          setLoading(false);
          changeValidForm();
        }, 1000);
      } catch (error) {
        console.error("error creation de certificat", error);
      }
    };
    updatecertificats();
  };

  return (
    <>
      {formcertificatMod && (
        <div className="ajouterconsultation">
          <div id="popup" class="popup">
            <div class="popup-content">
              <span className="close" onClick={changeFormCertificatMod}>
                &times;
              </span>
              <div className="h3">
                <h3>
                  <center>Modifier Certificat</center>
                </h3>
              </div>
              <div className="consult">
                <form action="" onSubmit={(event) => sbmitcertificatMod(event)}>
                  <label htmlFor="">
                    {" "}
                    Choiser Type : <span className="obligatoir">**</span>{" "}
                  </label>
                  <select
                    onChange={(event) =>
                      setCertificat({
                        ...certificat,
                        type: event.target.value,
                      })
                    }
                    name=""
                    id=""
                    value={certificat.type}
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
                    Date Debut / Reprise :{" "}
                    <span className="obligatoir">**</span>{" "}
                  </label>
                  <input
                    type="date"
                    onChange={(event) =>
                      setCertificat({
                        ...certificat,
                        dateDub: event.target.value,
                      })
                    }
                    value={certificat.dateDub}
                  />

                  <label htmlFor="">
                    Nombre Jours/Semaine :{" "}
                    <span className="obligatoir">**</span>
                  </label>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <input
                      type="number"
                      onChange={(event) =>
                        setCertificat({
                          ...certificat,
                          nombre: event.target.value,
                        })
                      }
                      value={certificat.nombre}
                    />
                    <select
                      onChange={(event) =>
                        setCertificat({
                          ...certificat,
                          typeTemps: event.target.value,
                        })
                      }
                      name=""
                      id=""
                      value={certificat.typeTemps}
                    >
                      <option value="jours">jours</option>
                      <option value="semaines">semaines</option>
                    </select>
                  </div>

                  <div className="div-button">
                    <button className="btn-v" type="submit">
                      valider
                    </button>
                    <button
                      onClick={changeFormCertificatMod}
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
      )}
    </>
  );
};
export default ModifierCertificat;
