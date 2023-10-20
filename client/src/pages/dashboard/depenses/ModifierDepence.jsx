import React, { useState } from "react";
import { createDepense } from "@api/dashboard/depense";
import { updateDepence } from "../../../api/dashboard/depense";
import { useCabinetId } from "../../_helpers/Tokin";
//import styles from "./AjouterDepense.module.css";

const ModifierDepense = ({
  handleDepenseAdd,
  changeFormDepMod,
  formDepMod,
  depense,
  setDepense,
  changeValidForm,
  setLoading,
}) => {
  const CabinetId = useCabinetId();
  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    try {
      if (!CabinetId) {
        return;
      }
      const data = await updateDepence(depense);
    } catch (error) {
      console.error("Error creating depense:", error);
    }
    changeFormDepMod();
    setDepense({ label: "", montant: "", description: "" });

    handleDepenseAdd();
    setTimeout(() => {
      setLoading(false);
      changeValidForm();
    }, 1000);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDepense({ ...depense, [name]: value });
  };

  return (
    <>
      {formDepMod && (
        <div className="AjouteDepences">
          <div id="popup" class="popup">
            <div class="popup-content">
              <div className="h3">
                <center>
                  <h3>Modifier Depences </h3>
                </center>
              </div>
              <span className="close" onClick={changeFormDepMod}>
                &times;
              </span>

              <div className="Ajoute-Depences">
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="label">
                      Label: <span className="obligatoir">**</span>{" "}
                    </label>
                    <input
                      type="text"
                      id="label"
                      name="label"
                      value={depense.label}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="montant">Montant:</label>
                    <input
                      type="number"
                      id="montant"
                      name="montant"
                      value={depense.montant}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="description">Description:</label>
                    <textarea
                      id="description"
                      name="description"
                      value={depense.description}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <div className="div-button">
                    <button
                      disabled={!depense?.label ? true : false}
                      className="submit"
                      type="submit"
                    >
                      Valider
                    </button>
                    <button onClick={changeFormDepMod} className="annule">
                      Annuler
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
export default ModifierDepense;
