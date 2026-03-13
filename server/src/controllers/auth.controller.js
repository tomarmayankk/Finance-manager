import { generateToken } from "../config/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

/**
 * @desc    Register new user
 * @route   POST /api/auth/register
 */
export const register = async (req, res) => {
  const { name, email, age, phone, password } = req.body;

  try {
    if (!name || !email || !age || !password) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      age,
      phone,
      password: hashedPassword,
    });

    generateToken(user._id, res);

    return res.status(201).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        age: user.age,
        phone: user.phone,
      },
    });
  } catch (error) {
    console.error("Register error:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 */
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    generateToken(user._id, res);

    return res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        age: user.age,
        phone: user.phone,
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * @desc    Logout user
 * @route   POST /api/auth/logout
 */
export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * @desc    Check authenticated user
 * @route   GET /api/auth/check
 */
export const checkAuth = (req, res) => {
  try {
    return res.status(200).json({
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
    });
  } catch (error) {
    console.error("CheckAuth error:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};