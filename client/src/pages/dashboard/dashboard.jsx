import React from "react";
import Dash1 from "./dash/dash1";
import Dash2 from "./dash/dash2";
import Dash3 from "./dash/dash3";

const Dashboard = () => {
  return (
    <>
      <Dash1 />
      <Dash2 />
      <Dash3 />
    </>
  );
};
export default Dashboard;
/*
const NavItem = ({ title, link, logo }) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      className={styles.navContainer}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Link
        className={`${styles.navLink} ${hover ? styles.navLinkHover : ""}`}
        to={link}
      >
        {logo}
        <span className={styles.navTitle}>{title}</span>
      </Link>
    </div>
  );
};


const items = [
  {
    title: "Dashboard",
    link: "dashboard/",
    icon: <IoStatsChart size={"1.4rem"} color={"white"} />,
  },
  {
    title: "Patients",
    link: "patients/",
    icon: <IoPerson size={"1.4rem"} color={"white"} />,
  },
  {
    title: "Rendez Vous",
    link: "rendezvous/",
    icon: <IoCalendar size={"1.4rem"} color={"white"} />,
  },
  {
    title: "Calendrier",
    link: "calendrier/",
    icon: <IoCalendar size={"1.4rem"} color={"white"} />,
  },
  {
    title: "Salle D'attent",
    link: "salledattent",
    icon: <IoCalendar size={"1.4rem"} color={"white"} />,
  },
  {
    title: "Dossiers Medicaux",
    link: "dossiersmedicaux/",
    icon: <IoFolder size={"1.4rem"} color={"white"} />,
  },
  {
    title: "Dépenses",
    link: "depenses/",
    icon: <IoCalculator size={"1.4rem"} color={"white"} />,
  },
  {
    title: "Paiement",
    link: "paiement/",
    icon: <IoSettings size={"1.4rem"} color={"white"} />,
  },
  {
    title: "Parametres",
    link: "parametres/",
    icon: <IoSettings size={"1.4rem"} color={"white"} />,
  },
];*/
