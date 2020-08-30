const multer = require("multer");

const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("text/plain")) {
    cb(null, true);
  } else {
    cb("Please upload only textfile", false);
  }
};

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null,  "/home/nishi/finalproject/finalprojectN/resources/static/assets/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-bezkoder-${file.originalname}`);
  },
});

var uploadFile = multer({ storage: storage, fileFilter: imageFilter });
module.exports = uploadFile;
