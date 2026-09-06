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
