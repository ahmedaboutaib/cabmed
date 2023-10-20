import React, { useEffect, useState } from "react";
import "../../dashbordcss/ajouterType.css";
import { useCabinetId } from "../../../_helpers/Tokin";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { createMedicament, deleteMedicament } from "../../../../utils/apis2";

const Medicament = ({ changeFormType, formType, remplirType, typee }) => {
  const [type, setType] = useState({});

  //

  const CabinetId = useCabinetId();
  const sbmitType = (event) => {
    event.preventDefault();

    const createType = async () => {
      try {
        if (!CabinetId) {
          return;
        }
        if (type?.nom) {
          const response = await createMedicament({
            ...type,
            CabinetId: CabinetId,
          });
          setType({ nom: "" });
        }
        remplirType();
      } catch (error) {
        console.error("error creation de Type", error);
      }
    };
    createType();
  };
  const deleteTypee = async (id) => {
    try {
      if (!CabinetId) {
        return;
      }
      const response = await deleteMedicament(id);
      remplirType();
    } catch (error) {
      console.error("error delete  Type", error);
    }
  };

  return (
    <>
      {formType && (
        <div className="ajouterType">
          <div id="popup" className="popup">
            <div className="popup-content">
              <div className="h3">
                <center>
                  <h3>Ajouter Medicament</h3>
                </center>
              </div>
              <span className="close" onClick={changeFormType}>
                &times;
              </span>

              <form action="" onSubmit={(event) => sbmitType(event)}>
                <label htmlFor=""> Nom De Medicament :</label>
                <input
                  value={type.nom}
                  onChange={(e) => {
                    setType({ ...type, nom: e.target.value });
                  }}
                />

                <div className="div-button">
                  <button className="btn-v submit" type="submit">
                    Ajouter
                  </button>
                </div>
              </form>
              <div className="table-type">
                <div className="table">
                  <table>
                    <thead>
                      <tr>
                        <th>nom</th>

                        <th colspan="1">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {typee &&
                        typee.map((items) => (
                          <tr>
                            <td>{items.nom}</td>

                            <td>
                              <button
                                onClick={() => {
                                  deleteTypee(items.id);
                                }}
                              >
                                <FontAwesomeIcon
                                  className="supp"
                                  icon={faTrash}
                                />
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Medicament;
