import dbConnect from "@/lib/dbConnect";
import { auth } from "@/auth";
import Transaction from "@/models/transaction.model";

export async function POST(request: Request) {
    const { transactionfor, amount, isPending }: { transactionfor: string, amount: number, isPending: boolean } = await request.json();
    await dbConnect();

    const session = await auth();
    if (!session || !session.user) {
        return Response.json(
            { success: false, message: 'Not authenticated' },
            { status: 401 }
        );
    }

    try {
    const transaction = await Transaction.create({
        text: transactionfor,
        amount,
        isPending,
        user: session.user.email
    })

    return Response.json(
        { message: 'Transaction Added successfully', success: true },
        { status: 200 }
    );

    } catch (error) {
        console.error('Error adding transactions: ', error);
        return Response.json(
            { success: false, message: 'Error adding transactions' },
            { status: 500 }
        );
    }
}