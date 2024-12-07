import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Email already exists']
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
    },
    image: {
        type: String,
    },
    isSuperUser:{
        type: Boolean,
        default: false
    }
});

const User = models.User || model("User", userSchema)

export default User;