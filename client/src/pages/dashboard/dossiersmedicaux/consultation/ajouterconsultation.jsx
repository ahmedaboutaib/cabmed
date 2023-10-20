import React, { useState } from "react";
import { createConsultation } from "../../../../utils/apis2";
import { useCabinetId } from "../../../_helpers/Tokin";
import "../../dashbordcss/ajouterconsultation.css";

const AjouterConsultation = ({
  formconsultaion,
  changeFormConsultaion,
  remplirConsultation,
  id,
  changeValidForm,
  setLoading,
}) => {
  const [consultaion, setConsultation] = useState({
    id: null,
    motif: null,
    dateCon: new Date(),
    heureCon: null,
    descriptionCon: null,
    PatientId: null,
  });
  const CabinetId = useCabinetId();

  const sbmitconsultaion = (event) => {
    setLoading(true);
    event.preventDefault();
    const createconsultaion = async () => {
      const createCons = { ...consultaion, PatientId: id };
      try {
        if (!CabinetId) {
          return;
        }
        const response = await createConsultation(createCons);
        changeFormConsultaion();
        remplirConsultation();
        setConsultation({ dateCon: new Date() });
        setTimeout(() => {
          setLoading(false);
          changeValidForm();
        }, 1000);
      } catch (error) {
        console.error("error creation de examenphysique", error);
      }
    };
    createconsultaion();
  };

  return (
    <>
      {formconsultaion && (
        <div className="ajouterconsultation">
          <div id="popup" class="popup">
            <div class="popup-content">
              <div className="h3">
                <center>
                  <h3>Ajouter Consultation</h3>
                </center>
              </div>
              <span className="close" onClick={changeFormConsultaion}>
                &times;
              </span>
              <div className="consult">
                <form action="" onSubmit={(event) => sbmitconsultaion(event)}>
                  <label>Motif :</label>
                  <input
                    type="text"
                    onChange={(event) =>
                      setConsultation({
                        ...consultaion,
                        motif: event.target.value,
                      })
                    }
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
                  <label htmlFor="">Heure :</label>
                  <input
                    type="time"
                    onChange={(event) =>
                      setConsultation({
                        ...consultaion,
                        heureCon: event.target.value,
                      })
                    }
                  />

                  <label htmlFor="">Description :</label>
                  <textarea
                    onChange={(event) =>
                      setConsultation({
                        ...consultaion,
                        descriptionCon: event.target.value,
                      })
                    }
                    placeholder="Ajoutez des description ici "
                  ></textarea>
                  <div className="div-button">
                    <button className="btn-v" type="submit">
                      valider
                    </button>
                    <button
                      onClick={changeFormConsultaion}
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
export default AjouterConsultation;
