import React, { useEffect, useRef, useState } from "react";
import "../paramitrecss/modifierUtil.css";

import { updateUser } from "../../../utils/creationCabMedAdmin";
import { useCabinetId } from "../../_helpers/Tokin";
import { Login } from "../../_helpers/service";

import {
  faCheck,
  faInfoCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const USER_REGEX = /^[a-zA-Z][a-zA-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MOROCCAN_PHONE_REGEX = /^(?:(?:\+|00)212|0)[6-7]\d{8}$/;

const modifierUtilisateur = ({
  user,
  changeFormUtilMod,
  formUtilMod,
  remplireUser,
  changeValidForm,
}) => {
  const CabinetId = useCabinetId();
  const nav = useNavigate();
  const errRef = useRef();
  const [nom, setNom] = useState("");
  const [prenomAdmin, setPrenomAdmin] = useState("");
  const [nomAdmin, setNomAdmin] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [modpass, setModpass] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [PwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMacht, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [EmailFocus, setEmailFocus] = useState(false);

  const [telephone, setTelephone] = useState("");
  const [validTelephone, setValidTelephone] = useState(false);
  const [TelephoneFocus, setTelephoneFocus] = useState(false);
  const [role, setRole] = useState();
  useEffect(() => {
    const result = MOROCCAN_PHONE_REGEX.test(telephone);
    setValidTelephone(result);
  }, [telephone]);
  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = USER_REGEX.test(nomAdmin);
    setValidName(result);
  }, [nomAdmin]);

  useEffect(() => {
    const result = PWD_REGEX.test(modpass);
    setValidPwd(result);
    const match = modpass === matchPwd;
    setValidMatch(match);
  }, [modpass, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [nomAdmin, modpass, matchPwd]);

  const [errMsg, setErrMsg] = useState("");
  const UpdateUser = async () => {
    const users = {
      nom: nom,
      nomUtil: nomAdmin,
      prenom: prenomAdmin,
      tel: telephone,
      email: email,
      pwd: modpass,
      role: role,
      CabinetId: CabinetId,
    };

    try {
      const resp = await updateUser(user.id, users);

      if (resp.utilisateur.id === Login()?.user?.id) {
        return nav("/connexion");
      }
      changeValidForm();
      changeFormUtilMod();
      remplireUser();
    } catch (error) {
      console.error("error de modification de user");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!CabinetId) {
      return;
    }
    UpdateUser();

    // Code pour soumettre les données du formulaire
  };
  useEffect(() => {
    setNom(user.nom);
    setEmail(user.email);
    setNomAdmin(user.nomUtil);
    setRole(user.role);
    setTelephone(user.tel);
    setPrenomAdmin(user.prenom);
  }, [user]);

  return (
    <>
      {formUtilMod && (
        <div className="UtilMod">
          <div id="popup" class="popup">
            <div class="popup-content">
              <div className="h4">
                <center>
                  <h4>Modifier Utilisateur </h4>
                </center>
              </div>
              <span className="close" onClick={changeFormUtilMod}>
                &times;
              </span>
              <div
                className="inscriptions"
                style={{
                  backgroundColor: "#f6f6f6",
                }}
              >
                <section>
                  <form onSubmit={handleSubmit}>
                    <div className="admin">
                      <label htmlFor="nom-ad">
                        Nom de l'administrateur :{" "}
                        <span className="obligatoir"> **</span>
                      </label>
                      <input
                        type="text"
                        name="nom-ad"
                        id="nom-ad"
                        value={nom}
                        onChange={(event) => setNom(event.target.value)}
                      />
                      <label htmlFor="prenom-admin">
                        Prénom de l'administrateur :{" "}
                        <span className="obligatoir"> **</span>
                      </label>
                      <input
                        type="text"
                        name="prenom-admin"
                        id="prenom-admin"
                        value={prenomAdmin}
                        onChange={(event) => setPrenomAdmin(event.target.value)}
                      />

                      <label htmlFor="telephone">
                        <span>Telphone de l'administrateur : </span>
                        <span className="obligatoir"> **</span>
                        <span className={validTelephone ? "valid" : "hide"}>
                          <FontAwesomeIcon icon={faCheck} />
                        </span>
                        <span
                          className={
                            validTelephone || !telephone ? "hide" : "invalid"
                          }
                        >
                          <FontAwesomeIcon icon={faTimes} />
                        </span>
                      </label>
                      <input
                        type="text"
                        name="telephone"
                        id="telephone"
                        value={telephone}
                        onChange={(event) => setTelephone(event.target.value)}
                        required
                        aria-invalid={validTelephone ? "false" : "true"}
                        aria-describedby="teldnote"
                        onFocus={() => setTelephoneFocus(true)}
                        onBlur={() => setTelephoneFocus(false)}
                      />
                      <p
                        id="teldnote"
                        className={
                          TelephoneFocus && telephone && !validTelephone
                            ? "instructions"
                            : "offscreen"
                        }
                      >
                        <FontAwesomeIcon className="info" icon={faInfoCircle} />
                        Numéro de téléphone valide : <br />
                        doit commencer par le préfixe +212, 00212 ou 0, suivi de
                        l'indicatif de l'opérateur 6 ou 7,
                        <br />
                        et enfin de 8 chiffres supplémentaires.
                      </p>
                      {/** */}
                      {/** */}
                      <label htmlFor="">
                        Role:<span className="obligatoir"> **</span>{" "}
                      </label>
                      <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                      >
                        <option value="">selectionner un role</option>
                        <option value="admin">admin</option>
                        <option value="medecin">Médecin</option>
                        <option value="secretaire">secrétaire</option>
                      </select>

                      <label htmlFor="modpass">
                        <span>
                          {" "}
                          mot de passe : <span className="obligatoir">
                            {" "}
                            **
                          </span>{" "}
                        </span>
                        <span className={validPwd ? "valid" : "hide"}>
                          <FontAwesomeIcon icon={faCheck} />
                        </span>
                        <span
                          className={validPwd || !modpass ? "hide" : "invalid"}
                        >
                          <FontAwesomeIcon icon={faTimes} />
                        </span>
                      </label>
                      <input
                        type="password"
                        name="modpass"
                        id="modpass"
                        value={modpass}
                        onChange={(event) => setModpass(event.target.value)}
                        required
                        aria-invalid={validPwd ? "false" : "true"}
                        aria-describedby="pwdnote"
                        onFocus={() => setPwdFocus(true)}
                        onBlur={() => setPwdFocus(false)}
                      />
                      <p
                        id="pwdnote"
                        className={
                          PwdFocus && !validPwd ? "instructions" : "offscreen"
                        }
                      >
                        <FontAwesomeIcon className="info" icon={faInfoCircle} />
                        8 à 24 caractères
                        <br />
                        Il doit comporter des lettres majuscules et minuscules,
                        un chiffre et une lettre séparée.
                        <br />
                        Caractères spéciaux autorisés : :{" "}
                        <span aria-label="exclamation mark">!</span>{" "}
                        <span aria-label="at symbol">@</span>
                        <span aria-label="hashtag">#</span>
                        <span aria-label="dollar sign">$</span>
                        <span aria-label="percent">%</span>
                      </p>

                      {/*  */}

                      <center>
                        {" "}
                        <p
                          ref={errRef}
                          className={errMsg ? "errmsg" : "offscreen"}
                          aria-lave="assertive"
                        >
                          {errMsg}
                        </p>
                      </center>
                      <div className="ins-button">
                        <button
                          type="submit"
                          className="ins"
                          disabled={
                            !validPwd ||
                            !validTelephone ||
                            !nom ||
                            !prenomAdmin ||
                            !role
                              ? true
                              : false
                          }
                        >
                          valider{" "}
                        </button>
                      </div>
                    </div>
                  </form>
                </section>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default modifierUtilisateur;

/**







import React from "react";
import "../paramitrecss/modifierUtil.css";

import { updateUser } from "../../../utils/creationCabMedAdmin";
import { useCabinetId } from "../../_helpers/Tokin";
import { Login } from "../../_helpers/service";

const modifierUtilisateur = ({
  user,
  setUser,
  changeFormUtilMod,
  formUtilMod,
  remplireUser,
}) => {
  const CabinetId = useCabinetId();
  const med = () => {
    return "medecin";
  };
  const sec = () => {
    return "secretaire";
  };
  const sbmitUtilMod = (event) => {
    event.preventDefault();
    if (!CabinetId) {
      return;
    }
    const updateUtil = async () => {
      try {
        const resp = await updateUser(user);
        changeFormUtilMod();
        remplireUser();
      } catch (err) {
        console.error("error de modification", err);
      }
    };
    updateUtil();
  };
  return (
    <>
      {formUtilMod && (
        <div className="UtilMod">
          <div id="popup" class="popup">
            <div class="popup-content">
              <span className="close" onClick={changeFormUtilMod}>
                &times;
              </span>

              <form action="" onSubmit={(event) => sbmitUtilMod(event)}>
                <label>nom</label>
                <input
                  type="text"
                  onChange={(event) =>
                    setUser({
                      ...user,
                      nom: event.target.value,
                    })
                  }
                  value={user.nom}
                />
                <label>prenom</label>
                <input
                  type="text"
                  onChange={(event) =>
                    setUser({
                      ...user,
                      prenom: event.target.value,
                    })
                  }
                  value={user.prenom}
                />
                <label htmlFor="">email</label>
                <input
                  type="email"
                  onChange={(event) =>
                    setUser({
                      ...user,
                      email: event.target.value,
                    })
                  }
                  value={user.email}
                />
                <label htmlFor="">modpass</label>
                <input
                  type="text"
                  onChange={(event) =>
                    setUser({
                      ...user,
                      pwd: event.target.value,
                    })
                  }
                />
                <label htmlFor="">Telephone</label>
                <input
                  type="text"
                  onChange={(event) =>
                    setUser({
                      ...user,
                      tel: event.target.value,
                    })
                  }
                  value={user.tel}
                />
                {user.id !== Login()?.user?.id && (
                  <>
                    {" "}
                    <label htmlFor=""> Role</label>
                    <select
                      value={user.role}
                      onChange={(event) =>
                        setUser({
                          ...user,
                          role: event.target.value,
                        })
                      }
                    >
                      <option value={user.role}>{user.role}</option>

                      {user.role !==
                        med(<option value="medecin">Médecin</option>)}
                      {user.role !==
                        sec(<option value="secretaire">secrétaire</option>)}
                    </select>{" "}
                  </>
                )}
                <button className="btn-v" type="submit">
                  valider
                </button>
                <button
                  onClick={changeFormUtilMod}
                  className="btn-n"
                  type="submit"
                >
                  annule
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default modifierUtilisateur;
/*
{user.id !== Login()?.user?.id && (
                  <>
                    {" "}
                    <label htmlFor=""> Role</label>
                    <select
                      value={user.role}
                      onChange={(event) =>
                        setUser({
                          ...user,
                          role: event.target.value,
                        })
                      }
                    >
                      <option value={user.role}>{user.role}</option>
                      <option value="admin">admin</option>
                      {user.role !==
                        "medecin"(<option value="medecin">Médecin</option>)}
                      {user.role !==
                        "secretaire"(
                          <option value="secretaire">secrétaire</option>
                        )}
                    </select>{" "}
                  </>
                )}*/
