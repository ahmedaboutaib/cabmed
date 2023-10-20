import React, { useEffect, useState } from "react";
import "../../dashbordcss/ajouterOdr.css";
import {
  createOrdonnance,
  createPreinscription,
} from "../../../../utils/apis2";
import { faTrash, faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCabinetId } from "../../../_helpers/Tokin";
const AjouterOrdonnance = ({
  formOrdonnance,
  changeFormOrdonnance,
  medicaments,
  remplirOrdannance,
  id,
  changeFormType,
  changeValidForm,
  setLoading,
}) => {
  const [ordonnance, setOrdonnance] = useState({
    id: null,
    dateOrd: null,
    PatientId: null,
  });

  const [preinscription, setPreinscription] = useState([]);
  const [preinscre, SetPreinscre] = useState([]);
  const [preins, setPreins] = useState({
    MedicamentId: null,
    OrdonnanceId: null,
    description: null,
    MedicamentNom: "",
  });

  const handleSelectChange = (event) => {
    const selectedOptionValue = event.target.value;
    const [selectedItemId, selectedNom] = selectedOptionValue.split("-");
    setPreins({
      ...preins,
      MedicamentId: selectedItemId,
      MedicamentNom: selectedNom,
    });
    if (selectedOptionValue) {
      setVal(true);
    }
  };

  // const [nomsMedicaments, setNomsMedicaments] = useState([]);
  const ajouter = () => {
    let B = preinscription.filter(function (e) {
      return e.MedicamentId != preins.MedicamentId;
    });
    B.push(preins);
    setPreinscription(B);
    setPreins({
      MedicamentId: null,
      OrdonnanceId: null,
      description: null,
      MedicamentNom: "",
    });
    setVal(false);
  };

  const createPreinscriptions = async (preinscriptions) => {
    try {
      const resp = await createPreinscription(preinscriptions);
    } catch (error) {
      console.error("error creation de preinscription", error);
    }
  };
  const CabinetId = useCabinetId();
  const sbmitOrdonnance = () => {
    setLoading(true);
    // event.preventDefault();
    const createOrdonnances = async () => {
      if (!CabinetId) {
        return;
      }
      const createOrd = { ...ordonnance, PatientId: id, dateOrd: new Date() };
      try {
        const response = await createOrdonnance(createOrd);

        if (response) {
          preinscription.map((items) => {
            items.OrdonnanceId = response.id;
            preinscre.push(items);
          });

          changeFormOrdonnance();
          createPreinscriptions(preinscre);
        }
        setPreinscription([]);
        SetPreinscre([]);
        remplirOrdannance();
        setTimeout(() => {
          setLoading(true);
          changeValidForm();
        }, 1000);
      } catch (error) {
        console.error("error creation de derdonnance", error);
      }
    };
    createOrdonnances();
  };
  const suppPreinscription = (id) => {
    let B = preinscription.filter(function (e) {
      return e.MedicamentId != id;
    });
    setPreinscription(B);
  };

  const [val, setVal] = useState(false);
  return (
    <>
      {formOrdonnance && (
        <div className="ajouterOrd">
          <div id="popup" class="popup">
            <div class="popup-content">
              <div className="h3">
                <center>
                  <h3>Ajouter Ordonnance</h3>
                </center>
              </div>
              <span
                className="close"
                onClick={() => {
                  changeFormOrdonnance();
                  setPreinscription([]);
                  setVal(false);
                }}
              >
                &times;
              </span>
              <div className="ord">
                <div className="ajouter_ord-form">
                  <div>
                    <div>
                      <label className="" htmlFor="">
                        <div className="Ajouter-Med">
                          <span>
                            {" "}
                            Choiser Médicament :
                            <span className="obligatoir">**</span>
                          </span>

                          <button
                            onClick={() => {
                              changeFormType();
                            }}
                            className="ajouter-medicament"
                          >
                            <FontAwesomeIcon className="mod" icon={faList} />
                          </button>
                        </div>
                      </label>{" "}
                    </div>
                    <br />
                    <select
                      onChange={(e) => {
                        handleSelectChange(e);
                      }}
                    >
                      <option value="">selectionner médicamnet</option>
                      {medicaments.map((items) => (
                        <option value={`${items.id}-${items.nom}`}>
                          {" "}
                          {items.nom}
                        </option>
                      ))}
                    </select>
                    {val && preins.MedicamentId && (
                      <>
                        <div>
                          {" "}
                          <textarea
                            type="text"
                            onChange={(e) => {
                              setPreins({
                                ...preins,
                                description: e.target.value,
                              });
                            }}
                            value={preins.description}
                          ></textarea>
                          <center>
                            {" "}
                            <button
                              style={{ backgroundColor: "blue" }}
                              className="btn-v"
                              onClick={() => {
                                ajouter();
                              }}
                            >
                              Ajouter
                            </button>
                          </center>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="scrol">
                <div className="table">
                  <table>
                    <thead>
                      <tr>
                        <th>Nom Medicament</th>
                        <th>description </th>
                        <th>Actions </th>
                      </tr>
                    </thead>
                    <tbody>
                      {preinscription.map((item, index) => (
                        <tr>
                          <td>{item.MedicamentNom}</td>
                          <td>{item.description}</td>
                          <td>
                            {" "}
                            <button
                              onClick={() => {
                                suppPreinscription(item.MedicamentId);
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

              <div className="valider-annuler">
                <button
                  disabled={!preinscription.length ? true : false}
                  className="btn-v"
                  onClick={() => {
                    sbmitOrdonnance();
                  }}
                >
                  valider
                </button>

                <button
                  onClick={() => {
                    changeFormOrdonnance();
                    setVal(false);
                    setPreinscription([]);
                  }}
                  className="btn-n"
                  type="submit"
                >
                  annule
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default AjouterOrdonnance;
