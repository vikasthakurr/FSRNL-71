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

/*
=====================================================================
 NOTES: Multer (file uploads in Express)
=====================================================================

 WHAT IS MULTER?
 -----------------------------------------------------
 Multer is middleware for handling "multipart/form-data" — the encoding
 the browser uses when a form uploads FILES. express.json() and
 express.urlencoded() CANNOT parse files, so we need Multer for uploads.
 Multer puts file info on req.file (single) or req.files (multiple),
 and normal text fields on req.body.

 TWO WAYS TO STORE FILES
 -----------------------------------------------------
 1) Quick way (commented out above):
      const upload = multer({ dest: "uploads/" })
        -> saves files to the "uploads/" folder with a random name.

 2) diskStorage (used here) -> full control over folder + filename:
      const storage = multer.diskStorage({
        destination: (req, file, cb) => cb(null, "uploads/"),
              // 1st arg = error (null = none), 2nd arg = target folder
        filename:    (req, file, cb) => cb(null, file.originalname),
              // here we keep the ORIGINAL file name.
              // TIP: use Date.now() + "-" + file.originalname to avoid
              // overwriting files that share the same name.
      })
      const upload = multer({ storage })

 THE cb (callback) PATTERN
 -----------------------------------------------------
   cb(null, value)  -> no error, use "value"
   cb(error)        -> reject the upload with an error

 USING IT ON A ROUTE
 -----------------------------------------------------
   app.post("/profile", upload.single("dp"), handler)
     - upload.single("dp") is route-level middleware.
     - "dp" MUST match the "name" attribute of the form's file input
       (e.g. <input type="file" name="dp">).
     - After it runs, req.file holds { originalname, mimetype, size,
       destination, filename, path, ... }.

 OTHER UPLOAD HELPERS
 -----------------------------------------------------
   upload.single("field")            -> one file  -> req.file
   upload.array("field", maxCount)   -> many files (one field) -> req.files
   upload.fields([{name,maxCount}])  -> multiple named fields   -> req.files
   upload.none()                     -> only text fields, no files

 GOOD PRACTICES
 -----------------------------------------------------
   - Make sure the destination folder ("uploads/") exists.
   - Add limits + fileFilter to restrict size / file type:
       multer({ storage, limits: { fileSize: 2*1024*1024 },
                fileFilter: (req, file, cb) => { ...allow images... } })
   - Never trust file.originalname blindly (sanitize it).
=====================================================================
*/
