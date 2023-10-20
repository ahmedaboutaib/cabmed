import React, { useEffect } from "react";
import { faCheck, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../dashbordcss/supprimercss.css";

const Valider = ({ validForm, changeValidForm, setValidForm, loading }) => {
  useEffect(() => {
    if (validForm) {
      const timer = setTimeout(() => {
        setValidForm(false);
      }, 1000); // Délai de 2 secondes

      return () => {
        clearTimeout(timer); // Nettoyer le timer si le composant est démonté avant la fin du délai
      };
    }
  }, [validForm, setValidForm]);

  return (
    <>
      <>
        {validForm && (
          <div id="popup" class="sup-popup">
            <div class="sup-popup-content">
              <span className="sup-close" onClick={changeValidForm}>
                &times;
              </span>
              <center>
                <p className="valid">
                  <FontAwesomeIcon className="nouvwu-icon " icon={faCheck} />{" "}
                </p>
              </center>
            </div>
          </div>
        )}
      </>
      <>
        {loading && (
          <div className="animation">
            <div class="load">
              <div class="on"> </div>
              <div class="two"></div>
              <div class="three"></div>
            </div>
          </div>
        )}
      </>
    </>
  );
};

export default Valider;
