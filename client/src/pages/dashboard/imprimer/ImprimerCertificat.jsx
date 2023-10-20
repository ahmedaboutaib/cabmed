import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import logo from "./img.webp";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ImprimerCertificat({ cert, user }) {
  const generatePDF = () => {
    const Layout = [
      {
        type: "certificat medical d arret de travail",
        content: `Je soussigné, Docteur ${user?.nom} ${user?.prenom}, certifie que Monsieur/Madame ${cert?.Patient?.nom} ${cert?.Patient?.prenom} souffre d'une maladie nécessitant un repos complet et prolongé. Par conséquent, je l'ai mis en arrêt de travail pour une durée de ${cert?.nombre} ${cert?.typeTemps}, à compter du ${cert?.dateDub}.`,
      },
      {
        type: "certificat medical de reprise du travail",
        content: `Je soussigné, Docteur ${user?.nom} ${user?.prenom}, certifie que Monsieur/Madame ${cert?.Patient?.nom} ${cert?.Patient?.prenom} est apte à reprendre son travail à compter du ${cert?.dateDub}. Cette personne a été soignée pour ${cert?.Patient?.nom} ${cert?.Patient?.prenom} et ne présente plus de risque pour sa santé ou celle de ses collègues.`,
      },
      {
        type: "certificat medical de non contre-indication a la pratique sportive",
        content: `Je soussigné,Docteur ${user?.nom} ${user?.prenom}, certifie que Monsieur/Madame ${cert?.Patient?.nom} ${cert?.Patient?.prenom} ne présente aucune contre-indication médicale à la pratique sportive. Cette personne peut pratiquer une activité sportive régulière dans des conditions normales.`,
      },
      {
        type: "certificat medical pour absence scolaire",
        content: `Je soussigné, Docteur ${user?.nom} ${user?.prenom}, certifie que Monsieur/Madame  ${cert?.Patient?.nom} ${cert?.Patient?.prenom} nécessite un arrêt scolaire pour une durée de  ${cert?.nombre} ${cert?.typeTemps}, à compter du ${cert?.dateDub}. Cette personne souffre d'une maladie   ${cert?.Patient?.nom} ${cert?.Patient?.prenom} qui nécessite un repos complet et une surveillance médicale régulière.`,
      },
      {
        type: "certificat medical de grossesse",
        content: `Je soussigné, Docteur ${user?.nom} ${user?.prenom}, certifie que Madame ${cert?.Patient?.nom} ${cert?.Patient?.prenom} est enceinte depuis ${cert?.nombre} ${cert?.typeTemps}. Cette grossesse se déroule normalement et ne présente pas de risques particuliers pour la santé de la mère ou de l'enfant.`,
      },
    ];
    // Créer un nouvel objet jsPDF
    const doc = new jsPDF();
    const dateActuel = () => {
      const dateActuelle = new Date();
      const annee = dateActuelle.getFullYear();
      const mois = (dateActuelle.getMonth() + 1).toString().padStart(2, "0");
      const jour = dateActuelle.getDate().toString().padStart(2, "0");
      const dateFormatee = `${annee}-${mois}-${jour}`;
      return dateFormatee;
    };
    const imgData = logo;
    const imgProps = doc.getImageProperties(imgData);
    const pdfWidth = doc.internal.pageSize.getWidth();
    const Cabinet = `CABINET  MEDICAL `;
    doc.setFontSize(20);
    doc.setTextColor("#333");
    doc.text(Cabinet, (pdfWidth - 75) / 2, 8);
    doc.line((pdfWidth - 75) / 2, 9, 135, 9);
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    doc.addImage(imgData, "JPEG", 160, 5, 60, 50);
    doc.addImage(imgData, "JPEG", 0, 5, 60, 50);
    // Ajouter du texte avec des styles CSS

    const dr = `Dr :  ${user?.nom} ${user?.prenom}`;
    doc.setFontSize(16);
    doc.setTextColor("rgb(59, 51, 51)");
    doc.text(dr, (pdfWidth - 66) / 2, 30);

    const NomCabinet = `${user?.Cabinet?.nom}`;
    doc.setFontSize(14);
    doc.setTextColor("rgb(59, 51, 51)");
    doc.text(NomCabinet, (pdfWidth - 66) / 2, 40);

    const adresse = `Adresse : ${user?.Cabinet?.adresse}`;
    const tel = `Tel : ${user?.Cabinet?.tel}`;
    const ville = `${user?.Cabinet?.ville}  , le ${dateActuel()} `;
    const adresseLines = doc.splitTextToSize(adresse, pdfWidth - 106);
    const telLines = doc.splitTextToSize(tel, pdfWidth - 106);
    const villeLine = doc.splitTextToSize(ville, 60);
    const totalLines = adresseLines.length + telLines.length;
    doc.setFontSize(12);
    doc.setTextColor("rgb(59, 51, 51)");
    doc.text(adresseLines, (pdfWidth - 66) / 2, 50);
    doc.text(telLines, (pdfWidth - 66) / 2, 50 + totalLines * 5);
    doc.text(villeLine, 150, 55 + totalLines * 5);
    const Certificat = `CERTIFICAT MEDICAL`;
    const totalLines2 = totalLines + villeLine.length + 1;
    doc.setFontSize(18);
    doc.setTextColor("#333");
    doc.text(Certificat, (pdfWidth - 66) / 2, 60 + totalLines2 * 5);
    doc.line(
      (pdfWidth - 66) / 2,
      61 + totalLines2 * 5,
      140,
      61 + totalLines2 * 5
    );
    for (let i = 0; i < Layout.length; i++) {
      if (Layout[i].type === cert?.type) {
        const ContentLine = doc.splitTextToSize(Layout[i].content, 270);
        const Med = `le Médecin`;
        const totalLines3 = totalLines2 + ContentLine.length + 1;
        doc.setFontSize(12);
        doc.setTextColor("rgb(59, 51, 51)");
        doc.text(ContentLine, 20, 70 + totalLines2 * 5);
        doc.text(Med, 160, 80 + totalLines3 * 5);
        doc.line(160, 81 + totalLines3 * 5, 182, 81 + totalLines3 * 5);
      }
    }

    //
    doc.save("Certificat.pdf");
    const pdfBlob = doc.output("blob");
    const pdfUrl = URL.createObjectURL(pdfBlob);
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = pdfUrl;
    document.body.appendChild(iframe);
    iframe.contentWindow.print();

    /*
    const pdfBlob = doc.output("blob");
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl, "_blank");
    
    doc.save("Certificat.pdf");
    doc.autoPrint();            
     //*/
  };

  return (
    <div>
      <button onClick={generatePDF}>
        <FontAwesomeIcon
          className="modifier"
          style={{ color: "blue" }}
          icon={faPrint}
        />
      </button>
    </div>
  );
}
export default ImprimerCertificat;
