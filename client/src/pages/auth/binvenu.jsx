import React from "react";
import "./authcss/binvenu.css";

const binvenu = () => {
  return (
    <div className="binven">
      <div className="container">
        <h1>Bienvenue sur notre site !</h1>
        <p>
          Vous pouvez accéder à notre <a href="/connexion"> page principale</a>{" "}
          en cliquant sur le lien ci-dessous.
        </p>
      </div>
    </div>
  );
};

export default binvenu;
