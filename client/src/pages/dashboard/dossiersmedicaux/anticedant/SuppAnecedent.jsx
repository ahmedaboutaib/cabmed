import React from "react";
import "../../dashbordcss/supprimercss.css";

import { useCabinetId } from "../../../_helpers/Tokin";
import { deleteAntecedent } from "../../../../utils/apis3";

const SuppAnecedent = ({
  formantecedentsupp,
  changeFormAntecedentsuppr,
  remplirAntecedent,
  id,
}) => {
  const CabinetId = useCabinetId();

  const deletAntecedent = async () => {
    try {
      if (!CabinetId) {
        return;
      }
      const data = await deleteAntecedent(id);
      changeFormAntecedentsuppr();
      remplirAntecedent();
    } catch {
      console.error("error delete ", error);
    }
  };
  return (
    <>
      {formantecedentsupp && (
        <div id="popup" class="sup-popup">
          <div class="sup-popup-content">
            <span className="sup-close" onClick={changeFormAntecedentsuppr}>
              &times;
            </span>
            <center>
              {" "}
              <p>Souhaitez-vous supprimer cette antecedent</p>
            </center>
            <div className="supprimer">
              <div className="oui">
                <button
                  onClick={() => {
                    deletAntecedent();
                  }}
                >
                  oui
                </button>
              </div>
              <div className="non">
                <button onClick={changeFormAntecedentsuppr}>non</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default SuppAnecedent;
