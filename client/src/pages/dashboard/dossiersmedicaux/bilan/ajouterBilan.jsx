import React, { useEffect, useState } from "react";
import "../../dashbordcss/ajouterconsultation.css";
import { createBilan } from "../../../../utils/apis2";
import { useCabinetId } from "../../../_helpers/Tokin";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createBilanWithCompositions } from "../../../../api/dashboard/bilan";
const AjouterTestMed = ({
  formBilan,
  changeFormBilan,
  typebilan,
  remblirbilan,
  changeFormType,
  changeValidForm,
  setLoading,
}) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [bilan, setBilan] = useState({
    dateBilan: new Date(),
    observation: "",
    TypeBilanIds: selectedOptions,
    PatientId: "",
  });
  const CabinetId = useCabinetId();
  const sbmitBilan = (event) => {
    setLoading(true);
    event.preventDefault();
    console.log("bilan", bilan);
    const createBilans = async () => {
      try {
        if (!CabinetId) {
          console.log("cabinet id not found");
          return;
        }

        console.log("request not sent yet!");
        const rsp = await createBilanWithCompositions({
          ...bilan,
          PatientId: JSON.parse(localStorage.getItem("patient")).id,
        });

        console.log("request sent !");
        console.log("rsp", rsp);
        remblirbilan();
        changeFormBilan();
        setBilan({ dateBilan: new Date() });

        setTimeout(() => {
          setLoading(false);
          changeValidForm();
        }, 1000);
      } catch (error) {
        console.error("error creation ", error);
      }
    };
    createBilans();
  };
  const handleSelectChange = (e) => {
    const newOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );

    console.log("New options: ", newOptions);

    newOptions.forEach((newOption) => {
      if (selectedOptions.includes(newOption)) {
        // If the option is already selected, remove it from the selectedOptions
        console.log(
          `Option ${newOption} is already selected, removing from selection...`
        );
        setSelectedOptions((prevOptions) =>
          prevOptions.filter((option) => option !== newOption)
        );
      } else {
        // If the option is not already selected, add it to the selectedOptions
        console.log(
          `Option ${newOption} is not selected yet, adding to selection...`
        );
        setSelectedOptions((prevOptions) => [...prevOptions, newOption]);
      }
    });
  };
  useEffect(() => {
    console.log("Updated selected options: ", selectedOptions);
    setBilan({ ...bilan, TypeBilanIds: selectedOptions });
  }, [selectedOptions]);

  return (
    <>
      {formBilan && (
        <div className="ajouterconsultation">
          <div id="popup" class="popup">
            <div class="popup-content">
              <div className="h3">
                <center>
                  <h3>Ajouter Bilan</h3>
                </center>
              </div>
              <span className="close" onClick={changeFormBilan}>
                &times;
              </span>
              <div className="consult">
                <form action="" onSubmit={(event) => sbmitBilan(event)}>
                  <label htmlFor="">
                    <div className="nouveau-labl">
                      <div className="labl">
                        {" "}
                        Veuillez sélectionner le type de bilan souhaité :{" "}
                        <span className="obligatoir"> *</span>
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
                    multiple={true}
                    value={selectedOptions}
                    onChange={handleSelectChange}
                    name=""
                    id=""
                  >
                    <option value="">selectionner un type de bilan</option>
                    {typebilan?.map((items) => (
                      <option key={items.id} value={items.id}>
                        {items.titre}
                      </option>
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
                  <div className="div-button">
                    <button className="btn-v submit" type="submit">
                      valider
                    </button>
                    <button
                      onClick={changeFormBilan}
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
export default AjouterTestMed;
