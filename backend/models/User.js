import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    googleID: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
    },
    email: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    district: {
        type: String,
    },
    profilePicture: {
        type: String,
    },
    qualification: {
        type: String,
    },
    profession: {
        type: String,
    },
    password: {
        type: String,
    },
    confirmPassword: {
        type: String
    },
    createdDate: {
        type: Date.now,
        default: Date.now
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    isStaff:{
        type:Boolean,
        default:false
    }

})

const User = mongoose.model('User',userSchema)
export default User;