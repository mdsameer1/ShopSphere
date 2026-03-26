import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { verifyEmail } from "../emailVerify/verifyEmail.js";
import { Session } from "../models/sessionModel.js";

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      res.status(400).json({
        success: false,
        message: "all fields are required",
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      res.status(400).json({
        success: false,
        message: "user alredy exist",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY, {
      expiresIn: "10m",
    });
    verifyEmail(token, email);
    newUser.token = token;
    await newUser.save();
    return res.status(201).json({
      success: true,
      message: "user registered successfully",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const verify = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(400).json({
        success: false,
        message: "Authorization token is missingor invalid",
      });
    }
    const token = authHeader.split(" ")[1]; //[Bearer,u74rjeru4ru]
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.SECRET_KEY);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(400).json({
          success: false,
          message: "The registration token has expired",
        });
      }
      return res.status(400).json({
        success: false,
        message: "The verification has failed",
      });
    }
    const user = await User.findById(decode.id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    user.token = null;
    user.isVerified = true;
    await user.save();
    returnres
      .status(200)
      .json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const reverify = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await user.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user not found",
      });
    }
    const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY, {
      expiresIn: "10m",
    });
    verifyEmail(token, email);
    user.token = token;
    await user.save();
    return res.status(200).json({
      success: true,
      message: "verification email sent again successfully",
      token: user.token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "User not exists",
      });
    }
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }
    if (existingUser.isVerified === false) {
      return res.status(400).json({
        success: false,
        message: "verify your account then login",
      });
    }

    //generate token
    const accessToken = jwt.sign(
      { id: existingUser._id },
      process.env.SECRET_KEY,
      { expiresIn: "10d" }
    );
    const refreshToken = jwt.sign(
      { id: existingUser._id },
      process.env.SECRET_KEY,
      { expiresIn: "10d" }
    );

    existingUser.isLoggedIn = true;
    await existingUser.save();
    
    //Check for existing session and delete it
    const existingSession=await Session.findOne({userId:existingUser._id})
    if(existingSession){
      await Session.deleteOne({userId:existingUser._id})
    }
    //Create new session
    await Session.create({ userId: existingUser._id });
    return res.status(200).json({
      success: true,
      message: `Welcome back ${existingUser.firstName}`,
      user: existingUser,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const logout=async(req,res)=>{
  try {
    
  } catch (error) {
    
  }
}