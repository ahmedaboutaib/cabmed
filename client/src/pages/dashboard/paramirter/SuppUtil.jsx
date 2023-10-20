import React from "react";
import { deleteUser } from "../../../utils/creationCabMedAdmin";
import { useCabinetId } from "../../_helpers/Tokin";

const SuppUtil = ({ changeFormUtilSupp, formUtilSupp, user, remplireUser }) => {
  const CabinetId = useCabinetId();

  const deleteUtil = async () => {
    try {
      if (!CabinetId) {
        return;
      }

      const response = await deleteUser(user.id);
      remplireUser();
    } catch (err) {
      console.error("error fetch uesrs", err);
    }
  };

  return (
    <>
      {" "}
      {formUtilSupp && (
        <div id="popup" class="sup-popup">
          <div class="sup-popup-content">
            <span className="sup-close" onClick={changeFormUtilSupp}>
              &times;
            </span>
            <center>
              {" "}
              <p>Souhaitez-vous supprimer le patient nommé {user.nom || ""} </p>
            </center>
            <div className="supprimer">
              <div className="oui">
                <button
                  onClick={() => {
                    deleteUtil();
                    changeFormUtilSupp();
                  }}
                >
                  oui
                </button>
              </div>
              <div className="non">
                <button onClick={changeFormUtilSupp}>non</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SuppUtil;
