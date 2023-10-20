import React, { useEffect, useReducer, useRef, useState } from "react";
import "./authcss/inscription.css";
import { useNavigate } from "react-router-dom";
import {
  faCheck,
  faInfoCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Helpers_inscription from "./_helpers_inscription";
import photoDocteurPatient from "../../assets/doctor-patient.jpg";
const USER_REGEX = /^[a-zA-Z][a-zA-z0-9-_]{3,23}$/;
//const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const PWD_REGEX = /^(1){2,24}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MOROCCAN_PHONE_REGEX = /^(?:(?:\+|00)212|0)[6-7]\d{8}$/;

const Inscription = () => {
  const userRef = useRef();

  const [success, setSuccess] = useState(false);

  const [nomCabinet, setNomCabinet] = useState("");
  const [description, setDescription] = useState("");
  const [ville, setVille] = useState("");
  const [adresse, setAdresse] = useState("");

  const [emailcb, setEmailcb] = useState("");
  const [validEmailcb, setValidEmailcb] = useState(false);
  const [EmailcbFocus, setEmailcbFocus] = useState(false);

  const [tel, setTel] = useState("");
  const [validTel, setValidTel] = useState(false);
  const [TelFocus, setTelFocus] = useState(false);

  const [fixe, setFixe] = useState("");

  const [file, setFile] = useState([]);

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const result = MOROCCAN_PHONE_REGEX.test(tel);
    setValidTel(result);
  }, [tel]);
  useEffect(() => {
    const result = EMAIL_REGEX.test(emailcb);
    setValidEmailcb(result);
  }, [emailcb]);

  const handleFileInputChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const [suivet, setSuivent] = useState(false);

  return (
    <div className="inscrirrr">
      <div className="inscription-cover">
        {" "}
        <div id="admin" className="inscription">
          <section>
            <div className="h1">
              <h1>
                <center>Inscription</center>{" "}
              </h1>
            </div>
            <center>
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <center>
                  {" "}
                  <div className="num">
                    <span className={suivet ? "span" : "span1"}>1</span>{" "}
                    <span className={suivet ? "span2" : "span"}>2</span>{" "}
                  </div>
                </center>
                {suivet || (
                  <div className="cabinet">
                    <div className="h4">
                      <center>
                        <h4>les informations du cabinet</h4>
                      </center>
                    </div>
                    <label style={{ marginTop: "2em" }} htmlFor="nom-cabinet">
                      Nom du cabinet médical :{" "}
                      <span className="obligatoir"> **</span>
                    </label>
                    <input
                      type="text"
                      name="nom-cabinet"
                      id="nom-cabinet"
                      ref={userRef}
                      value={nomCabinet}
                      onChange={(event) => setNomCabinet(event.target.value)}
                      required
                    />
                    <label htmlFor="adres">
                      Adresse du cabinet médical :{" "}
                      <span className="obligatoir"> **</span>
                    </label>
                    <input
                      type="text"
                      name="adres"
                      id="adres"
                      value={adresse}
                      onChange={(event) => setAdresse(event.target.value)}
                      required
                    />
                    {/** */}
                    <label htmlFor="tel">
                      <span>Telphone du cabinet médical : </span>
                      <span className="obligatoir"> **</span>
                      <span className={validTel ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck} />
                      </span>
                      <span className={validTel || !tel ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes} />
                      </span>
                    </label>
                    <input
                      type="text"
                      name="tel"
                      id="tel"
                      value={tel}
                      onChange={(event) => setTel(event.target.value)}
                      required
                      aria-invalid={validTel ? "false" : "true"}
                      aria-describedby="telcbdnote"
                      onFocus={() => setTelFocus(true)}
                      onBlur={() => setTelFocus(false)}
                    />
                    <p
                      id="telcbdnote"
                      className={
                        TelFocus && tel && !validTel
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
                    <label htmlFor="fixe">
                      Téléphone fixe du cabinet médical :
                    </label>
                    <input
                      type="text"
                      name="fixe"
                      id="tel"
                      value={fixe}
                      onChange={(event) => setFixe(event.target.value)}
                    />
                    <label htmlFor="nom-cabinet">
                      ville du cabinet médical :{" "}
                      <span className="obligatoir"> **</span>
                    </label>
                    <input
                      type="text"
                      name="ville"
                      id="ville"
                      value={ville}
                      onChange={(event) => setVille(event.target.value)}
                      required
                    />
                    {/** */}
                    <label htmlFor="Emailcb">
                      <span> email du cabinet médical : </span>
                      <span className={validEmailcb ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck} />
                      </span>
                      <span
                        className={
                          validEmailcb || !emailcb ? "hide" : "invalid"
                        }
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </span>
                    </label>
                    <input
                      type="text"
                      id="Emailcb"
                      value={emailcb}
                      autoComplete="off"
                      onChange={(event) => setEmailcb(event.target.value)}
                      required
                      aria-invalid={validEmailcb ? "false" : "true"}
                      aria-describedby="emcbdnote"
                      onFocus={() => setEmailcbFocus(true)}
                      onBlur={() => setEmailcbFocus(false)}
                    />
                    <p
                      id="emcbdnote"
                      className={
                        EmailcbFocus && emailcb && !validEmailcb
                          ? "instructions"
                          : "offscreen"
                      }
                    >
                      <FontAwesomeIcon className="info" icon={faInfoCircle} />
                      Adresse e-mail valide : <br /> doit contenir une seule
                      arobase (@) et au moins un point (.) après l'arobase.
                      <br />
                      Elle doit également ne pas contenir d'espaces et commencer
                      par une lettre ou un chiffre.
                    </p>
                    {/** */}
                    <label htmlFor="logo">logo</label>
                    <input
                      id="logo"
                      onChange={handleFileInputChange}
                      type="file"
                      name="logo"
                      style={{
                        padding: "5px",
                        borderRadius: "10px",
                      }}
                    />
                    <label htmlFor="description">Description :</label>
                    <textarea
                      name="description"
                      id="description"
                      cols="20"
                      rows="4"
                      value={description}
                      onChange={(event) => setDescription(event.target.value)}
                    ></textarea>{" "}
                    <div className="ins-button">
                      <button
                        className="suivent"
                        onClick={() => {
                          setSuivent(true);
                        }}
                        disabled={
                          !nomCabinet ||
                          !adresse ||
                          !ville ||
                          !validTel ||
                          (emailcb && !validEmailcb)
                            ? true
                            : false
                        }
                      >
                        <a href="#admin">Suivent</a>
                      </button>
                    </div>
                  </div>
                )}

                <Helpers_inscription
                  suivet={suivet}
                  nomCabinet={nomCabinet}
                  adresse={adresse}
                  tel={tel}
                  fixe={fixe}
                  ville={ville}
                  emailcb={emailcb}
                  file={file}
                  description={description}
                  setSuivent={setSuivent}
                />
              </form>
            </center>
          </section>{" "}
        </div>
      </div>
    </div>
  );
};
export default Inscription;

