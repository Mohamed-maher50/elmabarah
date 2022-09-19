const express = require("express");
const router = express.Router();
const path = require("path");
const Patient = require("../db/PatientSchema");
const multer = require("multer");
//الجزء بتاع التخزين
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(file.mimetype);
    if (file.mimetype === "application/pdf") {
      cb(null, "uploads/pdfs");
    } else if (file.mimetype === "image/jpeg") {
      cb(null, "uploads/images");
    } else {
      console.log(file.mimetype);
      cb({ error: "Mime type not supported" });
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
var upload = multer({ storage: storage });

router.post("/Patient", upload.any(), async (req, res) => {
  const { Name } = req.body;
  console.log(req.body);
  res.sendStatus(200);
});
module.exports = router;
