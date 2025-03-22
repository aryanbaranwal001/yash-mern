import express from 'express';
import { approveReservation, cancelReservationRequest, createReservationRequest, DeclineReservation, getPendingReservations } from '../controllers/reservationController.js';
import { checkUser } from '../middlewares/authMIddleware.js';

const router = express.Router(); 
router.get("/pending",checkUser ,getPendingReservations); 
router.post("/" ,createReservationRequest);
router.put("/:id/approve" ,checkUser ,approveReservation); 
router.delete("/:id", cancelReservationRequest);
router.put("/:id/decline" , checkUser,DeclineReservation); 

export default router