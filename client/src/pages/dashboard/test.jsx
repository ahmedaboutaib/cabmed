import React, { useState } from "react";
import axios from "axios";

function FileUploader() {
  const [file, setFile] = useState(null);
  const [folderPath, setFolderPath] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFolderPathChange = (event) => {
    setFolderPath(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folderPath", folderPath);

    axios
      .post("http://localhost:3000/upload", formData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Choose a file:
        <input type="file" onChange={handleFileChange} />
      </label>

      <label>
        Enter folder path:
        <input
          type="text"
          value={folderPath}
          onChange={handleFolderPathChange}
        />
      </label>

      <button type="submit">Upload</button>
    </form>
  );
}

export default FileUploader;

/** 
 * ----------------------------------------------------
 * 
 * const express = require("express");
const multer = require("multer");
const fs = require("fs");

const app = express();
const upload = multer({ dest: "uploads/" });

app.post("/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  const folderPath = req.body.folderPath; // chemin du dossier sélectionné par l'utilisateur

  // Vérifier si le dossier existe, sinon le créer
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }

  // Déplacer le fichier vers le dossier sélectionné
  const filePath = folderPath + "/" + file.originalname;
  fs.rename(file.path, filePath, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    res.send("File uploaded successfully");
  });
});

 * 
 * 
 * 
 * import { saveAs } from "file-saver";
 * const handleDownload = () => {
    const d = "tele.pdf";
    const fileUrl = `http://localhost:5173/charger/${d}`; // URL vers le fichier que vous souhaitez télécharger
    saveAs(fileUrl, "nom-du-fichier.pdf"); // Nom du fichier de téléchargement
  };

  return (
    <div>
      <button onClick={handleDownload}>Télécharger le fichierr</button>
    </div>
  );
  ------------------------
  const selectedFile = event.target.files[0];
    const renamedFile = new File([selectedFile], "nouveau-nom-du-fichier.pdf", {
      type: selectedFile.type,
    });
    setFile(renamedFile);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("directory", "/dd/");
    console.log(formData);
    /* fetch("/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
    };

    return (
      <form onSubmit={handleFormSubmit}>
        <input type="file" accept=".pdf" onChange={handleFileChange} />
        <button type="submit">Envoyer le fichier</button>
      </form>
    );












import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

function Test() {
  const onDrop = useCallback((acceptedFiles) => {
    const renamedFile = new File(
      [acceptedFiles[0]],
      "nouveau-nom-du-fichier.pdf",
      { type: acceptedFiles[0].type }
    );
    const formData = new FormData();
    formData.append("file", renamedFile);
    formData.append("directory", "/dd/");
    // Envoyez formData à votre serveur pour traiter le fichier
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <p>
        Faites glisser et déposez des fichiers ici, ou cliquez pour sélectionner
        des fichierss
      </p>
    </div>
  );
}

export default Test;

/*
  const handleDownload = () => {
    const fileUrl = "../../charger/tele.pdf"; // URL vers le fichier que vous souhaitez télécharger
    saveAs(fileUrl, "nom-du-fichier.pdf"); // Nom du fichier de téléchargement
  };

  return (
    <div>
      <button onClick={handleDownload}>Télécharger le fichierr</button>
    </div>
  );

  const handleDownload = () => {
    const url = "../../charger/tele.pdf"; // URL vers le fichier que vous souhaitez télécharger
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "nom-du-fichier.pdf"); // Nom du fichier de téléchargement
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <button onClick={handleDownload}>Télécharger le fichier</button>
    </div>
  );
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", selectedFile);
    // Ici, vous pouvez envoyer le fichier à un serveur
    console.log(selectedFile);
  };

  return (
    <div>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={handleFileInput} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );*/
