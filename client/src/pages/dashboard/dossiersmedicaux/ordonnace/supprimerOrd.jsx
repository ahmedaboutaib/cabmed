import React from "react";
import "../../dashbordcss/supprimercss.css";
import { deleteOrdonnance } from "../../../../utils/apis2";
import { useCabinetId } from "../../../_helpers/Tokin";

const SuppOrd = ({ changeFormOrd, fromOrdsupp, remplirOrdannance, id }) => {
  const CabinetId = useCabinetId();
  const deleteOrd = async () => {
    try {
      if (!CabinetId) {
        return;
      }
      const resp = await deleteOrdonnance(id);
      console.log(resp);
      remplirOrdannance();
    } catch (error) {
      console.error("error de supprition  d'ordonnance'", error);
    }
  };
  return (
    <>
      {fromOrdsupp && (
        <div id="popup" class="sup-popup">
          <div class="sup-popup-content">
            <span className="sup-close" onClick={changeFormOrd}>
              &times;
            </span>
            <center>
              <p>Souhaitez-vous supprimer cette ordonnace</p>
            </center>
            <div className="supprimer">
              <div className="oui">
                <button
                  onClick={() => {
                    deleteOrd();
                    changeFormOrd();
                  }}
                >
                  oui
                </button>
              </div>
              <div className="non">
                <button onClick={changeFormOrd}>non</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default SuppOrd;
