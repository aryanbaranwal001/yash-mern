import Reservation from '../models/Reservation.js';
import { sendEmail } from '../utils/emailService.js';
import User from '../models/User.js'
export const createReservationRequest = async (req,res) => {
    try {
        const {userId, restaurantId, time,date} = req.body;
        if (!userId || !restaurantId || !time || !date) {
            return res.status(404).json({message: "All fields are required"})
        }
        const newReservation = new Reservation({
            user: userId, 
            restaurant: restaurantId, 
            date,
            time, 
            status: "pending", 
        })

        await newReservation.save();
        res.status(201).json({message:"reservation request sent", reservation: newReservation})
    } catch (error) {
        console.log("error creating reservation"); 
        res.status(500).json({message: "Server Error", error: error.message }); 
    }
}

export const cancelReservationRequest = async (req, res) => {
    try {
        const { id } = req.params;

        const reservation = await Reservation.findById(id);
        if (!reservation) {
            return res.status(404).json({ message: "Reservation not found" });
        }
        if (reservation.status !== "pending") {
            return res.status(400).json({ message: "Cannot cancel an approved or declined reservation" });
        }

        await Reservation.findByIdAndDelete(id);
        res.status(200).json({ message: "Reservation request canceled" });
    } catch (error) {
        res.status(500).json({ message: "Server error" , error: error.message});
    }
};

export const updateReservation = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body; 
        const reservation = await Reservation.findById(id).populate("user");
        const updatedReservation = await Reservation.findByIdAndUpdate(id, { status }, { new: true });


        if (!updatedReservation) {
            return res.status(404).json({ message: "Reservation not found" });
        }

        console.log(process.env.EMAIL_USER)
        console.log(process.env.EMAIL_PASS)
        const userEmail = reservation.user.email;
        const subject = `Your Reservation Status: ${status}`;
        const message = `Hello ${reservation.user.name},\n\nYour reservation at ${reservation.restaurant} has been ${status}.\n\nThank you!`;

        sendEmail(userEmail, subject, message);

        res.status(200).json(updatedReservation);
    } catch (error) {
        res.status(500).json({ message: "Error updating reservation", error: error.message });
    }
};

export const getPendingReservations = async (req, res) => {
    try {
        console.log("Received request params:", req.params);
        const { id } = req.params;
        const reservations = await Reservation.find({ restaurant: id});
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({ message: "Error fetching reservations", error: error.message });
    }
};

