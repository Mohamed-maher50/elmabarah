const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const { hashPassword, verifyPassword } = require("./utils/bcryptjs");
const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded());
app.use(bodyparser.json());
app.use(express.urlencoded({ extended: true }));
app.use(require("cookie-parser")());
require("./db/db");
app.use(express.json());
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: (res, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });
const cors = require("cors");
app.use(express.static("images"));
require("./utils/bcryptjs");
const adminModel = require("./db/adminSchema");

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
// app.post("/", upload.single("pdf"), (req, res) => {
//   const url = req.protocol + "://" + req.get("host");
//   console.log(req.file.filename);
//   res.send("done");
// });
app.post("/", async (req, res) => {
  console.log("get");
  const { username, password } = req.body;
  if (username == "" || password == "")
    return res.send({ error: "please enter username or password" }).status(400);
  const user = await adminModel.findOne({ username: username });
  if (!user) return res.send({ error: "this account not exisit" });
  const checkpassword = await verifyPassword(password, user.password);
  if (!checkpassword)
    return res.send({ error: "password not correct" }).status(401);
  const token = jwt.sign(user.id, "maher");
  res.cookie("jwt", token);
  res.send(true);
});
app.use(express.json());

app.get("/Auth", async (req, res) => {
  const jwtToken = req.cookies.jwt;
  if (!jwtToken) return res.send(false).status(401);
  const verify = await jwt.verify(jwtToken, "maher");
  console.log(verify);
  res.send(true);
});
///
// هنا المشكله
app.use(require("./Routes/Patient"));
app.listen(4000, () => {
  console.log("listen in port 4000");
});
