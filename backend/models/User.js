const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    phoneNumber: {
        type: String
    },
    address: {
        type: String
    },
    skills: {
        type: String
    },
    educationDetails: {
        type: String
    },
    resumeUrl:{
        type:String
    },
});
const User = mongoose.model('Users', UserSchema);
module.exports = User;