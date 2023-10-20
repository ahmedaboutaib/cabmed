import React, { useEffect, useRef, useState } from "react";

import { createUtilisateur } from "../../../utils/creationCabMedAdmin";
import { useCabinetId } from "../../_helpers/Tokin";
import { useNavigate } from "react-router-dom";

import {
  faCheck,
  faInfoCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../paramitrecss/modifierUtil.css";
const USER_REGEX = /^[a-zA-Z][a-zA-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MOROCCAN_PHONE_REGEX = /^(?:(?:\+|00)212|0)[6-7]\d{8}$/;
const AjouterUtilisateur = () => {
  const nav = useNavigate();
  const CabinetId = useCabinetId();

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
  const createUser = async () => {
    const user = {
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
      const resp = await createUtilisateur(user);

      if (resp?.id) {
        return nav("/admin/utilisateurs");
      } else if (resp.response.status) {
        setErrMsg("email ou nom d'utilisateur déjà existant");
      }
    } catch (error) {
      if (error) {
        console.log("hhaaahiyaaa jaat", error);
        setErrMsg("aucune réponse du serveur");
      } else if (error.response?.status === 409) {
        setErrMsg("email ou nom d'utilisateur déjà existant");
      } else {
        setErrMsg("inscription échouée");
      }
      errRef.current.focus();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!CabinetId) {
      return;
    }
    createUser();

    // Code pour soumettre les données du formulaire
  };

  return (
    <>
      <div className="inscriptions">
        <section>
          <form onSubmit={handleSubmit}>
            <div className="admin">
              <div className="h1 ajouterUtil">
                <center>
                  <h1>Ajouter utilisateur </h1>
                </center>
              </div>

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
                  className={validTelephone || !telephone ? "hide" : "invalid"}
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
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="">selectionner un role</option>
                <option value="admin">admin</option>
                <option value="medecin">Médecin</option>
                <option value="secretaire">secrétaire</option>
              </select>
              <label htmlFor="Email">
                <span>
                  {" "}
                  Email de l'administrateur:{" "}
                  <span className="obligatoir"> **</span>
                </span>
                <span className={validEmail ? "valid" : "hide"}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validEmail || !email ? "hide" : "invalid"}>
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>
              <input
                type="text"
                id="Email"
                value={email}
                autoComplete="off"
                onChange={(event) => setEmail(event.target.value)}
                required
                aria-invalid={validEmail ? "false" : "true"}
                aria-describedby="emdnote"
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
              />
              <p
                id="emdnote"
                className={
                  EmailFocus && email && !validEmail
                    ? "instructions"
                    : "offscreen"
                }
              >
                <FontAwesomeIcon className="info" icon={faInfoCircle} />
                Adresse e-mail valide : <br /> doit contenir une seule arobase
                (@) et au moins un point (.) après l'arobase.
                <br />
                Elle doit également ne pas contenir d'espaces et commencer par
                une lettre ou un chiffre.
              </p>
              {/** */}
              <label htmlFor="nom-admin">
                <span>
                  {" "}
                  Nom d'utilisateur : <span className="obligatoir">
                    {" "}
                    **
                  </span>{" "}
                </span>
                <span className={validName ? "valid" : "hide"}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validName || !nomAdmin ? "hide" : "invalid"}>
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>
              <input
                type="text"
                name="nom-admin"
                id="nom-admin"
                value={nomAdmin}
                autoComplete="off"
                onChange={(event) => setNomAdmin(event.target.value)}
                required
                aria-invalid={validName ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
              />
              <p
                id="uidnote"
                className={
                  userFocus && nomAdmin && !validName
                    ? "instructions"
                    : "offscreen"
                }
              >
                <FontAwesomeIcon className="info" icon={faInfoCircle} />
                4 à 24 caractères
                <br />
                Il doit commencer par une lettre.
                <br />
                Lettres, chiffres, traits de soulignement et traits d'union
                autorisés
              </p>

              <label htmlFor="modpass">
                <span>
                  {" "}
                  mot de passe : <span className="obligatoir"> **</span>{" "}
                </span>
                <span className={validPwd ? "valid" : "hide"}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validPwd || !modpass ? "hide" : "invalid"}>
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
                className={PwdFocus && !validPwd ? "instructions" : "offscreen"}
              >
                <FontAwesomeIcon className="info" icon={faInfoCircle} />
                8 à 24 caractères
                <br />
                Il doit comporter des lettres majuscules et minuscules, un
                chiffre et une lettre séparée.
                <br />
                Caractères spéciaux autorisés : :{" "}
                <span aria-label="exclamation mark">!</span>{" "}
                <span aria-label="at symbol">@</span>
                <span aria-label="hashtag">#</span>
                <span aria-label="dollar sign">$</span>
                <span aria-label="percent">%</span>
              </p>

              {/*  */}
              <label htmlFor="match">
                <span>
                  {" "}
                  confirmer mot de passe :{" "}
                  <span className="obligatoir"> **</span>{" "}
                </span>
                <span className={validMacht && matchPwd ? "valid" : "hide"}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validMacht || !matchPwd ? "hide" : "invalid"}>
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>
              <input
                type="password"
                name="match"
                id="match"
                value={matchPwd}
                onChange={(event) => setMatchPwd(event.target.value)}
                required
                aria-invalid={validMacht ? "false" : "true"}
                aria-describedby="mchdnote"
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
              />
              <p
                id="mchdnote"
                className={
                  matchFocus && !validMacht ? "instructions" : "offscreen"
                }
              >
                <FontAwesomeIcon className="info" icon={faInfoCircle} />
                Il doit correspondre au premier champ de saisie du mot de passe
              </p>
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
                    !validName ||
                    !validMacht ||
                    !validPwd ||
                    !validEmail ||
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
    </>
  );
};

export default AjouterUtilisateur;
