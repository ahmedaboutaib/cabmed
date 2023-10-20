import React, { useEffect, useRef, useState } from "react";
import { useCabinetId } from "../../_helpers/Tokin";
import "../dashbordcss/salledattent.css";
import { createRendezVous } from "../../../utils/apis";
const AjouterRdv = ({
  formRendezV,
  changeFormRendezV,
  patients,
  remplirRDV,
  changeValidForm,
  setLoading,
}) => {
  const [rendezv, setRendezV] = useState({
    status: 1,
    motif: null,
    heureRDV: null,
    type: "",
    details: "",
    dateRDV: new Date(),
    CabinetId: null,
    PatientId: null,
  });
  const CabinetId = useCabinetId();
  const sbmitAjouterRdv = (event) => {
    event.preventDefault();
  };

  const createRdv = async () => {
    setLoading(true);
    try {
      if (!CabinetId) {
        return;
      }
      const rsp = await createRendezVous({
        ...rendezv,
        CabinetId: CabinetId,
      });
      changeFormRendezV();
      setRendezV({
        status: 1,
        motif: null,
        heureRDV: null,
        type: "",
        details: "",
        dateRDV: new Date(),
        CabinetId: null,
        PatientId: null,
      });
      setSearchTerm("");
      remplirRDV();
      setTimeout(() => {
        setLoading(false);
        changeValidForm();
      }, 1000);
    } catch (err) {
      console.error("error de creation de salle", err);
    }
  };

  const [searchTerm, setSearchTerm] = useState("");

  const [styl, setStyl] = useState({ display: "none" });
  const ulRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (e) => {
    if (ulRef.current && !ulRef.current.contains(e.target)) {
      setStyl({ display: "none" });
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    // Filtrez vos patients ici en fonction du terme de recherche
    // et mettez à jour le state filteredPatients
  };

  const handlePatientSelection = (patient) => {
    setRendezV({ ...rendezv, PatientId: patient.id });
    setSearchTerm(`${patient.nom} ${patient.prenom}`);
    setStyl({ display: "none" });
  };
  const filteredPatients = patients.filter((patient) =>
    `${patient.nom} ${patient.prenom}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );
  return (
    <>
      {formRendezV && (
        <div className="ajouterAsalle">
          <div id="popup" className="popup">
            <div className="popup-content  ">
              <div className="h3">
                <center>
                  <h3>Ajouter un Rendez vous</h3>
                </center>
              </div>
              <span className="close" onClick={changeFormRendezV}>
                &times;
              </span>
              <div className="ajouter-sal">
                <form
                  className="salleD"
                  action=""
                  onSubmit={(event) => sbmitAjouterRdv(event)}
                >
                  <label>
                    Selectionner un Patient :{" "}
                    <span className="obligatoir">**</span>
                  </label>

                  {/** */}
                  <div>
                    <input
                      className="rechercher"
                      type="text"
                      value={searchTerm}
                      onChange={handleInputChange}
                      placeholder="Rechercher un patient"
                      onFocus={() => {
                        setStyl({ display: "block" });
                      }}
                    />
                    <ul ref={ulRef} style={styl} className="list">
                      {filteredPatients.map((patient) => (
                        <li key={patient.id}>
                          <button
                            onClick={() => handlePatientSelection(patient)}
                          >
                            - {patient.nom} {patient.prenom}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <label htmlFor="date">
                    Date :<span className="obligatoir">**</span>
                  </label>
                  <input
                    id="date"
                    type="date"
                    onChange={(event) =>
                      setRendezV({
                        ...rendezv,
                        dateRDV: event.target.value,
                      })
                    }
                    placeholder="jj/mm/aaaa"
                  />

                  <label htmlFor="heure">
                    Heure :<span className="obligatoir">**</span>
                  </label>
                  <input
                    id="heure"
                    type="time"
                    placeholder="hh:mm"
                    onChange={(event) => {
                      setRendezV({
                        ...rendezv,
                        heureRDV: event.target.value,
                      });
                    }}
                  />
                  {/** */}
                  <label>Motif :</label>
                  <input
                    type="text"
                    onChange={(event) =>
                      setRendezV({
                        ...rendezv,
                        motif: event.target.value,
                      })
                    }
                  />

                  <label for="type">Type :</label>
                  <select
                    onChange={(event) =>
                      setRendezV({
                        ...rendezv,
                        type: event.target.value,
                      })
                    }
                  >
                    <option value="">selectionner un type </option>
                    <option value="consultaion">Consultaion</option>
                    <option value="contrôle">contrôle</option>
                    <option value="contre visite">contre visite</option>
                  </select>
                  <label htmlFor="details">Détails :</label>
                  <textarea
                    id="details"
                    onChange={(event) =>
                      setRendezV({
                        ...rendezv,
                        details: event.target.value,
                      })
                    }
                    placeholder="Ajoutez des détails ici "
                  ></textarea>
                  <div className="div-button">
                    <button
                      disabled={
                        !rendezv.PatientId ||
                        !rendezv.dateRDV ||
                        !rendezv.heureRDV
                          ? true
                          : false
                      }
                      onClick={() => {
                        createRdv();
                      }}
                      className="btn-v"
                      type="submit"
                    >
                      valider
                    </button>
                    <button
                      onClick={() => {
                        changeFormRendezV();
                        setSearchTerm("");
                      }}
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

export default AjouterRdv;
