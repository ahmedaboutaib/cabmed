import React from "react";
import { useCabinetId } from "../../../_helpers/Tokin";
import { modifierService } from "../../../../utils/apis2";

const ModifierService = ({
  changeFormSrvMod,
  service,
  setService,
  formSrvMod,
  remplirService,
  changeValidForm,
}) => {
  const CabinetId = useCabinetId();

  const sbmitSrvMod = (event) => {
    event.preventDefault();
    if (!CabinetId) {
      return;
    }
    const upddateSrv = async () => {
      try {
        const resp = await modifierService(service);
        changeFormSrvMod();
        remplirService();
        changeValidForm();
      } catch (err) {
        console.error("error de modification", err);
      }
    };
    upddateSrv();
  };

  return (
    <>
      {" "}
      {formSrvMod && (
        <div className="AjouterSrv">
          <div id="popup" class="popup">
            <div class="popup-content">
              <div className="h3">
                <center>
                  <h3>Modifier Service</h3>
                </center>
              </div>
              <span className="close" onClick={changeFormSrvMod}>
                &times;
              </span>
              <div className="serv">
                <form action="" onSubmit={(event) => sbmitSrvMod(event)}>
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
                    type="text"
                    onChange={(event) =>
                      setService({ ...service, prix: event.target.value })
                    }
                    value={service.prix}
                  />
                  <label htmlFor="">Description :</label>
                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="4"
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
                      onClick={changeFormSrvMod}
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

export default ModifierService;
