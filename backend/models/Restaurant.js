import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    totalTables: {
        type: Number,
        required: true
    },
    availableTables: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);
export default Restaurant;
