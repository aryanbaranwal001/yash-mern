import express from 'express'
import { createRestaurant, deleteRestaurant, getRestaurantList } from '../controllers/restaurantController.js';
import { checkUser } from '../middlewares/authMIddleware.js';
const router = express.Router(); 
router.post("/",checkUser ,createRestaurant);
router.delete("/:id",checkUser ,deleteRestaurant);
router.get("/", getRestaurantList)
export default router 