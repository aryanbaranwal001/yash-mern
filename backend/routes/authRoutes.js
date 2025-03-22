import express from 'express';
import { register,login } from '../controllers/authController.js';
import { checkUser } from '../middlewares/authMIddleware.js';


const router = express.Router(); 
router.get("/admin" , checkUser)
router.post("/register", register); 
router.post("/login", login); 

export default router