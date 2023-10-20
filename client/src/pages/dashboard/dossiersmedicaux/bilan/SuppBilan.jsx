import React from "react";
import "../../dashbordcss/supprimercss.css";
import { deleteBilan } from "../../../../utils/apis2";
import { useCabinetId } from "../../../_helpers/Tokin";

const SuppBilan = ({
  formBilanSupp,
  remblirbilan,
  changeFormBilanSupp,
  bilan,
}) => {
  const CabinetId = useCabinetId();
  const deleteBilans = async () => {
    try {
      if (!CabinetId) {
        return;
      }
      const data = await deleteBilan(bilan.id);
      changeFormBilanSupp();
      remblirbilan();
    } catch (error) {
      console.error("error delete ", error);
    }
  };
  return (
    <>
      {formBilanSupp && (
        <div id="popup" class="sup-popup">
          <div class="sup-popup-content">
            <span className="sup-close" onClick={changeFormBilanSupp}>
              &times;
            </span>
            <center>
              {" "}
              <p>Souhaitez-vous supprimer cette Bilan</p>
            </center>
            <div className="supprimer">
              <div className="oui">
                <button
                  onClick={() => {
                    deleteBilans();
                  }}
                >
                  oui
                </button>
              </div>
              <div className="non">
                <button onClick={changeFormBilanSupp}>non</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default SuppBilan;
