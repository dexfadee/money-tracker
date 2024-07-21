import mongoose, { Schema, Document } from "mongoose";

export interface Transaction extends Document {
    text: string;
    amount: number;
    isPending: boolean;
    user: mongoose.Types.ObjectId;
}

const TransactionSchema: Schema<Transaction> = new mongoose.Schema({
    text: {
        type: String,
        required: [true, 'Text is required'],
    },
    amount: {
        type: Number,
        required: [true, 'Amount is required'],
    },
    isPending: {
        type: Boolean,
        default: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User missing in transaction'],
    },
});

const Transaction = mongoose.models?.Transaction || mongoose.model("Transaction", TransactionSchema)

export default Transaction;