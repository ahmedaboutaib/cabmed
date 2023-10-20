import React from "react";
import "..//dashbordcss/supprimercss.css";

import { useCabinetId } from "../../_helpers/Tokin";
import { deleteDepence } from "../../../api/dashboard/depense";

const SuppDepence = ({
  suppForm,
  changeSuppForm,
  depense,
  handleDepenseAdd,
}) => {
  const CabinetId = useCabinetId();
  const deleletPat = async () => {
    try {
      if (!CabinetId) {
        return;
      }
      const data = await deleteDepence(depense.id);
    } catch {
      console.error("error delete ", error);
    }
    handleDepenseAdd();
  };
  return (
    <>
      {suppForm && (
        <div id="popup" class="sup-popup">
          <div class="sup-popup-content">
            <span className="sup-close" onClick={changeSuppForm}>
              &times;
            </span>
            <center>
              {" "}
              <p>Souhaitez-vous supprimer cette depence</p>
            </center>
            <div className="supprimer">
              <div className="oui">
                <button
                  onClick={() => {
                    deleletPat();
                    changeSuppForm();
                  }}
                >
                  oui
                </button>
              </div>
              <div className="non">
                <button onClick={changeSuppForm}>non</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default SuppDepence;
