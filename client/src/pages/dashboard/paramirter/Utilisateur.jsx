import React, { useEffect, useState } from "react";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../paramitrecss/utilisateur.css";
import { Login } from "../../_helpers/service";
import { useNavigate } from "react-router-dom";
import { fetchUserToCab } from "../../../utils/creationCabMedAdmin";
import SuppUtil from "./SuppUtil";
import ModifierUtilisateur from "./ModifierUtilisateur";
import { useCabinetId } from "../../_helpers/Tokin";
import Valider from "../patient/valider";
const Utilisateur = () => {
  const nav = useNavigate();
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({
    nom: "",
    prenom: "",
    nomUtil: "",
    email: "",
    pwd: "",
    role: "",
    tel: "",
  });
  const [formUtilSupp, setFormUtilSupp] = useState(false);
  const changeFormUtilSupp = () => {
    setFormUtilSupp(!formUtilSupp);
  };
  const [formUtilMod, setFormaUtilMod] = useState(false);
  const changeFormUtilMod = () => {
    setFormaUtilMod(!formUtilMod);
  };
  const CabinetId = useCabinetId();
  const remplireUser = () => {
    const fetchUsers = async () => {
      try {
        if (!CabinetId) {
          return;
        }
        const response = await fetchUserToCab(CabinetId);
        setUsers(response);
      } catch (err) {
        console.error("error fetch uesrs", err);
      }
    };
    fetchUsers();
  };
  useEffect(() => {
    remplireUser();
  }, []);

  const [validForm, setValidForm] = useState(false);
  const changeValidForm = () => {
    setValidForm(!validForm);
  };
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter((user) =>
    `${user.nom} ${user.prenom}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="h3  util ">
        <center>
          <h2>Utilisateur</h2>
        </center>
      </div>
      <div className="mobileInf">
        <div className="utilisateur">
          <div className="rechercher">
            {" "}
            <input
              className=""
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher un patient"
            />
          </div>
          <div className="table">
            <table>
              <thead>
                <tr>
                  <th>Nom & Prenom</th>
                  <th>Nom Utilsateur</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th className="mobileCabMed">Telephone</th>
                  <th colspan="2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers &&
                  filteredUsers.map((items) => (
                    <tr key={items.id}>
                      <td>
                        {items.nom} {items.prenom}
                      </td>

                      <td>{items.nomUtil}</td>
                      <td>{items.email}</td>
                      <td>{items.role}</td>
                      <td className="mobileCabMed">{items.tel}</td>
                      <td>
                        {items.id !== Login()?.user?.id && (
                          <button
                            onClick={() => {
                              changeFormUtilSupp();
                              setUser(items);
                            }}
                          >
                            <FontAwesomeIcon className="supp" icon={faTrash} />
                          </button>
                        )}
                      </td>

                      <td>
                        <button
                          onClick={() => {
                            changeFormUtilMod();
                            setUser(items);
                          }}
                        >
                          <FontAwesomeIcon
                            className="modifier"
                            icon={faPencilAlt}
                          />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <SuppUtil
        changeFormUtilSupp={changeFormUtilSupp}
        formUtilSupp={formUtilSupp}
        user={user}
        remplireUser={remplireUser}
      />
      <ModifierUtilisateur
        user={user}
        setUser={setUser}
        changeFormUtilMod={changeFormUtilMod}
        formUtilMod={formUtilMod}
        remplireUser={remplireUser}
        changeValidForm={changeValidForm}
      />
      <Valider
        validForm={validForm}
        changeValidForm={changeValidForm}
        setValidForm={setValidForm}
      />
    </>
  );
};

export default Utilisateur;
