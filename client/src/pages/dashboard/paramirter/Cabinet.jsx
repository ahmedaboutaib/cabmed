import React, { useEffect, useRef, useState } from "react";
import {
  faCheck,
  faInfoCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../paramitrecss/cabinet.css";
import { useCabinetId } from "../../_helpers/Tokin";
import {
  fetchCabinet,
  updateCabinet,
} from "../../../utils/creationCabMedAdmin";
import { Login, saveInfo, upInfo } from "../../_helpers/service";
import Valider from "../patient/valider";
const USER_REGEX = /^[a-zA-Z][a-zA-z0-9-_]{3,23}$/;
//const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const PWD_REGEX = /^(1){2,24}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MOROCCAN_PHONE_REGEX = /^(?:(?:\+|00)212|0)[6-7]\d{8}$/;
const Cabinet = () => {
  const userRef = useRef();

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

  const CabinetId = useCabinetId();
  const UpdateCabinets = async () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("nom", nomCabinet);
    formData.append("description", description);
    formData.append("ville", ville);
    formData.append("adresse", adresse);
    formData.append("tel", tel);
    formData.append("fixe", fixe);
    formData.append("email", emailcb);

    try {
      const resp = await updateCabinet(CabinetId, formData);
      upInfo({
        ...Login(),
        user: { ...Login()?.user, Cabinet: resp.cab },
        Cabinet: resp.cab,
      });
      changeValidForm();
    } catch (error) {
      console.error("error de medificatient de cabinet", error);
    }
  };
  const remplireCab = () => {
    const fetchCabinets = async () => {
      const resp = await fetchCabinet(CabinetId);
      setNomCabinet(resp.nom);
      setAdresse(resp.adresse);
      setDescription(resp.description);
      setEmailcb(resp.email);
      setFixe(resp.fixe);
      setVille(resp.ville);
      setTel(resp.tel);
    };
    fetchCabinets();
  };

  useEffect(() => {
    remplireCab();
  }, []);
  const [validForm, setValidForm] = useState(false);
  const changeValidForm = () => {
    setValidForm(!validForm);
  };

  return (
    <>
      <div id="an" className="cabinet util">
        <div className="h4">
          <center>
            <h4>les informations du cabinet</h4>
          </center>
        </div>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <label htmlFor="nom-cabinet">
            Nom du cabinet médical : <span className="obligatoir"> **</span>
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
            Adresse du cabinet médical : <span className="obligatoir"> **</span>
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
              TelFocus && tel && !validTel ? "instructions" : "offscreen"
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
          <label htmlFor="fixe">Téléphone fixe du cabinet médical :</label>
          <input
            type="text"
            name="fixe"
            id="tel"
            value={fixe}
            onChange={(event) => setFixe(event.target.value)}
          />
          <label htmlFor="nom-cabinet">
            ville du cabinet médical : <span className="obligatoir"> **</span>
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
            <span className={validEmailcb || !emailcb ? "hide" : "invalid"}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </label>
          <input
            type="text"
            id="Emailcb"
            value={emailcb}
            autoComplete="off"
            onChange={(event) => setEmailcb(event.target.value)}
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
            Adresse e-mail valide : <br /> doit contenir une seule arobase (@)
            et au moins un point (.) après l'arobase.
            <br />
            Elle doit également ne pas contenir d'espaces et commencer par une
            lettre ou un chiffre.
          </p>
          {/** */}
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
            <button onClick={remplireCab} className="annule">
              <a href="#an">Anmuler</a>
            </button>
            <button
              className="suivent"
              onClick={() => {
                UpdateCabinets();
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
              valider
            </button>
          </div>
        </form>
      </div>

      <Valider
        validForm={validForm}
        changeValidForm={changeValidForm}
        setValidForm={setValidForm}
      />
    </>
  );
};

export default Cabinet;
