import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { allUserLimitter } from "./rate-limit.js";

dotenv.config();

const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//db connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

//schema
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

//model
const User = mongoose.model("User", userSchema);

//create
app.post("/api/v1/auth/register", async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  //   console.log(hashedPassword);

  const existingUser = await User.findOne({ email });
  if (existingUser)
    return res.status(400).json({ message: "user already exist" });

  const user = new User({
    username,
    email,
    password: hashedPassword,
  });
  const savedUser = await user.save();
  if (!savedUser)
    return res.status(400).json({ message: "something went wrong" });

  res.status(201).json({
    message: "user created successfuly",
    user,
  });
});

//read

app.get("/api/v1/auth/users", async (req, res) => {
  const users = await User.find();
  if (!users) return res.status(404).json({ message: "no user is there" });

  res.status(200).json({
    message: "availble user",
    users,
  });
});

//specfic user
app.get("/api/v1/users/:id", async (req, res) => {
  const { id } = req.params;
  // const {email}=req.body
  const user = await User.find(id);
  if (!user) return res.status(404).json({ message: "user not found" });
  res.status(200).json({ message: "specific user", user });
});

//login...
app.post("/api/v1/auth/login", async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (!existingUser)
    return res.status(404).json({ message: "user does have account" });

  const isMatch = await bcrypt.compare(password, existingUser.password);
  if (!isMatch) return res.status(403).json({ message: "invalid credentials" });

  //token generation
  const token = jwt.sign(
    {
      id: existingUser._id,
      email: existingUser.email,
      role: "admin",
    },
    process.env.JWT_SECRET,
  );
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  res
    .status(200)
    .json({ message: "login successful", user: existingUser, token });
});
//verification middleware...

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token || !token.startsWith("Bearer")) {
    return res.status(401).json({ message: "token is not availble" });
  }

  //bearer sdfghasdfg
  const tokenValue = token.split(" ")[1];

  try {
    const isVerified = jwt.verify(tokenValue, process.env.JWT_SECRET);
    req.user = isVerified;
    next();
  } catch (err) {
    res.status(401).json({ message: "invalid token" });
  }
};

//verificaiton route
app.get("/allusers", verifyToken, allUserLimitter, async (req, res) => {
  const allUsers = await User.find();
  if (!allUsers)
    return res.status(404).json({
      message: "no user found",
    });
  res.status(200).json({
    message: "alluser data",
    allUsers,
  });
});
//update...
app.put("/api/v1/users/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { email, username, password } = req.body;
    const updateUser = await User.findByIdAndUpdate(
      id,
      { email, username, password },
      { new: true },
    );

    if (!updateUser)
      return res.status(501).json({ message: "error while updating user" });

    res.status(200).json({ message: "user updated successfully", updateUser });
  } catch (err) {
    console.log(err);
  }
});

//delete....
app.delete("/api/v1/users/delete/:id", async (req, res) => {
  const { id } = req.params;
  const deletedUser = await User.findByIdAndDelete(id);

  if (!deletedUser)
    return res.status(501).json({ message: "error while deleting the user" });

  res.status(200).json({ message: "user deleted successfully", deletedUser });
});
app.listen(port, () => {
  console.log("server is up and running");
});
