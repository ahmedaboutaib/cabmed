import jsPDF from "jspdf";
import "jspdf-autotable";

const docGenerator = (title, headers, tableData, shouldPrint) => {
  const doc = new jsPDF();
  console.log("doc", tableData);

  const data = tableData.map(item => headers.map(header => item[header]));

  const addHeader = () => {
    ////doc.setFontSize(20);
    doc.setTextColor(40);
    //doc.setFontStyle('normal');
    
    const titleWidth = doc.getStringUnitWidth(title) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    const titleX = (doc.internal.pageSize.width - titleWidth) / 2;
    doc.text(title, titleX, 10);

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString() + " " + currentDate.toLocaleTimeString();
    //doc.setFontSize(10);
    const dateWidth = doc.getStringUnitWidth(formattedDate) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    const dateX = (doc.internal.pageSize.width - dateWidth) / 2;
    doc.text(formattedDate, dateX, 20);
  };

  const addFooter = (data) => {
    let str = "Page " + doc.internal.getNumberOfPages();
    if (typeof doc.putTotalPages === 'function') {
      str = str + " of " + "{total_pages_count_string}";
    }
    //doc.setFontSize(10);

    const pageSize = doc.internal.pageSize;
    const pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
    doc.text(str, data.settings.margin.left, pageHeight - 10);
  };

  doc.autoTable({
    head: [headers],
    body: data,
    theme: 'striped',
    startY: 30,
    didDrawPage: (data) => {
      addHeader();
      addFooter(data);
    },
  });

  if (typeof doc.putTotalPages === 'function') {
    doc.putTotalPages("{total_pages_count_string}");
  }

  if (shouldPrint) {
    // Open the PDF in a new window for printing
    window.open(doc.output('bloburl'), '_blank');
  } else {
    // Save the PDF
    doc.save("table.pdf");
  }
};

//here is an example for the input data
/*
const headers = ["nom", "prenom", "telephone", "methode", "date", "status", "montant", "description"];

const tableData = [
  { nom: "Doe", prenom: "John", telephone: "1234567890", methode: "Card", date: "2023-05-20", status: "Completed", montant: "$100", description: "Purchase" },
  { nom: "Doe", prenom: "Jane", telephone: "0987654321", methode: "PayPal", date: "2023-05-21", status: "Pending", montant: "$200", description: "Purchase" },
  // Add more data as required
];
*/
// To print the PDF:
//generatePDF("My Custom Report", headers, tableData, true); //TODO not working for now

// To save the PDF:
//generatePDF("My Custom Report", headers, tableData, false);
export {docGenerator};