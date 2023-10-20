import React, { useEffect, useState } from "react";
import "../dashbordcss/bilan.css";
import { useCabinetId } from "../../_helpers/Tokin";
import { fetchBilan, fetchTypeBilan } from "../../../utils/apis2";
import AjouterBilan from "./bilan/ajouterBilan";
import { docGenerator } from "../../../utils/printerService";
import {
  faTrash,
  faPlus,
  faPencilAlt,
  faUpload,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SuppBilan from "./bilan/SuppBilan";
import ModifierBilan from "./bilan/ModifierBilan";
import ChargerResultat from "./bilan/chargerResultatt";
import { handleDownload } from "../../_helpers/uplaod";
import AjouterTypeBilan from "./bilan/ajouterTypeBilan";
import Valider from "../patient/valider";
const bilan = () => {
  const [bilans, setBilans] = useState([]);
  const [formBilan, setFormBilan] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  // these functions for refreshing the component when update or delete

  const changeFormBilan = () => {
    setFormBilan(!formBilan);
  };
  const [formBialnSupp, setFormBilanSupp] = useState(false);
  const changeFormBilanSupp = () => {
    setFormBilanSupp(!formBialnSupp);
  };
  const [formBilanMod, setFormBilanMod] = useState(false);
  const changeFormBilanMod = () => {
    setFormBilanMod(!formBilanMod);
  };
  const [formBilanCharger, setFormBilanCharger] = useState(false);
  const changeFormBilanCharger = () => {
    setFormBilanCharger(!formBilanCharger);
  };

  const [formType, setFormType] = useState(false);
  const changeFormType = () => {
    setFormType(!formType);
  };

  const [bilan, setBilan] = useState();
  const [typebilan, setTypeBilan] = useState([]);

  // this function to get "cabinetId" and make sure the user is authenticated
  const CabinetId = useCabinetId();

  // if the user is authenticated we get the type bilan from the database

  // fetch the bilan types
  const selectTestBilan = async () => {
    setLoading(true);
    if (!CabinetId) {
      return;
    }
    try {
      const resp = await fetchTypeBilan(CabinetId);
      console.log("fetchTypeBilan ::", resp);
      setTypeBilan(resp);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (err) {
      console.error("type bilan", err);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  //fetch the bilans
  const remblirbilan = () => {
    setLoading(true);
    const selectBilan = async () => {
      if (!CabinetId) {
        return;
      }
      try {
        const resp = await fetchBilan(
          JSON.parse(localStorage.getItem("patient")).id
        );
        console.log("bilan ::", resp);
        setBilans(resp);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } catch (err) {
        console.error("fetch bilan", err);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };
    selectBilan();
  };
  useEffect(() => {
    remblirbilan();
  }, []);

  // this function to refresh the component when we add a new bilan
  const [loading, setLoading] = useState(false);
  const [validForm, setValidForm] = useState(false);
  const changeValidForm = () => {
    setValidForm(!validForm);
  };

  // for the search bar
  const filteredBilan = bilans.filter((test) =>
    String(test?.id).toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="h3 dosserMed">
        <center>
          <h2>Bilan</h2>
        </center>
      </div>
      <div style={{ position: "relative" }} className="mobileInf">
        <div className="consultation-content">
          <div className="nouveau-rechercher">
            <div className="rechercher">
              {" "}
              <input
                className=""
                style={{
                  borderRadius: "5px",
                  padding: "5px",
                  margin: "10px",
                  border: "1px solid green",
                }}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher par reference"
              />
            </div>

            <div className="nouveau">
              <button
                onClick={() => {
                  selectTestBilan();
                  changeFormBilan();
                }}
              >
                {" "}
                <FontAwesomeIcon className="nouvwu-icon" icon={faPlus} />{" "}
                Nouveau
              </button>
            </div>
          </div>

          <div className="table">
            <table>
              <thead>
                <tr>
                  <th>reference</th>
                  <th>date</th>
                  <th className="mobileCabMed">observation</th>

                  <th colspan="4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* TODO : add scroll capability later */}
                {filteredBilan &&
                  filteredBilan.map((items) => (
                    <tr>
                      <td>#{items?.id}</td>

                      <td>{items.dateBilan}</td>
                      <td className="mobileCabMed">{items?.observation}</td>
                      <td>
                        {items.resultat && (
                          <button
                            style={{ color: "coral" }}
                            onClick={() => {
                              console.log("items.resultat", items.resultat);
                              handleDownload(
                                items.resultat,
                                `bilan_${items?.Patient?.nom}_${items?.Patient?.prenom}_${items?.dateBilan} `
                              );
                            }}
                          >
                            <FontAwesomeIcon icon={faDownload} />
                          </button>
                        )}
                      </td>
                      <td>
                        <button
                          onClick={() => {
                            changeFormBilanSupp();
                            setBilan(items);
                          }}
                        >
                          <FontAwesomeIcon className="supp" icon={faTrash} />
                        </button>
                      </td>

                      <td>
                        <button
                          onClick={() => {
                            changeFormBilanMod();
                            selectTestBilan();
                            setBilan(items);
                          }}
                        >
                          <FontAwesomeIcon
                            className="modifier"
                            icon={faPencilAlt}
                          />
                        </button>
                      </td>
                      <td>
                        <button
                          style={{ color: "blue", fontSize: "22px" }}
                          onClick={() => {
                            setBilan(items);
                            changeFormBilanCharger();
                          }}
                        >
                          <FontAwesomeIcon className="" icon={faUpload} />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <AjouterBilan
        typebilan={typebilan}
        formBilan={formBilan}
        changeFormBilan={changeFormBilan}
        remblirbilan={remblirbilan}
        changeFormType={changeFormType}
        changeValidForm={changeValidForm}
        setLoading={setLoading}
      />
      <SuppBilan
        formBilanSupp={formBialnSupp}
        changeFormBilanSupp={changeFormBilanSupp}
        remblirbilan={remblirbilan}
        bilan={bilan}
      />
      <ModifierBilan
        formBilanMod={formBilanMod}
        changeFormBilanMod={changeFormBilanMod}
        remblirbilan={remblirbilan}
        bilan={bilan}
        typebilan={typebilan}
        setBilan={setBilan}
        changeFormType={changeFormType}
        changeValidForm={changeValidForm}
        setLoading={setLoading}
      />
      <ChargerResultat
        formBilanCharger={formBilanCharger}
        changeFormBilanCharger={changeFormBilanCharger}
        remblirbilan={remblirbilan}
        bilan={bilan}
        changeValidForm={changeValidForm}
        setLoading={setLoading}
      />
      <AjouterTypeBilan
        changeFormType={changeFormType}
        formType={formType}
        remplirType={selectTestBilan}
        typee={typebilan}
        setLoading={setLoading}
      />
      <Valider
        validForm={validForm}
        changeValidForm={changeValidForm}
        setValidForm={setValidForm}
        loading={loading}
      />
    </>
  );
};

export default bilan;
