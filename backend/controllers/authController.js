import Users from "../models/users.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../middleware/jwt.js";
const authLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const payload = {
      id: user._id,
      name: user.name,
    };

    const token = generateToken(payload);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ message: "Login successfull", user:{
        id:user._id,
        name:user.name,
        email:user.email
    } });

    
  } catch (error) {
    console.log(error);
  }
};

const authRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    

    if (!email || !name ||!password) {
      res.status(400).json({ message: "Enter credentials..." });
      return;
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password length must be above 8 characters" });
    }

    const existingUser = await Users.findOne({ email });

    if (existingUser) {
      res.status(400).json({ message: "User already exist..." });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser=await Users.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const payload={
        id:newUser._id,
        name:newUser.name
    }

    const token=generateToken(payload)

    res.cookie("token",token,{
        httpOnly:true,
        secure:process.env.NODE_ENV==="production",
        sameSite:"Lax",
        maxAge:24*60*60*1000
    })

    return res.status(201).json({ message: "User registered Successfully!" , user:{
        id:user._id,
        name:user.name,
        email:user.email
    }});

    
  } catch (error) {
    console.log(error);
  }
};

export { authLogin, authRegister };
