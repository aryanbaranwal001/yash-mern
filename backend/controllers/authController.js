 
import jwt from 'jsonwebtoken'
import User from "../models/User.js"; 
import bcrypt from "bcryptjs";


export const login = async(req,res,next) => {
    try {
        const {email,password} = req.body; 
        const user = await User.findOne({ email }); 
        if (!user) return res.status(400).json({ message: "User does not exist" });
        const isMatch = await bcrypt.compare(password , user.password); 
        if (!isMatch) return res.status(400).json({message: "Invalid Credentials"}); 

        const token = jwt.sign(
            { userId: user._id, role: user.role }, // including role such that i can decrypt token anytime and check for owner-only functions
            process.env.JWT_SECRET, // JWT PASSWORD IS "CheckingForOwner"
            { expiresIn: "1d" }
        );

        
        res.cookie("jwt", token, {
            httpOnly: true, 
            maxAge: 60*60*24*1000,
            sameSite: "none",
            secure: true
        })
        res.json({ token, role: user.role}); 
    } catch(error) {
        console.log("error", error.message)
    }
}

export const register = async (req, res) => {
    try {
        const { name, email, password, isOwner } = req.body; 
        const existingUser = await User.findOne({ email }); 
        if (existingUser) return res.status(400).json({ message: "User already exists" }); 
        const hashedPassword = await bcrypt.hash(password, 10);
        const role = isOwner ? "owner" : "user"; // assigning role based on checkbox
        const newUser = new User({ name, email, password: hashedPassword, role }); // making new entry in database
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
