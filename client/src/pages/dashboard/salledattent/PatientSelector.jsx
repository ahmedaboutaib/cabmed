import React from "react";

const PatientSelector = () => {
  return <div>PatientSelector</div>;
};

export default PatientSelector;

/*import React, { useEffect } from "react";
import io from "socket.io-client";
const socket = io.connect();
const MyComponent = () => {
 

  return (
    <>
      <div>
        <input />
        <button>seb mesage</button>
      </div>
    </>
  );
};

export default MyComponent;*/

/*import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import logo from "./img.webp";

function GeneratePDF({ cert }) {
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

    const dr = `Dr :  Ahmed Aboutaib`;
    doc.setFontSize(16);
    doc.setTextColor("rgb(59, 51, 51)");
    doc.text(dr, (pdfWidth - 66) / 2, 30);

    const NomCabinet = `CAb Med`;
    doc.setFontSize(14);
    doc.setTextColor("rgb(59, 51, 51)");
    doc.text(NomCabinet, (pdfWidth - 66) / 2, 40);

    const adresse = `Adress: DR LAKRAKCHA LAMZEM EL KWLAA `;
    const tel = `Tel : 06 82 27 84 55`;
    const ville = `ville  , le ${dateActuel()} `;
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

    const Content = `Les formes anciennes du Moyen Âge désignent au xiie siècle le volume qui contient le texte sacré des Évangiles, puis au xiiie siècle, le texte original d'un livre saint ou des propos de quelqu'un. Au xviie siècle le mot s’applique au passage d'un ouvrage pris comme référence et au début du xixe siècle le mot texte a son sens général d'« écrit »6.`;
    const ContentLine = doc.splitTextToSize(Content, 270);
    const Med = `le Médecin`;
    const totalLines3 = totalLines2 + ContentLine.length + 1;
    doc.setFontSize(12);
    doc.setTextColor("rgb(59, 51, 51)");
    doc.text(ContentLine, 20, 70 + totalLines2 * 5);
    doc.text(Med, 160, 80 + totalLines3 * 5);
    doc.line(160, 81 + totalLines3 * 5, 182, 81 + totalLines3 * 5);

    //
    const pdfBlob = doc.output("blob");
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl, "_blank");
  };

  return (
    <div>
      <button onClick={generatePDF}>Générer et afficher le PDF</button>
    </div>
  );
}

export default GeneratePDF;

/*



import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable"; 


function GeneratePDF({ cert }) {
  const generatePDF = () => {
    // Créer un nouvel objet jsPDF
    const doc = new jsPDF();

    // Ajouter un titre au PDF
    doc.text("Exemple de PDF généré en React JS", 14, 20);

    // Ajouter une table HTML au PDF
    const table = document.getElementById("my-table");
    const tableData = doc.autoTableHtmlToJson(table);
    doc.autoTable({
      startY: 30,
      head: [tableData.columns],
      body: tableData.data,
    });

    // Enregistrer le PDF et afficher dans le navigateur
    /* const pdfBlob = doc.output("blob");
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl, "_blank");

    const pdfBlob = doc.output("blob");
    const pdfUrl = URL.createObjectURL(pdfBlob);
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = pdfUrl;
    document.body.appendChild(iframe);
    iframe.contentWindow.print();
  };

  const prsonme = {
    mane: `hhhdhdhdhhdhd  ${cert.dateDub}`,
  };

  return (
    <div>
      <button onClick={generatePDF}  >Générer et afficher le PDF</button>
      <table id="my-table" style={{ display: "none" }}>
        <thead>
          <tr style={{ color: "red" }}>
            <th>ID</th>
            <th>Nom</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{prsonme.mane}</td>
            <td>John Doe</td>
            <td>john.doe@example.com</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jane Doe</td>
            <td>jane.doe@example.com</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Jane Doe</td>
            <td>jane.doe@example.com</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default GeneratePDF;



*/

