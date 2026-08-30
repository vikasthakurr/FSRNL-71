//orderconfrm(()=>mailsending())
//ordercnfrm()->flag->seenby-->mailsending(subsc)
//on ->event occurance
//emit ->event firing

// event.on("ondercnfm",(to,sub,body)=>{
//     console.log("mail send")
// })


// import { EventEmitter } from "events";

// const emitter = new EventEmitter();
// emitter.on("greet", () => {
//   console.log("hello 1");
// });

// emitter.on("register",()=>{
//     console.log("user registerd and mail sent 2")
// })
// // console.log(emitter.listenerCount("greet"))
// console.log(emitter.eventNames())


// emitter.on("greet", (username) => {
//   console.log("hello", username);
// });

// emitter.on("register",(username)=>{
//     console.log("user registerd and mail sent",username)
// })
// emitter.emit("greet", "vikas");
// emitter.emit("register","vikasthakurr")

//multipleevent
// emitter.once("orderPlaced", () => {
//   console.log("mail sent to user");
// });

// emitter.on("orderPlaced", () => {
//   console.log("inventory updated");
// });
// emitter.on("orderPlaced", () => {
//   console.log("invoice generated");
// });

// function offHandler(){
//     console.log("event off")
// }

// emitter.emit("orderPlaced")
// emitter.off("ordePlaced",offHandler)



// import http from "http";

// const server = http.createServer((req, res) => {
//   //username=>vikasthakurr
//   if (req.url === "/register" && req.method === "POST") {
//     let body = "";
//     req.on("data", (chunk) => {
//       body += chunk;
//     });
//     req.on("end", () => {
//       console.log(body);
//     });
//   }
// });

// server.listen(3000, () => {
//   console.log("server is running");
// });


/*
=====================================================================
 NOTES: Topic covered in this file -> Node.js "events" module (EventEmitter)
=====================================================================
 Core idea:
   - "on"   -> register/subscribe to an event (runs every time it fires)
   - "emit" -> fire/trigger an event
   Real-world analogy: order confirmed -> emit event -> listeners react
   (send mail, update inventory, generate invoice).

 What was practiced here:
   1. import { EventEmitter } from "events"; then  new EventEmitter()
   2. emitter.on("greet", cb)      -> subscribe to an event
   3. emitter.emit("greet", data)  -> fire the event and pass arguments
   4. Passing data through emit -> received as callback parameters
      e.g. emitter.emit("greet", "vikas") -> (username) => ...

 Extra methods shown:
   - emitter.eventNames()          -> list of registered event names
   - emitter.listenerCount(name)   -> how many listeners on an event
   - emitter.once("orderPlaced")   -> listener runs ONLY the first time
   - emitter.on("orderPlaced")     -> multiple listeners for one event
                                      (mail sent, inventory, invoice)
   - emitter.off(name, handler)    -> remove/unsubscribe a listener
                                      (handler must be a named function)

 Bonus: an http server example that reads a POST body using the same
 event pattern (req.on("data") to collect chunks, req.on("end") to finish)
 -> shows that streams in Node are also event-driven.
=====================================================================
*/
