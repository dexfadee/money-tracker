import dbConnect from "@/lib/dbConnect";
import { auth } from "@/auth";
import Transaction from "@/models/transaction.model";

export async function GET() {
    
    const session = await auth();
    if (!session || !session.user) {
        return Response.json(
            { success: false, message: 'Not authenticated' },
            { status: 401 }
        );
    }
    
    try {
        await dbConnect();

        const balance = await Transaction.find({ user: session.user.email, isPending: false }, 'amount');
        const total = balance.reduce((acc, curr) => acc + curr.amount, 0);

        if (!balance || !total) {
            return Response.json(
                { message: 'Error Calculating balance', success: true },
                { status: 500 }
            ); 
        }

        return Response.json(
            { message: 'Transaction Added successfully', success: true, balance: total },
            { status: 200 }
        );

    } catch (error) {
        return Response.json(
            { success: false, message: 'Error adding transactions' },
            { status: 500 }
        );
    }
}