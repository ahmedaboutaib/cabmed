import React, { useEffect, useState } from "react";
import "../../dashbordcss/detailOrd.css";
import { createPreinscriptionUp } from "../../../../utils/apis2";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCabinetId } from "../../../_helpers/Tokin";

const ModifierOrdonance = ({
  detais,
  changeFormMod,
  fromOrdMod,
  setDetail,
  id,
  remplirOrdannance,
  medicaments,
  changeFormType,
  changeValidForm,
  setLoading,
}) => {
  const [ajouter, setAjouter] = useState(false);
  const [val, setVal] = useState(false);
  const [preins, setPreins] = useState({
    Prescription: { description: "" },
    nom: "",
    id: "",
  });
  const CabinetId = useCabinetId();
  const deleteOrd = (id) => {
    let updateDetail = detais;
    let B = updateDetail.filter(function (e) {
      return e.id != id;
    });
    setDetail(B);
  };
  const NewOrd = () => {
    const preinscription = [];
    detais.map((ord) => {
      preinscription.push({
        OrdonnanceId: id,
        MedicamentId: ord.id,
        description: ord.Prescription.description,
      });
    });
    return preinscription;
  };
  const createPreUp = async () => {
    setLoading(true);
    try {
      if (!CabinetId) {
        return;
      }
      const resp = await createPreinscriptionUp(id, NewOrd());
      console.log("responce ", resp);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("error de preenscription ", error);
    }
    changeFormMod();
    setAjouter(false);
    remplirOrdannance();
    changeValidForm();
  };

  const handleSelectChange = (event) => {
    const selectedOptionValue = event.target.value;
    const [selectedItemId, selectedNom] = selectedOptionValue.split("-");
    setPreins({
      ...preins,
      id: selectedItemId,
      nom: selectedNom,
    });
    if (selectedOptionValue) {
      setVal(true);
    } else {
      setVal(false);
    }
  };
  const ajouterPreinsc = () => {
    let updateDetail = detais;
    let B = updateDetail.filter(function (e) {
      return e.id != preins.id;
    });
    B.push(preins);
    setDetail(B);
    setPreins({
      Prescription: { description: "" },
      nom: "",
      id: "",
    });
    setVal(false);
  };
  return (
    <>
      {fromOrdMod && (
        <div className="detailord">
          <div id="popup" class="sup-popup">
            <div class="sup-popup-content">
              <div className="h3">
                <center>
                  <h3>Modifier Ordonannce</h3>
                </center>
              </div>
              <span
                className="sup-close"
                onClick={() => {
                  changeFormMod();
                  setAjouter(false);
                }}
              >
                &times;
              </span>
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
                      {detais.map((item, index) => (
                        <tr key={index}>
                          <td>{item.nom}</td>
                          <td>{item.Prescription.description}</td>
                          <td>
                            {" "}
                            <button
                              onClick={() => {
                                deleteOrd(item.id);
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
              <div className="ajouter">
                {ajouter && (
                  <>
                    <div className="">
                      {" "}
                      <label htmlFor=""> les Medicaments</label> <br />
                      <select
                        onChange={(e) => {
                          handleSelectChange(e);
                        }}
                      >
                        <option value="">selectionner un medicament</option>
                        {medicaments.map((items) => (
                          <option value={`${items.id}-${items.nom}`}>
                            {" "}
                            {items.nom}
                          </option>
                        ))}
                      </select>
                      {val && (
                        <>
                          <div>
                            {" "}
                            <textarea
                              type="text"
                              onChange={(e) => {
                                setPreins({
                                  ...preins,
                                  Prescription: { description: e.target.value },
                                });
                              }}
                              value={preins.Prescription.description}
                            ></textarea>
                            <center>
                              {" "}
                              <button
                                className="ajoutet"
                                onClick={() => {
                                  ajouterPreinsc();
                                }}
                              >
                                Ajouter
                              </button>
                            </center>
                          </div>
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>

              <div className="button">
                <button
                  className="aj"
                  onClick={() => {
                    changeFormType();
                  }}
                >
                  List Medicament
                </button>{" "}
                <button
                  className="aj"
                  onClick={() => {
                    setAjouter(true);
                  }}
                >
                  Ajouter Medicament
                </button>{" "}
                <button
                  className="imprimer"
                  onClick={() => {
                    createPreUp();
                  }}
                >
                  Valider
                </button>
                <button
                  className="suppp"
                  onClick={() => {
                    changeFormMod();
                    setAjouter(false);
                  }}
                >
                  Anniler
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModifierOrdonance;
