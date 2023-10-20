import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import logo from "./img.webp";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ImprimerOrdonnance({ ord, user }) {
  const generatePDF = () => {
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
    const Certificat = `ORDANNCE MEDICAL`;
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
    const content = `PATIENT(E) : ${ord?.Patient?.nom}  ${ord?.Patient?.prenom}`;
    const ContentLine = doc.splitTextToSize(content, 270);
    const Med = `le Médecin`;
    const totalLines3 = totalLines2 + ContentLine.length + 1;
    const totalLines4 = ord?.Medicaments?.length + totalLines3 + 3;
    doc.setFontSize(14);
    doc.setTextColor("rgb(59, 51, 51)");
    doc.text(ContentLine, 20, 70 + totalLines2 * 5);
    doc.setFontSize(12);
    doc.setTextColor("rgb(59, 51, 51)");
    doc.text(Med, 160, 85 + totalLines4 * 7);
    doc.line(160, 86 + totalLines4 * 7, 182, 86 + totalLines4 * 7);

    //

    const table = document.getElementById("my-table");
    const tableData = doc.autoTableHtmlToJson(table);
    doc.autoTable({
      startY: 75 + totalLines2 * 5,
      head: [tableData.columns],
      body: tableData.data,
    });

    doc.save("ordonnance.pdf");
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
    
     doc.save("ordonnance.pdf");
    doc.autoPrint(); //*/
  };
  const ordonnace = ord?.Medicaments;

  return (
    <div>
      <button
        className="imprimer"
        style={{ fontSize: "20px" }}
        onClick={generatePDF}
      >
        <FontAwesomeIcon icon={faPrint} />
      </button>
      <table id="my-table" style={{ display: "none" }}>
        <thead>
          <tr>
            <th>Nom de medicament</th>
            <th>description </th>
          </tr>
        </thead>
        <tbody>
          {ordonnace?.map((items) => (
            <tr key={items.id}>
              <td>{items?.nom}</td>
              <td>{items?.Prescription?.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default ImprimerOrdonnance;
