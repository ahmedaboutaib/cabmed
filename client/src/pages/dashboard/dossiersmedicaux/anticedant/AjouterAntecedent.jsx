import React, { useState } from "react";
import { createAntecedent } from "../../../../utils/apis3";
import { useCabinetId } from "../../../_helpers/Tokin";
import "../../dashbordcss/ajouterconsultation.css";

const AjouterAntecedent = ({
  formantecedent,
  changeFormAntecedent,
  remplirAntecedent,
  id,
  changeValidForm,
  setLoading,
}) => {
  const [antecedent, setAntecedent] = useState({
    id: null,
    nom: null,
    date: new Date(),
    traitement: null,
    desc: null,
    PatientId: null,
  });
  const CabinetId = useCabinetId();
  const sbmitantecedent = (event) => {
    setLoading(true);
    event.preventDefault();
    const createantecedent = async () => {
      const createCons = { ...antecedent, PatientId: id };
      try {
        if (!CabinetId) {
          return;
        }
        const response = await createAntecedent(createCons);
        changeFormAntecedent();
        remplirAntecedent();
        setAntecedent({ date: new Date() });
        setTimeout(() => {
          setLoading(false);
          changeValidForm();
        }, 1000);
      } catch (error) {
        console.error("error creation de examenphysique", error);
      }
    };
    createantecedent();
  };

  return (
    <>
      {formantecedent && (
        <div className="ajouterconsultation">
          <div id="popup" class="popup">
            <div class="popup-content">
              <div className="h3">
                <center>
                  <h3>Ajouter Antecedent</h3>
                </center>
              </div>
              <span className="close" onClick={changeFormAntecedent}>
                &times;
              </span>
              <div className="consult">
                <form action="" onSubmit={(event) => sbmitantecedent(event)}>
                  <label>Nom :</label>
                  <input
                    type="text"
                    onChange={(event) =>
                      setAntecedent({
                        ...antecedent,
                        nom: event.target.value,
                      })
                    }
                  />
                  <label>Date :</label>
                  <input
                    type="date"
                    onChange={(event) =>
                      setAntecedent({
                        ...antecedent,
                        date: event.target.value,
                      })
                    }
                    value={antecedent.dateCon}
                  />
                  <label htmlFor="">Traitement :</label>
                  <input
                    type="text"
                    onChange={(event) =>
                      setAntecedent({
                        ...antecedent,
                        traitement: event.target.value,
                      })
                    }
                  />

                  <label htmlFor="">Description :</label>
                  <textarea
                    onChange={(event) =>
                      setAntecedent({
                        ...antecedent,
                        desc: event.target.value,
                      })
                    }
                    placeholder="Ajoutez des description ici "
                  ></textarea>
                  <div className="div-button">
                    <button className="btn-v" type="submit">
                      valider
                    </button>
                    <button
                      onClick={changeFormAntecedent}
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
export default AjouterAntecedent;
