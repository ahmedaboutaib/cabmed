import React, { useEffect, useState } from "react";
import "../../dashbordcss/detailOrd.css";
import ImpremerOrdonnance from "../../imprimer/ImprimerOrdannce";
import { Login } from "../../../_helpers/service";

const DetailOrd = ({ detais, changeFormDetail, fromOrdDetail }) => {
  return (
    <>
      {fromOrdDetail && (
        <div className="detailord">
          <div id="popup" class="sup-popup">
            <div class="sup-popup-content">
              <div className="h3">
                <center>
                  <h3>Ordonnance</h3>
                </center>
              </div>
              <span
                className="sup-close"
                onClick={() => {
                  changeFormDetail();
                }}
              >
                &times;
              </span>
              <div className="scrol">
                <div className="table">
                  <table>
                    <thead>
                      <tr>
                        <th>Nom Medicament</th>
                        <th>description </th>
                      </tr>
                    </thead>
                    <tbody>
                      {detais.Medicaments.map((item, index) => (
                        <tr>
                          <td>{item.nom}</td>
                          <td>{item.Prescription.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="button">
                <ImpremerOrdonnance user={Login()?.user} ord={detais} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailOrd;
