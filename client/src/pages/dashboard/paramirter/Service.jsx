import React, { useEffect, useState } from "react";
import "../paramitrecss/service.css";

import {
  faTrash,
  faPlus,
  faPencilAlt,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCabinetId } from "../../_helpers/Tokin";
import { fetchService } from "../../../utils/apis2";
import AjouterService from "./service/ajouterService";
//import SuppService from "./service/suppService";
import ModifierService from "./service/ModifierService";
import Valider from "../patient/valider";
import SuppService from "./service/SuppService";
const Service = () => {
  const CabinetId = useCabinetId();
  const [services, setServices] = useState([]);
  const [service, setService] = useState();
  const [formSrv, setFormSrv] = useState(false);
  const changeFormSrv = () => {
    setFormSrv(!formSrv);
  };
  const [formSrvMod, setFormSrvMod] = useState(false);
  const changeFormSrvMod = () => {
    setFormSrvMod(!formSrvMod);
  };
  const [formSrvSupp, setFormSrvSupp] = useState(false);
  const changeFormSrvSupp = () => {
    setFormSrvSupp(!formSrvSupp);
  };
  const remplirService = () => {
    if (!CabinetId) {
      return;
    }

    const fetchServices = async () => {
      try {
        const resp = await fetchService(CabinetId);
        setServices(resp);
        //  console.log("service :", service);
      } catch (err) {
        console.error("error de service", err);
      }
    };
    fetchServices();
  };
  useEffect(() => {
    remplirService();
  }, []);
  const [validForm, setValidForm] = useState(false);
  const changeValidForm = () => {
    setValidForm(!validForm);
  };
  const [searchTerm, setSearchTerm] = useState("");

  const filteredService = services.filter((ser) =>
    `${ser.nom}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="h3  util ">
        <center>
          <h2>Service</h2>
        </center>
      </div>
      <div style={{ position: "relative" }} className="service mobileInf">
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
            <button onClick={changeFormSrv}>
              {" "}
              <FontAwesomeIcon className="nouvwu-icon" icon={faPlus} /> Nouveau
            </button>
          </div>
        </div>
        <div className="table">
          <table>
            <thead>
              <tr>
                <th>nom</th>
                <th>prix</th>
                <th className="mobolpar">discrption</th>
                <th style={{ textAlign: "center" }} colspan="2">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredService &&
                filteredService.map((items) => (
                  <tr>
                    <td>{items.nom}</td>
                    <td>{items.prix} Dh</td>
                    <td className="mobolpar">{items.description}</td>
                    <td style={{ textAlign: "center" }}>
                      {" "}
                      <button
                        onClick={() => {
                          changeFormSrvSupp();
                          setService(items);
                        }}
                        className="supp-button"
                      >
                        <FontAwesomeIcon className="supp" icon={faTrash} />
                      </button>
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {" "}
                      <button
                        onClick={() => {
                          changeFormSrvMod();
                          setService(items);
                        }}
                        className="mod-button"
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
      <AjouterService
        formSrv={formSrv}
        changeFormSrv={changeFormSrv}
        remplirService={remplirService}
        changeValidForm={changeValidForm}
      />
      <SuppService
        changeFormSrvSupp={changeFormSrvSupp}
        formSrvSupp={formSrvSupp}
        service={service}
        remplirService={remplirService}
      />
      <ModifierService
        formSrvMod={formSrvMod}
        changeFormSrvMod={changeFormSrvMod}
        remplirService={remplirService}
        service={service}
        setService={setService}
        changeValidForm={changeValidForm}
      />
      <Valider
        validForm={validForm}
        changeValidForm={changeValidForm}
        setValidForm={setValidForm}
      />
    </>
  );
};

export default Service;
