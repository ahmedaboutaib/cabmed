import { useState, useEffect } from "react";
import AjouterDepense from "./ajouterDepense";
import { fetchDepenses } from "@api/dashboard/depense";
import {
  faTrash,
  faPlus,
  faPencilAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./depences.css";
import { useCabinetId } from "../../_helpers/Tokin";
import { fetchDepensesCabinetId } from "../../../api/dashboard/depense";
import ModifierDepense from "./ModifierDepence";
import SuppDepence from "./SuppDepence";
import { Login } from "../../_helpers/service";
import Valider from "../patient/valider";

const Depenses = () => {
  const [depenses, setDepenses] = useState([]);
  const [isAdded, setIsAdded] = useState(true);
  const CabinetId = useCabinetId();
  const [formDep, setFormDep] = useState(false);
  const changeFormDep = () => {
    setFormDep(!formDep);
  };

  const [formDepMod, setFormDepMod] = useState(false);
  const changeFormDepMod = () => {
    setFormDepMod(!formDepMod);
  };

  const [suppForm, setSuppForm] = useState(false);
  const changeSuppForm = () => {
    setSuppForm(!suppForm);
  };

  const [depense, setDepense] = useState({
    label: "",
    montant: "",
    description: "",
  });

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      if (!CabinetId) {
        return;
      }
      try {
        const data = await fetchDepensesCabinetId(CabinetId);
        setDepenses(data);
        console.log("hi ::" + data);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching depens:", error);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };

    fetchItems();
  }, [isAdded]);

  const handleDepenseAdd = () => {
    setIsAdded(!isAdded);
    console.log("added");
  };
  const [loading, setLoading] = useState(false);
  const [validForm, setValidForm] = useState(false);
  const changeValidForm = () => {
    setValidForm(!validForm);
  };

  const [searchTerm, setSearchTerm] = useState("");

  const filtereddepenses = depenses.filter((dep) =>
    `${dep.label} ${dep.id}`.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <>
      <div className="row column_title ">
        <div className="col-md-12 ">
          <div
            className={
              Login().roles === "medecin"
                ? "page_title medcin"
                : Login().roles === "secretaire"
                ? "page_title secretair"
                : "page_title "
            }
          >
            <center>
              {" "}
              <h2>Dépences</h2>
            </center>
          </div>
        </div>
      </div>
      <div style={{ position: "relative" }} className="mobileInf">
        <div className="Depenses">
          <div className="nouveau-rechercher">
            <div className="rechercher">
              {" "}
              <input
                className=""
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher un dépence"
              />
            </div>

            <div className="nouveau">
              <button onClick={changeFormDep}>
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
                  <th>Reference</th>
                  <th>Label</th>
                  <th>montant</th>
                  <th className="mobileCabMed">Description</th>
                  <th colspan="2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtereddepenses.map((item) => (
                  <tr>
                    <td>{item.id}</td>
                    <td>{item.label}</td>

                    <td style={{ textAlign: "center" }}>{item.montant} DH</td>

                    <td className="mobileCabMed">{item.description}</td>

                    <td style={{ textAlign: "center" }}>
                      <button>
                        <FontAwesomeIcon
                          onClick={() => {
                            changeSuppForm();
                            setDepense(item);
                          }}
                          className="supp"
                          icon={faTrash}
                        />
                      </button>
                    </td>

                    <td style={{ textAlign: "center" }}>
                      <button
                        onClick={() => {
                          changeFormDepMod();
                          setDepense(item);
                        }}
                      >
                        <FontAwesomeIcon
                          className="modifier"
                          icon={faPencilAlt}
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
      <AjouterDepense
        handleDepenseAdd={handleDepenseAdd}
        changeFormDep={changeFormDep}
        formDep={formDep}
        changeValidForm={changeValidForm}
        setLoading={setLoading}
      />
      <ModifierDepense
        handleDepenseAdd={handleDepenseAdd}
        changeFormDepMod={changeFormDepMod}
        formDepMod={formDepMod}
        depense={depense}
        setDepense={setDepense}
        changeValidForm={changeValidForm}
        setLoading={setLoading}
      />
      <SuppDepence
        handleDepenseAdd={handleDepenseAdd}
        changeSuppForm={changeSuppForm}
        suppForm={suppForm}
        depense={depense}
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

export default Depenses;
