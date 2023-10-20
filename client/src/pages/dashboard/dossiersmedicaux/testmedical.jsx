import React, { useEffect, useState } from "react";
import "../dashbordcss/consultation.css";
import { fetchTestMed, fetchTypeTest } from "../../../utils/apis2";
import {
  faTrash,
  faPlus,
  faPencilAlt,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AjouterTestMed from "./testMed/ajouterTestMed";
import SuppTestMed from "./testMed/supptestmed";
import ModifierTestMed from "./testMed/modifierTestMed";
import { handleDownload } from "../../_helpers/uplaod";
import { useCabinetId } from "../../_helpers/Tokin";
import AjouterTypeTest from "./testMed/ajouterTypeTest";
import Valider from "../patient/valider";
const TestMedical = () => {
  const [formTestMed, setFormTestMed] = useState(false);
  const changeFormTestMed = () => {
    setFormTestMed(!formTestMed);
  };
  const [formtestMedsupp, setFormTestMedSupp] = useState(false);
  const changeFormtestMedsupp = () => {
    setFormTestMedSupp(!formtestMedsupp);
  };

  const [formtestMedMod, setFormTestMedMod] = useState(false);
  const changeFormtestMedMod = () => {
    setFormTestMedMod(!formtestMedMod);
  };

  const [formType, setFormType] = useState(false);
  const changeFormType = () => {
    setFormType(!formType);
  };
  const [id, setId] = useState();
  const [testMedMod, setTestMedMod] = useState({
    id: "",
    dateTest: "",
    desc: "",
    TypeTestId: "",
    PatientId: "",
  });
  const CabinetId = useCabinetId();
  const [typetest, setTypeTest] = useState([]);
  const remplirTypeTest = () => {
    setLoading(true);
    const fetchTypeTests = async () => {
      try {
        if (!CabinetId) {
          return;
        }
        const resp = await fetchTypeTest(CabinetId);
        setTypeTest(resp);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("error de type test ", error);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };
    fetchTypeTests();
  };
  //
  const [testMeds, setTestMeds] = useState([]);
  const remplirTestMed = () => {
    setLoading(true);
    const fetchTestMeds = async () => {
      try {
        if (!CabinetId) {
          return;
        }
        const PatientId = JSON.parse(localStorage.getItem("patient")).id;
        setId(PatientId);
        const response = await fetchTestMed(PatientId);

        setTestMeds(response);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("error de selection des test medical", error);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };
    fetchTestMeds();
  };

  useEffect(() => {
    remplirTestMed();
  }, []);
  const [loading, setLoading] = useState(false);
  const [validForm, setValidForm] = useState(false);
  const changeValidForm = () => {
    setValidForm(!validForm);
  };
  const [searchTerm, setSearchTerm] = useState("");

  const filteredtest = testMeds.filter((test) =>
    test?.TypeTest?.titre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="h3 dosserMed">
        <center>
          <h2>Test Médical</h2>
        </center>
      </div>
      <div style={{ position: "relative" }} className="mobileInf">
        <div className="consultation-content">
          <div className="nouveau-rechercher">
            <div className="rechercher">
              {" "}
              <input
                className=""
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher un consultaion"
              />
            </div>

            <div className="nouveau">
              <button
                onClick={() => {
                  changeFormTestMed();
                  remplirTypeTest();
                  setId(JSON.parse(localStorage.getItem("patient")).id);
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
                  <th>titre</th>
                  <th>date</th>
                  <th className="mobileCabMed">description</th>
                  <th colSpan="3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredtest.map((items) => (
                  <tr>
                    <td>{items?.TypeTest?.titre}</td>
                    <td>{items.dateTest}</td>
                    <td className="mobileCabMed">{items.desc}</td>
                    <td style={{ textAlign: "center" }}>
                      <button
                        style={{ color: "coral" }}
                        onClick={() => {
                          handleDownload(
                            items?.resultat,
                            `Testmédical_${items?.Patient?.nom}_${items?.Patient?.prenom}_${items?.dateTest}`
                          );
                        }}
                      >
                        <FontAwesomeIcon icon={faDownload} />
                      </button>
                    </td>

                    <td style={{ textAlign: "center" }}>
                      <button
                        onClick={() => {
                          changeFormtestMedsupp();
                          setId(items.id);
                        }}
                      >
                        <FontAwesomeIcon className="supp" icon={faTrash} />
                      </button>
                    </td>

                    <td style={{ textAlign: "center" }}>
                      <button
                        onClick={() => {
                          setTestMedMod(items);
                          changeFormtestMedMod();
                          remplirTypeTest();
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
      <AjouterTestMed
        formTestMed={formTestMed}
        changeFormTestMed={changeFormTestMed}
        remplirTestMed={remplirTestMed}
        typetest={typetest}
        changeFormType={changeFormType}
        changeValidForm={changeValidForm}
        setLoading={setLoading}
      />
      <SuppTestMed
        formtestMedsupp={formtestMedsupp}
        changeFormtestMedsupp={changeFormtestMedsupp}
        id={id}
        remplirTestMed={remplirTestMed}
      />
      <ModifierTestMed
        formTestMedMod={formtestMedMod}
        changeFormTestMedMod={changeFormtestMedMod}
        testMedMod={testMedMod}
        remplirTestMed={remplirTestMed}
        typetest={typetest}
        changeFormType={changeFormType}
        changeValidForm={changeValidForm}
        setLoading={setLoading}
      />
      <AjouterTypeTest
        changeFormType={changeFormType}
        formType={formType}
        remplirType={remplirTypeTest}
        typee={typetest}
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
export default TestMedical;
