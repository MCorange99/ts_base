import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    _id: String,
    discord_username: {
        type: String,
        required: true,
        unique: true
    },

    socials: {
        type: Map,
        of: String,
        unique: true,
        required: false
    },

    birth_day: {
        type: Number,
        required: true,
        unique: false
    },

    images: {
        type: [String],
        required: true,
        unique: false
    },


});

export default models.user || model("user", UserSchema);
