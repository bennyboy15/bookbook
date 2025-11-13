import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

function generateToken(userId) {
    return jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn:"15d"});
};

export async function login(req,res) {
    try {
        const {username, password} = req.body;

        if (!username || !password) {
            return res.status(400).json({message: "Missing required fields"});
        }

        const user = await User.findOne({username});
        if (!user) {
            return res.status(400).json({message: "Invalid credentials"});
        }

        const isValid = await user.comparePassword(password);
        if (!isValid) {
            return res.status(400).json({message: "Invalid credentials"});
        }

        const token = generateToken(user._id);

        return res.status(200).json({token, user:{
            _id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            profileImage: user.profileImage,
        }});

    } catch (error) {
        console.log("Error in login authController", error);
        return res.status(500).json({message: "Internal Server Error"});
    }
};

export async function register(req,res) {
    try {
        const {name, email, username, password} = req.body;

        if (!name || !email || !username || !password) {
            return res.status(400).json({message: "Missing required fields"});
        }

        // const existingUser = await User.findOne({$or: [{email:email}, {username:username}]});
        // if (existingUser) {
        //     return res.status(400).json({message: "User already exists"});
        // }

        const existingUsername = await User.findOne({username});
        if (existingUsername) {
            return res.status(400).json({message: "Username already exists"});
        }
        const existingEmail = await User.findOne({email});
        if (existingEmail) {
            return res.status(400).json({message: "Email already exists"});
        }

        if (password.length < 6) {
            return res.status(400).json({message: "Password must be at least 6 characters long"});
        }

        if (username.length < 3) {
            return res.status(400).json({message: "Username must be at least 3 characters long"});
        }        

        const profileImage = `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`;

        const user = new User({name, email, username, password, profileImage});

        await user.save();

        const token = generateToken(user._id);

        return res.status(201).json({token, user:{
            _id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            profileImage: user.profileImage,
        }});

    } catch (error) {
        console.log("Error in register authController", error);
        return res.status(500).json({message: "Internal Server Error"});
    }
}