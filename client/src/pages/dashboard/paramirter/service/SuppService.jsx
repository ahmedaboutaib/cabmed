import React from "react";
import { useCabinetId } from "../../../_helpers/Tokin";
import { deleteService } from "../../../../utils/apis2";

const SuppService = ({
  changeFormSrvSupp,
  formSrvSupp,
  service,
  remplirService,
}) => {
  const CabinetId = useCabinetId();
  const deleteSrv = async () => {
    try {
      if (!CabinetId) {
        return;
      }
      const resp = await deleteService(service.id);
      remplirService();
      changeFormSrvSupp();
    } catch (err) {
      console.error("error de supprition de srrvice", err);
    }
  };
  return (
    <>
      {" "}
      {formSrvSupp && (
        <div id="popup" class="sup-popup">
          <div class="sup-popup-content">
            <span className="sup-close" onClick={changeFormSrvSupp}>
              &times;
            </span>
            <p>Souhaitez-vous supprimer ce service </p>
            <div className="supprimer">
              <div className="oui">
                <button
                  onClick={() => {
                    deleteSrv();
                    changeFormSrvSupp();
                  }}
                >
                  oui
                </button>
              </div>
              <div className="non">
                <button onClick={changeFormSrvSupp}>non</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SuppService;
