import React, { useEffect, useState } from "react";
import "../../dashbordcss/AjouterExamenPhysique.css";
import { modifierExamenPhysique } from "../../../../utils/apis2";
import { useCabinetId } from "../../../_helpers/Tokin";

const ModifierExamenPhysique = ({
  changeFormEmPhmodifier,
  formEmPhmodifier,
  remplireExPH,
  patientExPh,
  changeValidForm,
  setLoading,
}) => {
  const CabinetId = useCabinetId();
  const [emph, setEmPh] = useState(patientExPh);
  const sbmitEmphModifier = (event) => {
    setLoading(true);
    event.preventDefault();
    const modifierEmPh = async () => {
      try {
        if (!CabinetId) {
          return;
        }
        const response = await modifierExamenPhysique(emph.id, emph);
        changeFormEmPhmodifier();
        remplireExPH();
        setTimeout(() => {
          setLoading(false);
          changeValidForm();
        }, 1000);
      } catch (error) {
        console.error("error creation de examenphysique", error);
      }
    };
    modifierEmPh();
  };
  useEffect(() => {
    setEmPh(patientExPh);
  }, [patientExPh]);

  return (
    <>
      {formEmPhmodifier && (
        <div className="ajouterexamenphysique">
          <div id="popup" class="popup">
            <div class="popup-content">
              <div className="h3">
                <center>
                  <h3>Modifier Examen Physique</h3>
                </center>
              </div>
              <span className="close" onClick={changeFormEmPhmodifier}>
                &times;
              </span>
              <div className="examenph">
                <form action="" onSubmit={(event) => sbmitEmphModifier(event)}>
                  <label>poids</label>
                  <input
                    type="number"
                    onChange={(event) =>
                      setEmPh({ ...emph, poids: event.target.value })
                    }
                    value={emph.poids}
                  />
                  <label>temperature</label>
                  <input
                    type="number"
                    onChange={(event) =>
                      setEmPh({ ...emph, temperature: event.target.value })
                    }
                    value={emph.temperature}
                  />
                  <label htmlFor="">taille</label>
                  <input
                    type="number"
                    onChange={(event) =>
                      setEmPh({ ...emph, taille: event.target.value })
                    }
                    value={emph.taille}
                  />
                  <label htmlFor="">pouls</label>
                  <input
                    type="number"
                    onChange={(event) =>
                      setEmPh({ ...emph, pouls: event.target.value })
                    }
                    value={emph.pouls}
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
                    value={emph.pression_arterielle}
                  />
                  <label htmlFor="">cylcemine</label>
                  <input
                    type="number"
                    onChange={(event) =>
                      setEmPh({ ...emph, clycemine: event.target.value })
                    }
                    value={emph.clycemine}
                  />
                  <label htmlFor="">date</label>
                  <input
                    type="date"
                    onChange={(event) =>
                      setEmPh({ ...emph, dateExPh: event.target.value })
                    }
                    value={emph.dateExPh}
                  />
                  <label htmlFor="">notes</label>
                  <textarea
                    onChange={(event) =>
                      setEmPh({ ...emph, notes: event.target.value })
                    }
                    value={emph.notes}
                    placeholder="Ajoutez des notes ici "
                  ></textarea>
                  <div className="div-button">
                    <button className="btn-v" type="submit">
                      valider
                    </button>
                    <button
                      onClick={changeFormEmPhmodifier}
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
export default ModifierExamenPhysique;
