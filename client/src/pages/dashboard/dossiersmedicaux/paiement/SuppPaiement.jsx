import React from "react";
import { deletePaiement } from "../../../../utils/apis2";
import { useCabinetId } from "../../../_helpers/Tokin";
const SuppPaiement = ({
  fromPaiementSupp,

  changeFormPaiementSupp,
  paiement,
  remplirPaiement,
}) => {
  const CabinetId = useCabinetId();
  const suppPaiement = async () => {
    try {
      if (!CabinetId) {
        return;
      }
      const resp = await deletePaiement(paiement.id);
      remplirPaiement();
      changeFormPaiementSupp();
    } catch (err) {
      console.error("error de supprition ", err);
    }
  };
  return (
    <>
      {fromPaiementSupp && (
        <div id="popup" class="sup-popup">
          <div class="sup-popup-content">
            <span className="sup-close" onClick={changeFormPaiementSupp}>
              &times;
            </span>
            <center>
              {" "}
              <p>Souhaitez-vous supprimer cette paiement</p>
            </center>
            <div className="supprimer">
              <div className="oui">
                <button
                  onClick={() => {
                    suppPaiement();
                  }}
                >
                  oui
                </button>
              </div>
              <div className="non">
                <button onClick={changeFormPaiementSupp}>non</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SuppPaiement;
