import React from "react";

import { deleterenderVous, updateRDV } from "../../../utils/apis3";
import { useCabinetId } from "../../_helpers/Tokin";
const SuppRDV = ({
  fromSuppRDV,
  changeFormSuppRDV,
  rendezvous,
  remplirRDV,
}) => {
  const CabinetId = useCabinetId();
  /*  const suppRDV = async () => {
    try {
      if (!CabinetId) {
        return;
      }
      const resp = await deleterenderVous(rendezvous.id);
      changeFormSuppRDV();
      remplirRDV();
    } catch (err) {
      console.error("error de supprition ", err);
    }
  };*/

  const Update = async (status) => {
    try {
      if (!CabinetId) {
        return;
      }
      const resp = await updateRDV({
        ...rendezvous,
        status: status,
      });
      changeFormSuppRDV();
      remplirRDV();
    } catch (err) {
      console.error("error de supprition ", err);
    }
  };
  return (
    <>
      {fromSuppRDV && (
        <div id="popup" class="sup-popup">
          <div class="sup-popup-content">
            <span className="sup-close" onClick={changeFormSuppRDV}>
              &times;
            </span>
            <center>
              <p>Souhaitez-vous confirmer ou annuler ce rendez vous</p>
            </center>
            <div className="supprimer">
              <div className="oui">
                <button
                  onClick={() => {
                    Update(2);
                  }}
                >
                  confirmer
                </button>
              </div>
              <div className="non">
                <button
                  onClick={() => {
                    Update(3);
                  }}
                >
                  annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SuppRDV;
