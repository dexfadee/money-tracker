import mongoose, { Schema, Document } from "mongoose";

export interface Transaction extends Document {
    text: string;
    amount: number;
    isPending: boolean;
    user: string;
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
        required: [true, 'Pending status is required'],
    },
    user: {
        type: String,
        required: [true, 'User missing in transaction'],
    }
});

const Transaction = mongoose.models?.Transaction || mongoose.model("Transaction", TransactionSchema)

export default Transaction;