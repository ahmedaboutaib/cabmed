import React from "react";

import { deleteSalle, deleterenderVous } from "../../../utils/apis3";
import { useCabinetId } from "../../_helpers/Tokin";
const SppSalle = ({
  fromSuppSalle,
  changeFormSuppSalle,
  salle,
  remplirSalle,
}) => {
  const CabinetId = useCabinetId();
  const suppSalle = async () => {
    try {
      if (!CabinetId) {
        return;
      }
      const resp = await deleteSalle(salle.id);
      changeFormSuppSalle();
      remplirSalle();
    } catch (err) {
      console.error("error de supprition ", err);
    }
  };
  return (
    <>
      {fromSuppSalle && (
        <div id="popup" class="sup-popup">
          <div class="sup-popup-content">
            <span className="sup-close" onClick={changeFormSuppSalle}>
              &times;
            </span>
            <center>
              {" "}
              <p>Souhaitez-vous supprimer ce rendez vous</p>
            </center>
            <div className="supprimer">
              <div className="oui">
                <button
                  onClick={() => {
                    suppSalle();
                  }}
                >
                  oui
                </button>
              </div>
              <div className="non">
                <button onClick={changeFormSuppSalle}>non</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SppSalle;
