import React from "react";
import "../../dashbordcss/supprimercss.css";
import { deleteConsultation } from "../../../../utils/apis2";
import { useCabinetId } from "../../../_helpers/Tokin";

const SuppConsultation = ({
  formconsultaionsupp,
  changeFormConsultaionsuppr,
  remplirConsultation,
  id,
}) => {
  const CabinetId = useCabinetId();

  const deletConsultaion = async () => {
    try {
      if (!CabinetId) {
        return;
      }
      const data = await deleteConsultation(id);
      changeFormConsultaionsuppr();
      remplirConsultation();
    } catch {
      console.error("error delete ", error);
    }
  };
  return (
    <>
      {formconsultaionsupp && (
        <div id="popup" class="sup-popup">
          <div class="sup-popup-content">
            <span className="sup-close" onClick={changeFormConsultaionsuppr}>
              &times;
            </span>
            <center>
              {" "}
              <p>Souhaitez-vous supprimer cette consultaion</p>
            </center>
            <div className="supprimer">
              <div className="oui">
                <button
                  onClick={() => {
                    deletConsultaion();
                  }}
                >
                  oui
                </button>
              </div>
              <div className="non">
                <button onClick={changeFormConsultaionsuppr}>non</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default SuppConsultation;
