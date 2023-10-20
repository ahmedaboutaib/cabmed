import React, { useEffect, useState } from "react";
import "../../dashbordcss/ajouterconsultation.css";
import { chargerResultat } from "../../../../utils/apis2";
import { useCabinetId } from "../../../_helpers/Tokin";

const ChargerResultat = ({
  formBilanCharger,
  changeFormBilanCharger,
  remblirbilan,
  bilan,
  changeValidForm,
  setLoading,
}) => {
  const CabinetId = useCabinetId();
  const handleFileInputChange = (event) => {
    setFiles(event.target.files);
  };
  const [files, setFiles] = useState([]);
  const sbmitBilanCharger = (event) => {
    event.preventDefault();
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
    const ChargerResultats = async () => {
      setLoading(true);
      try {
        if (!CabinetId) {
          return;
        }
        const rsp = await chargerResultat(bilan.id, formData);
        remblirbilan();
        changeFormBilanCharger();
        setFiles([]);
        setTimeout(() => {
          setLoading(false);
          changeValidForm();
        }, 1000);
      } catch (error) {
        console.error("error creation ", error);
      }
    };
    ChargerResultats();
  };

  return (
    <>
      {formBilanCharger && (
        <div className="ajouterconsultation">
          <div id="popup" class="popup">
            <div class="popup-content">
              <span className="close" onClick={changeFormBilanCharger}>
                &times;
              </span>
              <div className="h2">
                <center>
                  <h2>Chargement de resultat de bilan</h2>
                </center>
              </div>
              <div className="consult">
                <form
                  action=""
                  onSubmit={(event) => sbmitBilanCharger(event)}
                  encType="multipart/form-data"
                >
                  <label htmlFor="">Charger les fichiers</label>
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
                      onClick={changeFormBilanCharger}
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
export default ChargerResultat;
