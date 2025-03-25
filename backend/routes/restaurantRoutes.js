import express from 'express'
import { createRestaurant, deleteRestaurant, getRestaurantList ,getRestaurantByOwner,upload, addItemToMenu,getMenu} from '../controllers/restaurantController.js';
import { getPendingReservations } from '../controllers/reservationController.js';
import { checkUser } from '../middlewares/authMIddleware.js';


const router = express.Router(); 
router.post("/", upload.single("photo"), createRestaurant);
router.delete("/:id",checkUser ,deleteRestaurant);
router.get("/", getRestaurantList)
router.get("/owner/:id", getRestaurantByOwner)
router.post("/:id/menu" , addItemToMenu)
router.get("/:id/menu", getMenu)
export default router 