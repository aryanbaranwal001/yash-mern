import express from 'express'
import { createRestaurant, deleteRestaurant, getRestaurantList ,getRestaurantByOwner} from '../controllers/restaurantController.js';
import { checkUser } from '../middlewares/authMIddleware.js';
const router = express.Router(); 
router.post("/", createRestaurant);
router.delete("/:id",checkUser ,deleteRestaurant);
router.get("/", getRestaurantList)
router.get("/owner/:id", getRestaurantByOwner)
export default router 