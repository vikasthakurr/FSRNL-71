import express from "express";
import fs from "fs";
import ejs from "ejs";

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.status(200).json({
    message: "server is healthy and running",
  });
});

const users = [
  { id: 1, name: "vikas" },
  { id: 2, name: "akash" },
];

//alluser
app.get("/api/users", (req, res) => {
  res.status(200).json(users);
});
app.get("/vikas",(req,res)=>{
    res.render("vikas")
})

app.get("/dashboard", (req, res) => {
  //   fs.readFile("dashboard.html", "utf-8", (err, data) => {
  //     if (err) return err;
  //     res.end(data);
  //   });
  //   res.send(`
  //     <!doctype html>
  // <html lang="en">
  //   <head>
  //     <meta charset="UTF-8" />
  //     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  //     <title>Document</title>
  //   </head>
  //   <body>
  //     <h1>hello vikas</h1>
  //   </body>
  // </html>
  //     `);
});

app.get("/alldata", (req, res) => {
  fs.readFile("data.json", "utf-8", (err, data) => {
    if (err) return err;
    res.end(data);
  });
});
//specific user
app.get("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);
  res.json(user);
});

app.get("/products", (req, res) => {
  console.log(req.query.category);
  res.end("all products");
});

app.get("/about", (req, res) => {
  res.end("hello from about page");
});
app.listen(3000, () => {
  console.log("server is running");
});

/*
=====================================================================
 NOTES: What this file demonstrates (Express + fs + EJS)
=====================================================================

 1) BENEFITS OF EXPRESS (vs raw http / manual routing)
 -----------------------------------------------------
   - Clean routing:   app.get("/about", handler), app.post(...), etc.
                      No more long if/else on req.url + req.method.
   - Auto JSON:       res.json(users)  -> sets content-type + stringifies.
   - Status helper:   res.status(200).json({...})  reads clearly.
   - Route params:    app.get("/users/:id") -> req.params.id
                      (dynamic routes without manual string parsing).
   - Query strings:   app.get("/products") -> req.query.category
                      (parses "?category=shoes" for us automatically).
   - Middleware:      app.use(...) for reusable logic (static files,
                      body parsing, auth, logging).
   - Less boilerplate: res.send() / res.end() handle headers for us.

 2) SERVING FILES WITH THE fs MODULE
 -----------------------------------------------------
   - import fs from "fs";
   - fs.readFile("data.json", "utf-8", (err, data) => { ... res.end(data) })
       -> reads a file from disk and sends its contents in the response
         (see the /alldata and commented /dashboard routes).
   - Always handle the "err" case; "utf-8" returns a string instead of a
     raw Buffer.
   - app.use(express.static("public"))
       -> serves static files (css, images, html) automatically from the
         "public" folder, so you don't readFile them manually.

 3) EJS TEMPLATING (view engine)
 -----------------------------------------------------
   - app.set("view engine", "ejs")
       -> tells Express to render .ejs templates.
   - res.render("vikas")
       -> looks for "views/vikas.ejs", renders it to HTML, and sends it.
   - Why EJS over fs.readFile of a static .html:
       * inject dynamic data:  res.render("vikas", { name: "vikas" })
       * use <%= value %> to print data and <% %> for logic/loops
       * reuse layouts/partials instead of hardcoding full HTML strings.
   - Note: EJS templates live in a "views" folder by default.

 QUICK RECAP OF ROUTES IN THIS FILE:
   GET /             -> JSON health check          (res.json)
   GET /api/users    -> all users as JSON          (res.json)
   GET /vikas        -> render EJS view            (res.render)
   GET /dashboard    -> send HTML / file (fs demo)
   GET /alldata      -> read data.json via fs      (fs.readFile)
   GET /users/:id    -> single user by param       (req.params)
   GET /products     -> read query string          (req.query)
   GET /about        -> simple text response
=====================================================================
*/
