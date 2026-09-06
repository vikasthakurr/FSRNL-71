import express from "express";
import multer from "multer";

const port = 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const upload = multer({
//   dest: "uploads/",
// });
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
app.post("/profile", upload.single("dp"), (req, res) => {
  console.log(req.file);
  res.end("file uploadded");
});

app.listen(port, () => {
  console.log("server is running");
});
