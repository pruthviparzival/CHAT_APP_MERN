import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    // extract from req.body
    const { fullName, username, password, confirmPassword, gender } = req.body;
    // compare pass and confirm-pass
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords don't match" });
    }
    // check whether username already exists
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ error: "Username already exists" });
    }
    //save hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // create profile-pic using the obtained username
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    // create a new user document
    const newUser = await User.create({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });
    //   await newUser.save();  ---> not necessary if we use .create()
    if (newUser) {
      // cookies thing. (generate token)
      generateTokenAndSetCookie(newUser._id, res);

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });
    } else {
      return res.status(400).json({ error: "Invaild user data" });
    }
  } catch (error) {
    console.log("Error in signup controller - ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username }); // returns null if not found
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser?.password || "" // if null then compare empty string to not get any error
    );
    if (!existingUser || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invaild username or password" });
    }

    // cookies thing.
    generateTokenAndSetCookie(existingUser._id, res);

    res.status(200).json({
      _id: existingUser._id,
      fullName: existingUser.fullName,
      username: existingUser.username,
      profilePic: existingUser.profilePic,
    });
  } catch (error) {
    console.log("Error in login controller - ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  try {
    // cookies thing.
    res.cookie("jwt", "", {
      maxAge: 0,
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller - ", error.message);
    res.status(500).json({ error: "Interanl server error" });
  }
};
