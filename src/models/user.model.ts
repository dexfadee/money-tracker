import mongoose, { Schema, Document } from "mongoose";

export interface User extends Document {
    name: string;
    email: string;
    image: string;
    authProviderId: string;
    transactions: mongoose.Types.ObjectId[];
}

const UserSchema: Schema<User> = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/.+\@.+\..+/, 'Please use a valid email address'],
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    authProviderId: {
        type: String,
        required: [true, 'Auth provider id is Missing'],
    },
    image: {
        type: String,
        required: [true, 'Avatar is required'],
    },
    transactions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction',
        required: [true, 'User missing in transaction'],
    }]
});

const User = mongoose.models?.User || mongoose.model("User", UserSchema);

export default User;