import React, { useState } from "react";
import "../../dashbordcss/AjouterExamenPhysique.css";
import { creatExamenPhysique } from "../../../../utils/apis2";
import { useCabinetId } from "../../../_helpers/Tokin";

const AjouterExamenPhysique = ({
  changeFormEmPh,
  formEmPh,
  remplireExPH,
  id,
  changeValidForm,
  setLoading,
}) => {
  const [emph, setEmPh] = useState({
    poids: null,
    taille: null,
    dateExPh: new Date(),
    temperature: null,
    pouls: null,
    pression_arterielle: null,
    clycemine: null,
    notes: null,
    PatientId: id,
  });
  const CabinetId = useCabinetId();
  const sbmitEmph = (event) => {
    setLoading(true);
    event.preventDefault();
    const createEmPh = async () => {
      const updatedEmph = { ...emph, PatientId: id };
      try {
        if (!CabinetId) {
          return;
        }
        const response = await creatExamenPhysique(updatedEmph);
        changeFormEmPh();
        remplireExPH();
        setTimeout(() => {
          setLoading(false);
          changeValidForm();
        }, 1000);
      } catch (error) {
        console.error("error creation de examenphysique", error);
      }
    };
    createEmPh();
  };

  return (
    <>
      {formEmPh && (
        <div className="ajouterexamenphysique">
          <div id="popup" class="popup">
            <div class="popup-content">
              <span className="close" onClick={changeFormEmPh}>
                &times;
              </span>
              <div className="h3">
                <center>
                  <h3>Ajouter Examen Physique</h3>
                </center>
              </div>

              <div className="examenph">
                <form action="" onSubmit={(event) => sbmitEmph(event)}>
                  <label>poids</label>
                  <input
                    type="number"
                    onChange={(event) =>
                      setEmPh({ ...emph, poids: event.target.value })
                    }
                  />
                  <label>temperature</label>
                  <input
                    type="number"
                    onChange={(event) =>
                      setEmPh({ ...emph, temperature: event.target.value })
                    }
                  />
                  <label htmlFor="">taille</label>
                  <input
                    type="number"
                    onChange={(event) =>
                      setEmPh({ ...emph, taille: event.target.value })
                    }
                  />
                  <label htmlFor="">pouls</label>
                  <input
                    type="number"
                    onChange={(event) =>
                      setEmPh({ ...emph, pouls: event.target.value })
                    }
                  />
                  <label htmlFor="">pression arterielle</label>
                  <input
                    type="number"
                    onChange={(event) =>
                      setEmPh({
                        ...emph,
                        pression_arterielle: event.target.value,
                      })
                    }
                  />
                  <label htmlFor="">cylcemine</label>
                  <input
                    type="number"
                    onChange={(event) =>
                      setEmPh({ ...emph, clycemine: event.target.value })
                    }
                  />
                  <label htmlFor="">date</label>
                  <input
                    type="date"
                    onChange={(event) =>
                      setEmPh({ ...emph, dateExPh: event.target.value })
                    }
                  />
                  <label htmlFor="">notes</label>
                  <textarea
                    onChange={(event) =>
                      setEmPh({ ...emph, notes: event.target.value })
                    }
                    placeholder="Ajoutez des notes ici "
                  ></textarea>
                  <div className="div-button">
                    <button className="btn-v" type="submit">
                      valider
                    </button>
                    <button
                      onClick={changeFormEmPh}
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
export default AjouterExamenPhysique;
