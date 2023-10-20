import React from "react";
import "../dashbordcss/supprimercss.css";
import { updateStatusPatient } from "../../../utils/apis";
import { useCabinetId } from "../../_helpers/Tokin";
const Supprimer = ({ suppForm, changeSuppForm, patienId, remplir }) => {
  const CabinetId = useCabinetId();
  const deleletPat = async () => {
    try {
      if (!CabinetId) {
        return;
      }
      const data = await updateStatusPatient(patienId.id);
      remplir();
    } catch {
      console.error("error delete ", error);
    }
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
              <p>
                Souhaitez-vous supprimer le patient nommé {patienId.nom || ""}{" "}
                {patienId.prenom || ""}?
              </p>
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
export default Supprimer;
