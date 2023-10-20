const multer = require("multer");

exports.upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/data/upload");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    },
  }),
  limits: {
    fileSize: 1024 * 1024 * 10 * 100, // 1000 MB
  },
});

exports.tableFiles = (File) => {
  const files = [];
  for (let i = 0; i < File.length; i++) {
    files.push("data/upload/" + File[i].filename);
  }
  return files;
};

/**
 * const multer = require("multer");

exports.upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/data/upload");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    },
  }),
  limits: {
    fileSize: 1024 * 1024 * 10, // 10 MB
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype.startsWith("image/") ||
      file.mimetype === "application/pdf"
    ) {
      cb(null, true);
    } else {
      cb(new Error("File type not supported"), false);
    }
  },
});
 */
