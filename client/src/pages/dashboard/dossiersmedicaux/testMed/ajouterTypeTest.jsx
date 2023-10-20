import React, { useEffect, useState } from "react";
import "../../dashbordcss/ajouterType.css";
import { useCabinetId } from "../../../_helpers/Tokin";
import { createTypetest, deleteType } from "../../../../utils/apis3";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const AjouterTypeTest = ({
  changeFormType,
  formType,
  remplirType,
  typee,
  setLoading,
}) => {
  const [type, setType] = useState({});
  //
  const CabinetId = useCabinetId();
  const sbmitType = (event) => {
    event.preventDefault();
    const createType = async () => {
      setLoading(true);
      try {
        if (!CabinetId) {
          return;
        }
        if (type?.titre) {
          const response = await createTypetest({
            ...type,
            CabinetId: CabinetId,
          });
          setType({ titre: "", description: "" });
        }
        remplirType();
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("error creation de Type", error);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };
    createType();
  };
  const deleteTypee = async (id) => {
    try {
      if (!CabinetId) {
        return;
      }
      const response = await deleteType(id);
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
                  <h3>Ajouter Type</h3>
                </center>
              </div>
              <span className="close" onClick={changeFormType}>
                &times;
              </span>

              <form action="" onSubmit={(event) => sbmitType(event)}>
                <label htmlFor=""> Titre</label>
                <input
                  value={type.titre}
                  onChange={(e) => {
                    setType({ ...type, titre: e.target.value });
                  }}
                />

                <label htmlFor="">Description</label>
                <textarea
                  name=""
                  id=""
                  onChange={(e) => {
                    setType({ ...type, description: e.target.value });
                  }}
                  value={type.description}
                ></textarea>

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
                        <th>Titre</th>
                        <th>Description</th>
                        <th colspan="1">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {typee &&
                        typee.map((items) => (
                          <tr>
                            <td>{items.titre}</td>

                            <td>{items.description}</td>

                            <td style={{ textAlign: "center" }}>
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
export default AjouterTypeTest;
