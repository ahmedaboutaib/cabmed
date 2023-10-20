import React, { useEffect, useState } from "react";
import "../../dashbordcss/deatilPaiement.css";

const DetailPaiement = ({
  fromPaiementDetail,
  changeFormPaiementDetail,
  services,
}) => {
  return (
    <>
      {fromPaiementDetail && (
        <div className="detailPaiement">
          <div id="popup" class="pop-up">
            <div class="pop-up-content">
              <div className="h3">
                <center>
                  <h3>Les Services De Paiement</h3>
                </center>
              </div>
              <span
                className="pclose"
                onClick={() => {
                  changeFormPaiementDetail();
                }}
              >
                &times;
              </span>
              <div className="scrl ">
                <div className="table">
                  <table>
                    <thead>
                      <tr>
                        <th>Nom de service</th>
                        <th>prix</th>
                        <th>description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {services.map((item, index) => (
                        <tr>
                          <td>{item.nom}</td>
                          <td>{item.prix} DH</td>
                          <td>{item.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="button">
                <button className="imprimer">Imprimer</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailPaiement;
