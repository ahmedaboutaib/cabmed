import React, { useEffect, useState } from "react";
import "../../dashbordcss/ajouterconsultation.css";
import { updateBilan } from "../../../../utils/apis2";
import { useCabinetId } from "../../../_helpers/Tokin";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const ModifierBilan = ({
  formBilanMod,
  changeFormBilanMod,
  typebilan,
  remblirbilan,
  bilan,
  setBilan,
  changeFormType,
  changeValidForm,
}) => {
  const CabinetId = useCabinetId();
  const handleFileInputChange = (event) => {
    setFiles(event.target.files);
  };
  const [files, setFiles] = useState([]);
  const sbmitBilan = (event) => {
    event.preventDefault();
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    formData.append("dateBIlan", bilan.dateBilan);
    formData.append("observation", bilan.observation);
    formData.append("TypeBilanId", bilan.TypeBilanId);
    const updateBilans = async () => {
      try {
        if (!CabinetId) {
          return;
        }
        const rsp = await updateBilan(bilan.id, formData);
        remblirbilan();
        changeFormBilanMod();
        setFiles([]);
        changeValidForm();
      } catch (error) {
        console.error("error creation ", error);
      }
    };
    updateBilans();
  };

  return (
    <>
      {formBilanMod && (
        <div className="ajouterconsultation">
          <div id="popup" class="popup">
            <div class="popup-content">
              <div className="h3">
                <center>
                  <h3>Modifier Bialn</h3>
                </center>
              </div>
              <span className="close" onClick={changeFormBilanMod}>
                &times;
              </span>
              <div className="consult">
                <form
                  encType="multipart/form-data"
                  action=""
                  onSubmit={(event) => sbmitBilan(event)}
                >
                  <label htmlFor="">
                    <div className="nouveau-labl">
                      <div className="labl">
                        {" "}
                        Veuillez sélectionner le type de bilan souhaité :
                        <span className="obligatoir">**</span>{" "}
                      </div>

                      <div className="nouveau">
                        <p
                          onClick={() => {
                            changeFormType();
                          }}
                        >
                          Ajouter Type
                        </p>
                      </div>
                    </div>
                  </label>
                  <select
                    value={bilan.TypeBilanId}
                    onChange={(e) => {
                      setBilan({ ...bilan, TypeBilanId: e.target.value });
                    }}
                    name=""
                    id=""
                  >
                    {typebilan.map((items) => (
                      <option value={items.id}>{items.titre}</option>
                    ))}
                  </select>

                  <label htmlFor="">date</label>
                  <input
                    type="date"
                    value={bilan.dateBilan}
                    onChange={(e) => {
                      setBilan({ ...bilan, dateBilan: e.target.value });
                    }}
                  />
                  <label htmlFor="">observation</label>
                  <textarea
                    name=""
                    id=""
                    value={bilan.observation}
                    onChange={(e) => {
                      setBilan({ ...bilan, observation: e.target.value });
                    }}
                  ></textarea>
                  <label htmlFor="">resultat</label>
                  <input
                    onChange={handleFileInputChange}
                    type="file"
                    multiple
                    name="resultat"
                  />

                  <div className="div-button">
                    <button className="btn-v" type="submit">
                      valider
                    </button>
                    <button
                      onClick={changeFormBilanMod}
                      className="btn-n"
                      type="submit"
                    >
                      annule
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default ModifierBilan;
