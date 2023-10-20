import React, { useEffect, useRef, useState } from "react";
import { useCabinetId } from "../../_helpers/Tokin";
import { createSalle } from "../../../utils/apis3";

const ajouterAsalle = ({
  fromsalle,
  changeFormsalle,
  patients,
  remplirSalle,
  changeValidForm,
  setLoading,
}) => {
  const [salle, setSalle] = useState({
    status: "arriver",
    motif: null,
    date: null,
    type: "",
    heureDAR: null,
    situation: null,
    CabinetId: null,
    PatientId: null,
  });
  const heureActuel = () => {
    const now = new Date();
    const hour = now.getHours(); // heures actuelles (0-23)
    const minute = now.getMinutes(); // minutes actuelles (0-59)
    const second = now.getSeconds();
    const heure = `${hour}:${minute}:${second}`;
    return heure;
  };
  const CabinetId = useCabinetId();

  const sbmitSalle = (event) => {
    event.preventDefault();
  };
  //

  const createSalles = async () => {
    setLoading(true);
    try {
      if (!CabinetId) {
        return;
      }

      const rsp = await createSalle({
        ...salle,
        CabinetId: CabinetId,
        heureDAR: heureActuel(),
        date: new Date(),
      });
      changeFormsalle();
      setSalle({
        status: "arriver",
        motif: null,
        date: null,
        type: "",
        heureDAR: null,
        situation: null,
        CabinetId: null,
        PatientId: null,
      });
      setSearchTerm("");
      remplirSalle();

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
    setSalle({ ...salle, PatientId: patient.id });
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
      {fromsalle && (
        <div className="ajouterAsalle">
          <div id="popup" class="popup">
            <div class="popup-content  ">
              <div className="h3">
                <center>
                  <h3>Ajouter patient a la salle d'attent </h3>
                </center>
              </div>
              <span className="close" onClick={changeFormsalle}>
                &times;
              </span>
              <div className="ajouter-sal">
                <form
                  className="salleD"
                  action=""
                  onSubmit={(event) => sbmitSalle(event)}
                >
                  <label>
                    Patient :<span className="obligatoir">**</span>
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

                  {/** */}
                  <label>Motif :</label>
                  <input
                    type="text"
                    onChange={(event) =>
                      setSalle({
                        ...salle,
                        motif: event.target.value,
                      })
                    }
                    value={salle.motif}
                  />
                  <label>Situation :</label>
                  <input
                    type="text"
                    onChange={(event) =>
                      setSalle({
                        ...salle,
                        situation: event.target.value,
                      })
                    }
                    value={salle.situation}
                  />
                  <label for="type">Type :</label>
                  <select
                    onChange={(event) =>
                      setSalle({
                        ...salle,
                        type: event.target.value,
                      })
                    }
                    value={salle.type}
                  >
                    <option value="">selectionner un type </option>
                    <option value="consultaion">Consultaion</option>
                    <option value="contrôle">contrôle</option>
                    <option value="contre visite">contre visite</option>
                  </select>

                  <div className="div-button">
                    <button
                      disabled={!salle.PatientId ? true : false}
                      onClick={() => {
                        createSalles();
                      }}
                      className="btn-v"
                      type="submit"
                    >
                      valider
                    </button>
                    <button
                      onClick={() => {
                        changeFormsalle();
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

export default ajouterAsalle;
