import React, { useEffect, useRef, useState } from "react";
import { createAdminAndCabinet } from "../../utils/creationCabMedAdmin";
import { useNavigate } from "react-router-dom";
import "./authcss/inscription.css";
import {
  faCheck,
  faInfoCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const USER_REGEX = /^[a-zA-Z][a-zA-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
//const PWD_REGEX = /^(1){2,24}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MOROCCAN_PHONE_REGEX = /^(?:(?:\+|00)212|0)[6-7]\d{8}$/;

const Helpers_inscription = ({
  suivet,
  nomCabinet,
  adresse,
  tel,
  fixe,
  ville,
  emailcb,
  file,
  description,
  setSuivent,
}) => {
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
  const creatCabinets = async () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("nomcb", nomCabinet);
    formData.append("description", description);
    formData.append("ville", ville);
    formData.append("adresse", adresse);
    formData.append("tel", tel);
    formData.append("fixe", fixe);
    formData.append("emailcb", emailcb);
    formData.append("nomUtil", nomAdmin);
    formData.append("prenom", prenomAdmin);
    formData.append("nom", nom);
    formData.append("telephone", telephone);
    formData.append("email", email);
    formData.append("pwd", modpass);

    try {
      const resp = await createAdminAndCabinet(formData);
      if (resp?.utilisateur) {
        nav("/binvenu");
        if (resp.response.status) {
          setErrMsg("email ou nom d'utilisateur déjà existant");
        }
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

  return (
    <>
      {suivet && (
        <div className="admin">
          <div className="h4">
            <center>
              <h4>Administrateur </h4>
            </center>
          </div>

          <label htmlFor="nom-ad">
            Nom de l'administrateur : <span className="obligatoir"> **</span>
          </label>
          <input
            type="text"
            name="nom-ad"
            id="nom-ad"
            value={nom}
            onChange={(event) => setNom(event.target.value)}
          />
          <label htmlFor="prenom-admin">
            Prénom de l'administrateur : <span className="obligatoir"> **</span>
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
            <span className={validTelephone || !telephone ? "hide" : "invalid"}>
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
            doit commencer par le préfixe +212, 00212 ou 0, suivi de l'indicatif
            de l'opérateur 6 ou 7,
            <br />
            et enfin de 8 chiffres supplémentaires.
          </p>
          {/** */}
          {/** */}
          <label htmlFor="Email">
            <span>
              {" "}
              Email de l'administrateur: <span className="obligatoir"> **</span>
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
              EmailFocus && email && !validEmail ? "instructions" : "offscreen"
            }
          >
            <FontAwesomeIcon className="info" icon={faInfoCircle} />
            Adresse e-mail valide : <br /> doit contenir une seule arobase (@)
            et au moins un point (.) après l'arobase.
            <br />
            Elle doit également ne pas contenir d'espaces et commencer par une
            lettre ou un chiffre.
          </p>
          {/** */}
          <label htmlFor="nom-admin">
            <span>
              {" "}
              Nom d'utilisateur : <span className="obligatoir"> **</span>{" "}
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
              userFocus && nomAdmin && !validName ? "instructions" : "offscreen"
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
            Il doit comporter des lettres majuscules et minuscules, un chiffre
            et une lettre séparée.
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
              confirmer mot de passe : <span className="obligatoir">
                {" "}
                **
              </span>{" "}
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
            className={matchFocus && !validMacht ? "instructions" : "offscreen"}
          >
            <FontAwesomeIcon className="info" icon={faInfoCircle} />
            Il doit correspondre au premier champ de saisie du mot de passe
          </p>
          <center>
            {" "}
            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
          </center>
          <div className="ins-button">
            <button
              className="retourner"
              onClick={() => {
                setSuivent(false);
              }}
              disabled={""}
            >
              Retourner
            </button>
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
                !prenomAdmin
                  ? true
                  : false
              }
              onClick={() => {
                creatCabinets();
              }}
            >
              Inscription{" "}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Helpers_inscription;
