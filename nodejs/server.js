import http from "http";

const PORT = 3000;

const server = http.createServer((req, res) => {
  const reqUrl = req.url;
  const method = req.method;

  if (reqUrl === "/" && method === "GET") {
    res.writeHead(200, { "content-type": "text/html" });
    res.end("hello from home page");
  } else if (reqUrl === "/about" && method === "GET") {
    res.writeHead(200, { "content-type": "text/html" });
    res.end("hello from about page");
  } else if (reqUrl === "/contact" && method === "GET") {
    res.writeHead(200, { "content-type": "text/html" });
    res.end("hello from contact us page");
  } else if (reqUrl === "/api/users" && method === "GET") {
    const users = [
      { id: 1, name: "vikas" },
      { id: 2, name: "akash" },
    ];
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify(users));
  } else {
    res.writeHead(404, { "content-type": "text/html" });
    res.end("page not found");
  }
});

server.listen(PORT, () => {
  console.log("server is up and running");
});

/*
=====================================================================
 NOTES: Problems with manual routing (raw http) -> reason to use Express
=====================================================================
 This file does routing "by hand" using the built-in http module.
 Every route is a manual if / else if check on:
     - req.url     (which path?)
     - req.method  (GET, POST, ...?)
 and each branch repeats res.writeHead(...) + res.end(...).

 Problems with this manual approach:
   1. Long if/else chains -> as routes grow the code becomes messy and
      hard to read/maintain.
   2. Repetitive boilerplate -> writeHead + content-type + end copied
      into every single branch.
   3. No dynamic route params -> "/api/users/:id" must be parsed out of
      the url string manually (slice/split), which is error prone.
   4. No query string parsing -> "?page=2" must be parsed by hand.
   5. No body parsing -> for POST requests we must collect req.on("data")
      chunks and JSON.parse them ourselves.
   6. No middleware -> auth, logging, validation get duplicated instead
      of being reused across routes.
   7. Easy to forget the 404 / default case for unknown routes.

 Why switch to Express:
   - Clean routing:      app.get("/about", handler), app.post(...)
   - Route params:       req.params.id  for "/api/users/:id"
   - Query parsing:      req.query.page  automatically
   - Body parsing:       app.use(express.json())  -> req.body ready to use
   - Middleware chain:   app.use(logger), app.use(auth)  -> reusable
   - Less boilerplate:   res.send() / res.json() handle headers for us

 In short: Express replaces this hand-written if/else router with a
 structured, scalable, and much less repetitive way to build servers.
=====================================================================
*/
