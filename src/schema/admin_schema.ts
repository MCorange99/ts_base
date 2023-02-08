import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    _id: String,
    username: {
        type: String,
        required: true,
        unique: false
    },
    salt: {
        type: String,
        required: true
    },
    password_hash: {
        type: String,
        required: true,
    },
    api: {
        key: {
            type: String,
            required: true,
            unique: true
        },
        //? Maybe make the key expire after 7 days for security
    }
});

export default models.admin || model("admin", UserSchema);
