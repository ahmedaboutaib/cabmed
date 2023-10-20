import React from "react";
import "../../dashbordcss/supprimercss.css";
import { deletetestMed } from "../../../../utils/apis2";

const SuppTestMed = ({
  formtestMedsupp,
  changeFormtestMedsupp,
  remplirTestMed,
  id,
}) => {
  const deletetestMeds = async () => {
    try {
      const data = await deletetestMed(id);
      changeFormtestMedsupp();
      remplirTestMed();
    } catch {
      console.error("error delete ", error);
    }
  };
  return (
    <>
      {formtestMedsupp && (
        <div id="popup" class="sup-popup">
          <div class="sup-popup-content">
            <span className="sup-close" onClick={changeFormtestMedsupp}>
              &times;
            </span>
            <p>Souhaitez-vous supprimer ce test medical</p>
            <div className="supprimer">
              <div className="oui">
                <button
                  onClick={() => {
                    deletetestMeds();
                  }}
                >
                  oui
                </button>
              </div>
              <div className="non">
                <button onClick={changeFormtestMedsupp}>non</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default SuppTestMed;
