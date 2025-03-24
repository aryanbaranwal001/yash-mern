import express from 'express';
import {  createReservationRequest,  getPendingReservations, updateReservation } from '../controllers/reservationController.js';
import { checkOwner} from '../middlewares/authMIddleware.js';

const router = express.Router(); 
 
router.post("/" ,createReservationRequest);
router.put("/:id", updateReservation);
router.get("/restaurant/:id" , checkOwner, getPendingReservations); 
export default router