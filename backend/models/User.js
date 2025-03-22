import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name:{
        type: String, 
        required: [true, "name is required"] 
    }, 
    email:{
        type: String, 
        required: true,
        unique: [true, "email is required"] 
    }, 
    password:{
        type: String, 
        required: [true, "password is required"] 
    },
    role: {
        type: String,
        enum: ['user', 'owner'], // restricts role to user & owner 
        default: 'user'
    }
},{
    timestamps : true
})

const User = mongoose.model('User', userSchema); 
export default User; 
