import User from '../models/User.js'
import jwt from 'jsonwebtoken'

export const checkUser = async (req,res,next) => {
    const token = req.cookies.jwt; 
    if (token) {
        jwt.verify(token, "CheckingForOwner", async(error, decodedToken) => {
            if (error) {
                res.json({status: false})
                next(); 
            } else {
                const user = await User.findById(decodedToken.userId); 
                if (user.role === "owner") {
                    res.json({status: true, user: user.email, role: "owner"})
                    next(); 
                } else {res.json({status: false})}
            }
        }) 
    } else {
        res.json({
            status: false,
            message: "no cookie"
        })
    }
}
    
    
