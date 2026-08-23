// ============================================================
// Node.js HTTP Module Notes
// ============================================================

// The 'http' module is a built-in (core) module in Node.js.
// It allows Node.js to transfer data over the HTTP protocol.
// Used to create HTTP servers and make HTTP requests.

// Key Concepts:
// - http.createServer() : Creates an HTTP server that listens for requests.
// - The callback receives two objects: req (request) and res (response).
//
// Request Object (req):
//   - req.method  : The HTTP method (GET, POST, PUT, DELETE, etc.)
//   - req.url     : The URL path the client requested (e.g., "/", "/about")
//   - req.headers : An object containing the request headers
//
// Response Object (res):
//   - res.statusCode    : Sets the HTTP status code (200 = OK, 404 = Not Found, 500 = Server Error)
//   - res.setHeader()   : Sets a response header (key-value pair)
//   - res.write()       : Sends a chunk of the response body
//   - res.end()         : Signals the server that the response is complete
//
// Common HTTP Status Codes:
//   - 200 : OK (request successful)
//   - 201 : Created (resource created successfully)
//   - 301 : Moved Permanently (redirect)
//   - 400 : Bad Request
//   - 404 : Not Found
//   - 500 : Internal Server Error
//
// server.listen(port, callback):
//   - Starts the server and binds it to the given port number.
//   - The callback runs once the server is ready to accept connections.
//   - Common ports: 3000, 8080, 5000 (for development)
// ============================================================

import http from "http";

// Creating a server using http.createServer()
// The callback function runs every time a request hits the server
const server = http.createServer((req, res) => {
  // req.method gives the HTTP method used by the client (GET, POST, etc.)
  //   console.log("req method", req.method);

  // req.url gives the path the client is requesting
  //   console.log("url is ", req.url);

  // Setting a custom response header
  res.setHeader("author", "vikas thakur");

  // Setting the status code for the response
  res.statusCode = 404; // Not Found

  // Writing data to the response body
  res.write("hello world from nodejs");

  // Ending the response - must be called to complete the response
  res.end();
});

// Starting the server on port 3000
// The server will listen for incoming HTTP requests on this port
server.listen(3000, () => {
  console.log("server is up and running");
});
