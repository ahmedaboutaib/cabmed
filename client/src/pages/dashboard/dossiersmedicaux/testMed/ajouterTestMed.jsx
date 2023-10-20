import React, { useEffect, useState } from "react";
import "../../dashbordcss/ajouterconsultation.css";
import { createTestMed, fetchTypeTest } from "../../../../utils/apis2";
import { useCabinetId } from "../../../_helpers/Tokin";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const AjouterTestMed = ({
  formTestMed,
  changeFormTestMed,
  remplirTestMed,
  typetest,
  id,
  changeFormType,
  changeValidForm,
  setLoading,
}) => {
  const [testMed, setTestMed] = useState({
    id: "",
    dateTest: new Date(),
    desc: "",
    TypeTestId: "",
    resultat: "",
    PatientId: "",
  });

  //
  const CabinetId = useCabinetId();
  const handleFileInputChange = (event) => {
    setFiles(event.target.files);
  };
  const [files, setFiles] = useState([]);
  const sbmitconsultaion = (event) => {
    event.preventDefault();
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
    formData.append("dateTest", testMed.dateTest);
    formData.append("desc", testMed.desc);
    formData.append("TypeTestId", testMed.TypeTestId);
    formData.append(
      "PatientId",
      JSON.parse(localStorage.getItem("patient")).id
    );
    const createTestMeds = async () => {
      setLoading(true);
      try {
        if (!CabinetId) {
          return;
        }
        const response = await createTestMed(formData);
        remplirTestMed();
        changeFormTestMed();
        setTestMed({
          id: null,
          dateTest: new Date(),
          desc: null,
          TypeTestId: null,
          PatientId: null,
        });
        setFiles([]);
        setTimeout(() => {
          setLoading(false);
          changeValidForm();
        }, 1000);
      } catch (error) {
        console.error("error creation de examenphysique", error);
      }
    };
    createTestMeds();
  };

  return (
    <>
      {formTestMed && (
        <div className="ajouterconsultation">
          <div id="popup" class="popup">
            <div class="popup-content">
              <div className="h3">
                <center>
                  <h3>Ajouter Test Médical</h3>
                </center>
              </div>
              <span className="close" onClick={changeFormTestMed}>
                &times;
              </span>
              <div className="consult">
                <form
                  action=""
                  onSubmit={(event) => sbmitconsultaion(event)}
                  encType="multipart/form-data"
                >
                  <label htmlFor="">
                    <div className="nouveau-labl">
                      <div className="labl">
                        {" "}
                        Veuillez sélectionner le type de test souhaité :
                        <span className="obligatoir">**</span>{" "}
                      </div>

                      <div className="nouveau">
                        <p
                          onClick={() => {
                            changeFormType();
                          }}
                        >
                          <FontAwesomeIcon className="mod" icon={faList} />
                        </p>
                      </div>
                    </div>
                  </label>
                  <select
                    onChange={(e) => {
                      setTestMed({ ...testMed, TypeTestId: e.target.value });
                    }}
                    name=""
                    id=""
                  >
                    <option value="">sélectionner un type de test </option>
                    {typetest.map((items) => (
                      <option value={items.id}>{items.titre}</option>
                    ))}
                  </select>
                  <label htmlFor="">Date : </label>
                  <input
                    type="date"
                    onChange={(e) => {
                      setTestMed({ ...testMed, dateTest: e.target.value });
                    }}
                  />
                  <label htmlFor="">Description</label>
                  <textarea
                    name=""
                    id=""
                    onChange={(e) => {
                      setTestMed({ ...testMed, desc: e.target.value });
                    }}
                  ></textarea>
                  <label htmlFor="">Charger Resultat : </label>
                  <input
                    onChange={handleFileInputChange}
                    type="file"
                    multiple
                    name="resultat"
                  />
                  <div className="div-button">
                    <button
                      disabled={!testMed.TypeTestId ? true : false}
                      className="btn-v submit"
                      type="submit"
                    >
                      valider
                    </button>
                    <button onClick={changeFormTestMed} className="btn-n">
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
export default AjouterTestMed;
