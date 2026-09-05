import express from "express";
// console.log(express)
import fs from "fs";
import morgan from "morgan";
import cors from "cors"

const app = express();

app.use(cors({
    origin:"http://localhost:5173",

}))

const PORT = 3000;
//middleware logic
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));

// let username = "vikasthakur";
// // let password = 12345;

// //logger
// app.use((req, res, next) => {
//   if (req.body.username !== username) {
//     res.end("invalid username");
//   } else {
//     next();
//   }
// });

// app.use((req, res, next) => {
//   //   fs.writeFile(
//   //     "/log.txt",`user came at ${req.url} at the time ${Date.now()}`,
//   //     (err) => {
//   //       if (err) return err;
//   //     },
//   //   );
//   console.log(`user came at ${req.url} at the time ${Date.now()}`);
//   next();
// });

// //router level middleware
// const auth = (req, res, next) => {
//   if (req.body.username !== "vikasthakur") {
//     res.end("invalid username");
//   } else {
//     next();
//   }
// };

// app.use(auth);

app.get("/", (req, res) => {
  res.end("hello from server");
});
app.post("/login", (req, res) => {
  console.log(req.body);
  res.end("hellow from dashbaord");
});
app.get("/error", (req, res) => {
  throw new Error("vikas something is wrong");
});

const errorHandler = (err, req, res, next) => {
  console.log(err);

  res.status(500).send("something went wrong");
};

app.use(errorHandler);
app.listen(PORT, () => {
  console.log("server is up and running");
});

/*
=====================================================================
 NOTES: Middleware in Express (detailed)
=====================================================================

 WHAT IS MIDDLEWARE?
 -----------------------------------------------------
 A middleware is a function that runs IN BETWEEN the incoming request
 and the final response. It has access to:
     (req, res, next)
   - req  -> the request object  (url, body, headers, params, query)
   - res  -> the response object (send, json, status, end)
   - next -> a function you CALL to pass control to the next middleware
 Requests flow through middlewares TOP TO BOTTOM in the order you
 register them (this order matters a lot).

 THE GOLDEN RULE:
   - Call next()          -> move on to the next middleware / route.
   - Send a response      -> (res.end / res.send / res.json) ends the cycle.
   - Do NEITHER           -> the request HANGS forever (common bug).
   - Do NOT call next() AND send a response for the same request.

 TYPES OF MIDDLEWARE SHOWN IN THIS FILE
 -----------------------------------------------------

 1) BUILT-IN middleware (ships with Express)
      app.use(express.json())
        -> parses incoming JSON bodies, fills req.body.
      app.use(express.urlencoded({ extended: true }))
        -> parses form data (application/x-www-form-urlencoded) into req.body.
        -> extended:true allows nested objects.
      app.use(express.static("public"))   // (used in express.js)
        -> serves static files automatically.

 2) THIRD-PARTY middleware (installed via npm)
      app.use(morgan("tiny"))
        -> logs each request (method, url, status, response time).
      app.use(cors({ origin: "http://localhost:5173" }))
        -> enables Cross-Origin Resource Sharing so a frontend on a
          different origin (e.g. Vite on :5173) can call this API.
          Without CORS the browser blocks cross-origin requests.

 3) CUSTOM / APPLICATION-LEVEL middleware (you write it)
      app.use((req, res, next) => { ... next(); })
        -> runs for EVERY request.
      Examples in the commented code above:
        * a logger that prints/writes "user came at <url> at <time>"
          then calls next().
        * a validator that checks req.body.username and either ends the
          response ("invalid username") OR calls next() to continue.

 4) ROUTER / ROUTE-LEVEL middleware
      const auth = (req, res, next) => { ...check... ; next() }
      app.use(auth)                 -> apply to all routes after it, OR
      app.get("/secret", auth, handler)  -> apply to a single route only.
        -> perfect for authentication / authorization guards.

 5) ERROR-HANDLING middleware (SPECIAL)
      const errorHandler = (err, req, res, next) => { ... }
      app.use(errorHandler)
        -> IMPORTANT: it takes FOUR arguments (err, req, res, next).
          Express recognizes it as an error handler only because of the
          4 params.
        -> It must be registered LAST (after all routes), which is why
          app.use(errorHandler) sits at the bottom of this file.
        -> Any error thrown in a route (see app.get("/error") which does
          throw new Error(...)) is caught here and returns a 500 response.

 REQUEST FLOW IN THIS FILE (order of execution)
 -----------------------------------------------------
   incoming request
     -> cors
     -> express.json / express.urlencoded  (parse body)
     -> morgan  (log request)
     -> matching route handler ( "/", "/login", "/error" )
     -> if an error is thrown -> errorHandler (500)
     -> response sent back to client

 KEY TAKEAWAYS
 -----------------------------------------------------
   - Middleware order = execution order. Put parsers/loggers BEFORE routes.
   - Always end the cycle: either next() or send a response.
   - Error handler = 4 params + registered last.
   - Middleware keeps routes clean by reusing cross-cutting logic
     (parsing, logging, auth, CORS, error handling) in one place.
=====================================================================
*/