//pour afficher sur l'imprement de n'avigatuer
/* 
import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

function GeneratePDF() {
  const generatePDF = () => {
    // Créer un nouvel objet jsPDF
    const doc = new jsPDF();

    // Ajouter un titre au PDF
    doc.text("Exemple de PDF généré en React JS", 14, 20);

    // Créer une table pour les données
    let data = [];
    data.push(["ID", "Nom", "Email"]);
    data.push([1, "John Doe", "john.doe@example.com"]);
    data.push([2, "Jane Doe", "jane.doe@example.com"]);

    // Ajouter les données à la table
    doc.autoTable({
      startY: 30,
      head: data[0],
      body: data.slice(1),
    });

    // Enregistrer le PDF et imprimer
    const pdfBlob = doc.output("blob");
    const pdfUrl = URL.createObjectURL(pdfBlob);
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = pdfUrl;
    document.body.appendChild(iframe);
    iframe.contentWindow.print();
  };

  return (
    <div>
      <button onClick={generatePDF}>Générer et imprimer le PDF</button>
    </div>
  );
}

export default GeneratePDF;

*/

// une page derct sur ce naigateur
/*
import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

function GeneratePDF() {
  const generatePDF = () => {
    // Créer un nouvel objet jsPDF
    const doc = new jsPDF();

    // Ajouter un titre au PDF
    doc.text("Exemple de PDF généré en React JS", 14, 20);

    // Créer une table pour les données
    let data = [];
    data.push(["ID", "Nom", "Email"]);
    data.push([1, "John Doe", "john.doe@example.com"]);
    data.push([2, "Jane Doe", "jane.doe@example.com"]);

    // Ajouter les données à la table
    doc.autoTable({
      startY: 30,
      head: data[0],
      body: data.slice(1),
    });

    // Enregistrer le PDF et afficher dans le navigateur
    const pdfBlob = doc.output("blob");
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl, "_blank");
  };

  return (
    <div>
      <button onClick={generatePDF}>Générer et afficher le PDF</button>
    </div>
  );
}

export default GeneratePDF;

*/

// exemple de impremer outematiqument
/* 
import React, { Component } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

class App extends Component {
  generatePDF = () => {
    // Créer un nouvel objet jsPDF
    const doc = new jsPDF();

    // Ajouter un titre au PDF
    doc.text("Exemple de PDF généré en React JS", 14, 20);

    // Créer une table pour les données
    let data = [];
    data.push(["ID", "Nom", "Email"]);
    data.push([1, "John Doe", "john.doe@example.com"]);
    data.push([2, "Jane Doe", "jane.doe@example.com"]);

    // Ajouter les données à la table
    doc.autoTable({
      startY: 30,
      head: data[0],
      body: data.slice(1),
    });

    // Enregistrer le PDF et l'imprimer
    doc.save("example.pdf");
    doc.autoPrint();// 
  };

  render() {
    return (
      <div>
        <button onClick={this.generatePDF}>Imprimer PDF</button>
      </div>
    );
  }
}

export default App;



*/

/**import React from "react";

const Certificate = () => {
  return (
    <div>
      <h1>Certificat de réussite</h1>
      <p>Félicitations! Vous avez réussi ce cours.</p>
    </div>
  );
};

const CertificatePrintButton = () => {
  const handlePrint = () => {
  window.print();
};
  return (
    <div>
      <Certificate />
    <button onClick={handlePrint}>Imprimer</button>
    </div>
  );
};

export default CertificatePrintButton;


  <button onClick={handlePrint}>Imprimer</button>


  





















import React, { useState } from "react";
import { PDFViewer, Page, View, Text, Document } from "react-pdf";

const Hello = () => {
  return (
    <Document>
      <Page size="A4">
        <View>
          <Text>heloo</Text>
        </View>
      </Page>
    </Document>
  );
};
const FileUpload = () => {
  return (
    <div>
      <PDFViewer width="800px" height="600px ">
        <Hello />
      </PDFViewer>
    </div>
  );
};

export default FileUpload;
*/
