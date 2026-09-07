import express from "express";
import nodemailer from "nodemailer";

const port = 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "vikasthakur.main@gmail.com",
    pass: "enter your password",
  },
});

const mailOptions = {
  from: "vikasthakur.alternate@gmail.com",
  to: "asfarkhanofficial01@gmail.com",
  subject: "Sending Email using Node.js",
  text: "That was easy!",
  html: `<h1>Welcome</h1><p>to the jungle</p>`,
};

transporter.sendMail(mailOptions, function (err, info) {
  if (err) console.log(err);
  else console.log(info);
});

app.listen(port, () => {
  console.log("server is up and running");
});

/*
=====================================================================
 NOTES: Nodemailer (sending emails from Node.js)
=====================================================================

 WHAT IS NODEMAILER?
 -----------------------------------------------------
 Nodemailer is a module used to SEND emails from a Node.js server
 (welcome mails, OTPs, password resets, order confirmations, etc.).
 It works over SMTP or through known services like Gmail.

 STEP 1 - CREATE A TRANSPORTER (the "mail sender" connection)
 -----------------------------------------------------
   const transporter = nodemailer.createTransport({
     service: "gmail",      // preset SMTP settings for Gmail
     auth: {
       user: "you@gmail.com",
       pass: "app password", // NOT your normal Gmail password
     },
   })
   IMPORTANT (Gmail):
     - Your real Gmail password will NOT work here.
     - Turn on 2-Step Verification, then create a 16-char "App Password"
       and use that as "pass".
   SECURITY:
     - Never hardcode credentials like this in real projects.
       Move user/pass into environment variables (.env) and load with
       process.env, and add .env to .gitignore.

 STEP 2 - DEFINE THE MAIL OPTIONS (what to send)
 -----------------------------------------------------
   const mailOptions = {
     from:    "sender@gmail.com",
     to:      "receiver@gmail.com",   // comma-separated for multiple
     subject: "Subject line",
     text:    "plain text version",
     html:    "<h1>HTML version</h1>",// html wins if both are given
   }
   Extras you can add: cc, bcc, attachments: [{ filename, path }].

 STEP 3 - SEND THE MAIL
 -----------------------------------------------------
   transporter.sendMail(mailOptions, (err, info) => {
     if (err) console.log(err)
     else console.log(info)   // info.messageId, info.response, etc.
   })
   - Callback style (used here) OR async/await with await transporter.sendMail().

 NOTE ON THIS FILE
 -----------------------------------------------------
   Here sendMail runs ONCE when the server starts. In a real app you'd
   usually trigger it INSIDE a route, e.g.:
       app.post("/send", async (req, res) => {
         await transporter.sendMail(mailOptions)
         res.send("mail sent")
       })
   so an email is sent in response to a user action instead of on boot.
=====================================================================
*/
