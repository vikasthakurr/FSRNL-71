import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const port = 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//db connection
mongoose
  .connect(
    "mongodb+srv://vikaskumar20012001_db_user:Vikas123@savourykitchen.ntybdvc.mongodb.net/",
  )
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
app.get("/api/v1/users/:id",async(req,res)=>{
    const {id}=req.params;
    // const {email}=req.body
    const user= await User.find(id);
    if(!user) return res.status(404).json({message:"user not found"});
    res.status(200).json({message:"specific user",user});
})

//login...
app.post("/api/v1/auth/login", async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (!existingUser)
    return res.status(404).json({ message: "user does have account" });

  const isMatch = await bcrypt.compare(password, existingUser.password);
  if (!isMatch) return res.status(403).json({ message: "invalid credentials" });

  res.status(200).json({ message: "login successful", user: existingUser });
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
app.delete("/api/v1/users/delete/:id",async(req,res)=>{
    const {id}=req.params;
    const deletedUser=await User.findByIdAndDelete(id);

    if(!deletedUser) return res.status(501).json({message:"error while deleting the user"});

    res.status(200).json({message:"user deleted successfully",deletedUser});
})
app.listen(port, () => {
  console.log("server is up and running");
});