/**
 import React, { useEffect, useReducer, useRef, useState } from "react";
import "./authcss/inscription.css";
import {
  createAdmin,
  createCabmed,
  createUtilisateur,
} from "../../utils/creationCabMedAdmin";
import { useNavigate } from "react-router-dom";
import {
  faCheck,
  faInfoCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const USER_REGEX = /^[a-zA-Z][a-zA-z0-9-_]{3,23}$/;
//const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const PWD_REGEX = /^(1){2,24}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MOROCCAN_PHONE_REGEX = /^(?:(?:\+|00)212|0)[6-7]\d{8}$/;

const Inscription = () => {
  const nav = useNavigate();

  const userRef = useRef();
  const errRef = useRef();

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

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const [nomCabinet, setNomCabinet] = useState("");
  const [description, setDescription] = useState("");
  const [ville, setVille] = useState("");
  const [adresse, setAdresse] = useState("");

  const [emailcb, setEmailcb] = useState("");
  const [validEmailcb, setValidEmailcb] = useState(false);
  const [EmailcbFocus, setEmailcbFocus] = useState(false);

  const [tel, setTel] = useState("");
  const [validTel, setValidTel] = useState(false);
  const [TelFocus, setTelFocus] = useState(false);

  const [fixe, setFixe] = useState("");
  const [nom, setNom] = useState("");
  const [prenomAdmin, setPrenomAdmin] = useState("");

  const [idCabMed, setIdCabMed] = useState(0);

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

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
    console.log(result);
    console.log(nomAdmin);
    setValidName(result);
  }, [nomAdmin]);

  useEffect(() => {
    const result = PWD_REGEX.test(modpass);
    console.log("eeeeee", result);
    console.log(modpass);
    setValidPwd(result);
    const match = modpass === matchPwd;
    setValidMatch(match);
  }, [modpass, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [nomAdmin, modpass, matchPwd]);
  useEffect(() => {
    const result = MOROCCAN_PHONE_REGEX.test(tel);
    setValidTel(result);
  }, [tel]);
  useEffect(() => {
    const result = EMAIL_REGEX.test(emailcb);
    setValidEmailcb(result);
  }, [emailcb]);

  const handleFileInputChange = (event) => {
    setFile(event.target.files[0]);
  };
  const [file, setFile] = useState([]);

  const creatCabinets = async () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("nom", nomCabinet);
    formData.append("description", description);
    formData.append("ville", ville);
    formData.append("adresse", adresse);
    formData.append("tel", tel);
    formData.append("fixe", fixe);
    formData.append("email", emailcb);
    formData.append("id", idCabMed);

    try {
      const resp = await createCabmed(formData);
      resp.id;
      setIdCabMed(resp?.id);
      if (resp.id) {
        createUser(resp.id);
      }
    } catch (err) {
      console.error("errore de creation de cabent", err);
      return nav("/inscription");
    }
  };

  const createUser = async (id) => {
    try {
      const user = {
        nomUtil: nomAdmin,
        prenom: prenomAdmin,
        nom: nom,
        tel: telephone,
        email: email,
        pwd: modpass,
        role: "admin",
        CabinetId: id,
      };
      const response = await createAdmin(user);
      if (response.id) {
        nav("/binvenu");
      }
    } catch (error) {
      if (!error?.response) {
        setErrMsg("aucan reponce de server ");
      } else if (error.response?.status == 409) {
        setErrMsg("email ou nom utilisateur  d'éja exist");
      } else {
        setErrMsg("inscriprion echc");
      }
    }
    errRef.current.focus();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const [suivet, setSuivent] = useState(false);

  return (
    <>
      {" "}
      <div id="admin" className="inscription">
        <section>
          <div className="h1">
            <h1>
              <center>Inscription</center>{" "}
            </h1>
          </div>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <center>
              {" "}
              <div className="num">
                <span className={suivet ? "span" : "span1"}>1</span>{" "}
                <span className={suivet ? "span2" : "span"}>2</span>{" "}
              </div>
            </center>
            {suivet || (
              <div className="cabinet">
                <div className="h4">
                  <center>
                    <h4>les informations du cabinet</h4>
                  </center>
                </div>
                <label htmlFor="nom-cabinet">
                  Nom du cabinet médical :{" "}
                  <span className="obligatoir"> **</span>
                </label>
                <input
                  type="text"
                  name="nom-cabinet"
                  id="nom-cabinet"
                  value={nomCabinet}
                  onChange={(event) => setNomCabinet(event.target.value)}
                  required
                />
                <label htmlFor="adres">
                  Adresse du cabinet médical :{" "}
                  <span className="obligatoir"> **</span>
                </label>
                <input
                  type="text"
                  name="adres"
                  id="adres"
                  value={adresse}
                  onChange={(event) => setAdresse(event.target.value)}
                  required
                />
            
                <label htmlFor="tel">
                  <span>Telphone du cabinet médical : </span>
                  <span className="obligatoir"> **</span>
                  <span className={validTel ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <span className={validTel || !tel ? "hide" : "invalid"}>
                    <FontAwesomeIcon icon={faTimes} />
                  </span>
                </label>
                <input
                  type="text"
                  name="tel"
                  id="tel"
                  value={tel}
                  onChange={(event) => setTel(event.target.value)}
                  required
                  aria-invalid={validTel ? "false" : "true"}
                  aria-describedby="telcbdnote"
                  onFocus={() => setTelFocus(true)}
                  onBlur={() => setTelFocus(false)}
                />
                <p
                  id="telcbdnote"
                  className={
                    TelFocus && tel && !validTel ? "instructions" : "offscreen"
                  }
                >
                  <FontAwesomeIcon className="info" icon={faInfoCircle} />
                  Numéro de téléphone valide : <br />
                  doit commencer par le préfixe +212, 00212 ou 0, suivi de
                  l'indicatif de l'opérateur 6 ou 7,
                  <br />
                  et enfin de 8 chiffres supplémentaires.
                </p>
           
                <label htmlFor="fixe">
                  Téléphone fixe du cabinet médical :
                </label>
                <input
                  type="text"
                  name="fixe"
                  id="tel"
                  value={fixe}
                  onChange={(event) => setFixe(event.target.value)}
                />
                <label htmlFor="nom-cabinet">
                  ville du cabinet médical :{" "}
                  <span className="obligatoir"> **</span>
                </label>
                <input
                  type="text"
                  name="ville"
                  id="ville"
                  value={ville}
                  onChange={(event) => setVille(event.target.value)}
                  required
                />
             
                <label htmlFor="Emailcb">
                  <span> email du cabinet médical : </span>
                  <span className={validEmailcb ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <span
                    className={validEmailcb || !emailcb ? "hide" : "invalid"}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </span>
                </label>
                <input
                  type="text"
                  id="Emailcb"
                  value={emailcb}
                  autoComplete="off"
                  onChange={(event) => setEmailcb(event.target.value)}
                  required
                  aria-invalid={validEmailcb ? "false" : "true"}
                  aria-describedby="emcbdnote"
                  onFocus={() => setEmailcbFocus(true)}
                  onBlur={() => setEmailcbFocus(false)}
                />
                <p
                  id="emcbdnote"
                  className={
                    EmailcbFocus && emailcb && !validEmailcb
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
             
                <label htmlFor="logo">logo</label>
                <input
                  id="logo"
                  onChange={handleFileInputChange}
                  type="file"
                  name="logo"
                />
                <label htmlFor="description">Description :</label>
                <textarea
                  name="description"
                  id="description"
                  cols="20"
                  rows="4"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                ></textarea>{" "}
                <div className="ins-button">
                  <button
                    className="suivent"
                    onClick={() => {
                      setSuivent(true);
                    }}
                    disabled={
                      !nomCabinet ||
                      !adresse ||
                      !ville ||
                      !validTel ||
                      (emailcb && !validEmailcb)
                        ? true
                        : false
                    }
                  >
                    <a href="#admin">Suivent</a>
                  </button>
                </div>
              </div>
            )}

            {suivet && (
              <div className="admin">
                <div className="h4">
                  <center>
                    <h4>Administrateur </h4>
                  </center>
                </div>

                <label htmlFor="nom-ad">Nom de l'administrateur :</label>
                <input
                  type="text"
                  name="nom-ad"
                  id="nom-ad"
                  value={nom}
                  onChange={(event) => setNom(event.target.value)}
                />
                <label htmlFor="prenom-admin">
                  Prénom de l'administrateur :
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
               
                <label htmlFor="Email">
                  <span> Email de l'administrateur: </span>
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
          
                <label htmlFor="nom-admin">
                  <span> Nom d'utilisateur : </span>
                  <span className={validName ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <span className={validName || !nomAdmin ? "hide" : "invalid"}>
                    <FontAwesomeIcon icon={faTimes} />
                  </span>
                </label>
                <input
                  ref={userRef}
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
                  <span> mot de passe : </span>
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
                  className={
                    PwdFocus && !validPwd ? "instructions" : "offscreen"
                  }
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

                <label htmlFor="match">
                  <span> confirmer mot de passe : </span>
                  <span className={validMacht && matchPwd ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <span
                    className={validMacht || !matchPwd ? "hide" : "invalid"}
                  >
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
                  Il doit correspondre au premier champ de saisie du mot de
                  passe
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
                      !validName || !validMacht || !validPwd ? true : false
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
          </form>
        </section>{" "}
      </div>
    </>
  );
};
export default Inscription;

 */
