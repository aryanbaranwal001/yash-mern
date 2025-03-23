import Restaurant from "../models/Restaurant.js"
import mongoose from 'mongoose'


export const createRestaurant = async (req,res) => {
    try {
        const {name, ownerId} = req.body;
        if (!ownerId || !name) {
            return res.status(404).json({message: "All fields are required"})
        }
        const newRestaurant = new Restaurant({
            name: name,
            ownerId: ownerId
        })

        await newRestaurant.save();
        res.status(201).json({message:"restaurant listed", restaurant: newRestaurant})
    } catch (error) {
        console.log("error creating restaurant"); 
        res.status(500).json({message: "Server Error", error: error.message }); 
    }
}

export const deleteRestaurant = async (req, res) => {
    try {
        const { id } = req.params;

        const restaurant = await Restaurant.findById(id);
        if (!reservation) {
            return res.status(404).json({ message: "Restaurant not found" });
        }

        await Restaurant.findByIdAndDelete(id);
        res.status(200).json({ message: "Restaurant deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server error" , error: error.message});
    }
};

export const getRestaurantList = async (req, res) => {
    try {
        console.log("getting restaurants")
        const restaurants = await Restaurant.find();
        res.status(200).json(restaurants);
    } catch (error) {
        console.error("Error fetching restaurant list:", error);
        res.status(500).json({ message: "Server error while fetching restaurants" });
    }
};


export const getRestaurantByOwner = async (req, res) => {
    try {
        console.log("Received request params:", req.params); // Debugging
        const { id } = req.params; 
        if (!id) {
            return res.status(400).json({ error: "Owner ID is required" });
        }
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ error: "Invalid Owner ID format" });
        }
        const restaurant = await Restaurant.findOne({ ownerId: id }); 
        if (!restaurant) {
            return res.status(404).json({ message: "No Restaurant found" });
        }
        res.status(200).json({ restaurant });
    } catch (error) {
        console.error("Error fetching restaurant:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

