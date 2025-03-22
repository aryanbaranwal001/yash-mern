import Restaurant from "../models/Restaurant.js"



export const createRestaurant = async (req,res) => {
    try {
        const {name, userId} = req.body;
        if (!userId || !name) {
            return res.status(404).json({message: "All fields are required"})
        }
        const newRestaurant = new Restaurant({
            name: name,
            ownerId: userId
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
        const restaurants = await Restaurant.find();
        res.status(200).json(restaurants);
    } catch (error) {
        console.error("Error fetching restaurant list:", error);
        res.status(500).json({ message: "Server error while fetching restaurants" });
    }
};