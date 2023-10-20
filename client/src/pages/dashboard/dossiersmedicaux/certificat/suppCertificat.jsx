import React from "react";
import "../../dashbordcss/supprimercss.css";
import { deletCertificat } from "../../../../utils/apis2";
import { useCabinetId } from "../../../_helpers/Tokin";

const SuppCertificat = ({
  formcertificatsupp,
  changeFormCertificatsupp,
  remplirCertificat,
  id,
}) => {
  const CabinetId = useCabinetId();

  const deletCertificats = async () => {
    try {
      if (!CabinetId) {
        return;
      }
      const data = await deletCertificat(id);
      changeFormCertificatsupp();
      remplirCertificat();
    } catch {
      console.error("error delete ", error);
    }
  };
  return (
    <>
      {formcertificatsupp && (
        <div id="popup" class="sup-popup">
          <div class="sup-popup-content">
            <span className="sup-close" onClick={changeFormCertificatsupp}>
              &times;
            </span>
            <p>Souhaitez-vous supprimer cette certificat</p>
            <div className="supprimer">
              <div className="oui">
                <button
                  onClick={() => {
                    deletCertificats();
                  }}
                >
                  oui
                </button>
              </div>
              <div className="non">
                <button onClick={changeFormCertificatsupp}>non</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default SuppCertificat;
