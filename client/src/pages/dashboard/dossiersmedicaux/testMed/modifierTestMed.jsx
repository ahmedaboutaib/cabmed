import React, { useEffect, useState } from "react";
import "../../dashbordcss/ajouterconsultation.css";
import { updateTestMed } from "../../../../utils/apis2";
import { useCabinetId } from "../../../_helpers/Tokin";
import { faTrash, faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const ModifierTestMed = ({
  formTestMedMod,
  changeFormTestMedMod,
  testMedMod,
  remplirTestMed,
  typetest,
  changeFormType,
  changeValidForm,
  setLoading,
}) => {
  const [testMed, setTestMed] = useState(testMedMod);
  const CabinetId = useCabinetId();

  //
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
    formData.append("PatientId", testMed.PatientId);
    const updateTestMeds = async () => {
      setLoading(true);
      try {
        if (!CabinetId) {
          return;
        }
        const response = await updateTestMed(testMed.id, formData);
        console.log(response);
        remplirTestMed();
        changeFormTestMedMod();
        setFiles([]);
        setTimeout(() => {
          setLoading(true);
          changeValidForm();
        }, 1000);
      } catch (error) {
        console.error("error de modification de test medical", error);
      }
    };
    updateTestMeds();
  };
  useEffect(() => {
    setTestMed(testMedMod);
  }, [testMedMod]);

  return (
    <>
      {formTestMedMod && (
        <div className="ajouterconsultation">
          <div id="popup" class="popup">
            <div class="popup-content">
              <div className="h3">
                <center>
                  <h3>Modifier Test Médical</h3>
                </center>
              </div>
              <span className="close" onClick={changeFormTestMedMod}>
                &times;
              </span>
              <div className="consult">
                <form action="" onSubmit={(event) => sbmitconsultaion(event)}>
                  <label htmlFor="">
                    <div className="nouveau-labl">
                      <div className="labl">
                        {" "}
                        Choiser le Type de Test :
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
                    value={testMed.TypeTestId}
                    onChange={(e) => {
                      setTestMed({ ...testMed, TypeTestId: e.target.value });
                    }}
                  >
                    <option value="">sélectionner un medicament</option>
                    {typetest.map((item) =>
                      item.id === testMed.TypeTestId ? (
                        <option key={item.id} value={item.id}>
                          {item.titre}
                        </option>
                      ) : (
                        <option key={item.id} value={item.id}>
                          {item.titre}
                        </option>
                      )
                    )}
                  </select>

                  <label htmlFor="">date</label>
                  <input
                    type="date"
                    onChange={(e) => {
                      setTestMed({ ...testMed, dateTest: e.target.value });
                    }}
                    value={testMed.dateTest}
                  />
                  <label htmlFor="">description</label>
                  <textarea
                    name=""
                    id=""
                    onChange={(e) => {
                      setTestMed({ ...testMed, desc: e.target.value });
                    }}
                    value={testMed.description}
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
                      onClick={changeFormTestMedMod}
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
export default ModifierTestMed;
