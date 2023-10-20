import React, { useState, useEffect } from "react";

import { modifierConsultation } from "../../../../utils/apis2";
import { useCabinetId } from "../../../_helpers/Tokin";

const ModifierConsultation = ({
  formconsultaionmodifier,
  changeFormConsultaionmodifier,
  remplirConsultation,
  consultaion,
  setConsultation,
  changeValidForm,
  setLoading,
}) => {
  const CabinetId = useCabinetId();

  const sbmitconsultaionmodifier = (event) => {
    setLoading(true);
    event.preventDefault();
    const modifierconsultaion = async () => {
      try {
        if (!CabinetId) {
          return;
        }
        const response = await modifierConsultation(consultaion);
        changeFormConsultaionmodifier();
        remplirConsultation();
        setConsultation({
          id: null,
          motif: null,
          dateCon: null,
          heureCon: null,
          descriptionCon: null,
          PatientId: null,
        });
        setTimeout(() => {
          setLoading(false);
          changeValidForm();
        }, 1000);
      } catch (error) {
        console.error("error creation de examenphysique", error);
      }
    };
    modifierconsultaion();
  };

  return (
    <>
      {formconsultaionmodifier && (
        <div className="ajouterconsultation">
          <div id="popup" class="popup">
            <div class="popup-content">
              <div className="h3">
                <center>
                  <h3>Modifier Consultaion </h3>
                </center>
              </div>
              <span className="close" onClick={changeFormConsultaionmodifier}>
                &times;
              </span>
              <div className="consult">
                <form
                  action=""
                  onSubmit={(event) => sbmitconsultaionmodifier(event)}
                >
                  <label> Mtif :</label>
                  <input
                    type="text"
                    onChange={(event) =>
                      setConsultation({
                        ...consultaion,
                        motif: event.target.value,
                      })
                    }
                    value={consultaion.motif}
                  />
                  <label>Date :</label>
                  <input
                    type="date"
                    onChange={(event) =>
                      setConsultation({
                        ...consultaion,
                        dateCon: event.target.value,
                      })
                    }
                    value={consultaion.dateCon}
                  />
                  <label htmlFor="">Heure : </label>
                  <input
                    type="time"
                    onChange={(event) =>
                      setConsultation({
                        ...consultaion,
                        heureCon: event.target.value,
                      })
                    }
                    value={consultaion.heureCon}
                  />

                  <label htmlFor="">Description :</label>
                  <textarea
                    onChange={(event) =>
                      setConsultation({
                        ...consultaion,
                        descriptionCon: event.target.value,
                      })
                    }
                    value={consultaion.descriptionCon}
                    placeholder="Ajoutez des description ici "
                  ></textarea>
                  <div className="div-button">
                    <button className="btn-v" type="submit">
                      valider
                    </button>
                    <button
                      onClick={changeFormConsultaionmodifier}
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
export default ModifierConsultation;
