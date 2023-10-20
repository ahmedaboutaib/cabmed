import React, { useState } from "react";
import { useCabinetId } from "../../../_helpers/Tokin";
import { ajouterService } from "../../../../utils/apis2";

const AjouterService = ({
  formSrv,
  changeFormSrv,
  remplirService,
  changeValidForm,
}) => {
  const [service, setService] = useState({
    nom: "",
    prix: "",
    status: true,
    description: "",
    CabinetId: "",
  });

  const CabinetId = useCabinetId();
  const sbmitSrv = (event) => {
    event.preventDefault();
    if (!CabinetId) {
      return;
    }
    const ajouterServ = async () => {
      const services = { ...service, CabinetId: CabinetId };
      try {
        const resp = await ajouterService(services);
        setService({
          nom: "",
          prix: "",
          status: true,
          description: "",
          CabinetId: "",
        });
        remplirService();
        changeFormSrv();
        changeValidForm();
      } catch (err) {
        console.error("error ajouter service", err);
      }
    };
    ajouterServ();
  };

  return (
    <>
      {formSrv && (
        <div className="AjouterSrv">
          <div id="popup" class="popup">
            <div class="popup-content">
              <div className="h3">
                <center>
                  <h3>Ajouter Service</h3>
                </center>
              </div>
              <span className="close" onClick={changeFormSrv}>
                &times;
              </span>
              <div className="serv">
                <form action="" onSubmit={(event) => sbmitSrv(event)}>
                  <label>Nom :</label>
                  <input
                    type="text"
                    onChange={(event) =>
                      setService({ ...service, nom: event.target.value })
                    }
                    value={service.nom}
                  />
                  <label>Prix :</label>
                  <input
                    type="number"
                    onChange={(event) =>
                      setService({ ...service, prix: event.target.value })
                    }
                    value={service.prix}
                  />
                  <label htmlFor="">Description :</label>
                  <textarea
                    name=""
                    id=""
                    onChange={(event) =>
                      setService({
                        ...service,
                        description: event.target.value,
                      })
                    }
                    value={service.description}
                  ></textarea>

                  <div className="div-button">
                    <button className="btn-v" type="submit">
                      valider
                    </button>
                    <button
                      onClick={changeFormSrv}
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

export default AjouterService;
