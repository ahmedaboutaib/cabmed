import { saveAs } from "file-saver";

export function handleDownload(file, information) {
  console.log("file ::", file)
  const apiUrl = import.meta.env.VITE_API_URL;

  try {
    for (let i = 0; i < file.resultat.length; i++) {
      const fileUrl = `${apiUrl}/${file.resultat[i]}`;
      console.log("fileUrl ::", fileUrl);
      const fileType = file.resultat[i].split(".").pop().toLowerCase();
      saveAs(fileUrl, information + "-" + (i + 1) + "." + fileType);
    }
  } catch (error) {
    console.error("error printing", error);
  }
}