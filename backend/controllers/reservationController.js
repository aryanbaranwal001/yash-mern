import Reservation from '../models/Reservation.js';

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

export const approveReservation = async (req,res) => {
    try{
        const {id} = req.params; 
        const reservation = await Reservation.findByIdAndUpdate(id ,{status: "confirmed"}, {new: true}); 
        res.status(200).json({ message: "Reservation approved", reservation });
    } catch(error) {
        res.status(404).json({message: "server Error"})
    }
}

export const DeclineReservation = async (req,res) => {
    try{
        const {id} = req.params; 
        const reservation = await Reservation.findByIdAndUpdate(id ,{status: "cancelled"}, {new: true}); 
        res.status(200).json({ message: "Reservation request declined", reservation });
    } catch(error) {
        res.status(404).json({message: "server Error"})
    }
}

export const getPendingReservations = async (req, res) => {
    try {
        const pendingReservations = await Reservation.find({ status: "pending" })
            .populate("restaurant", "name")
            .populate("user", "email"); // Fetch restaurant name and user email

        res.status(200).json(pendingReservations);
    } catch (error) {
        console.error("Error fetching pending reservations:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};